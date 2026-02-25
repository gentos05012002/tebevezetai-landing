"use client";

import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
import { useState, useEffect } from "react";

/*
  Placeholder review cards — swipeable TikTok/Tinder style.
  Photo background + text overlay at bottom.
  Swipe left/right to navigate.
*/

interface ReviewCard {
    id: number;
    bgColor: string;
    name: string;
    text: string;
    tag: string;
}

// Placeholder stubs — replace with real reviews + photos later
const cards: ReviewCard[] = [
    {
        id: 1,
        bgColor: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        name: "Отзыв #1",
        text: "Здесь будет реальный отзыв клиента с фотографией товара",
        tag: "ЗАГЛУШКА",
    },
    {
        id: 2,
        bgColor: "linear-gradient(145deg, #1a1a1a 0%, #2d1f0e 50%, #3d2b1a 100%)",
        name: "Отзыв #2",
        text: "Фото товара или результат работы — свайпните для следующего",
        tag: "ЗАГЛУШКА",
    },
    {
        id: 3,
        bgColor: "linear-gradient(145deg, #0a0a0a 0%, #1a2a1a 50%, #0d2818 100%)",
        name: "Отзыв #3",
        text: "Каждый слайд — реальный кейс с фото и деталями заказа",
        tag: "ЗАГЛУШКА",
    },
    {
        id: 4,
        bgColor: "linear-gradient(145deg, #1a0a1e 0%, #2a1a2e 50%, #1a0a2e 100%)",
        name: "Отзыв #4",
        text: "Здесь будет ваш отзыв — пришлите фото и текст",
        tag: "ЗАГЛУШКА",
    },
    {
        id: 5,
        bgColor: "linear-gradient(145deg, #0e1a2e 0%, #1a2e3e 50%, #0e2a3e 100%)",
        name: "Отзыв #5",
        text: "Свайпайте влево и вправо чтобы листать отзывы",
        tag: "ЗАГЛУШКА",
    },
];

const SWIPE_THRESHOLD = 60;

function Card({
    card,
    isActive,
    offset,
}: {
    card: ReviewCard;
    isActive: boolean;
    offset: number;
}) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-300, 0, 300], [-12, 0, 12]);
    const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.3, 0.8, 1, 0.8, 0.3]);

    return (
        <motion.div
            className="absolute inset-0 touch-pan-y"
            style={{
                x,
                rotate,
                opacity: isActive ? opacity : 0.5,
                scale: isActive ? 1 : 0.92,
                zIndex: isActive ? 10 : 5 - Math.abs(offset),
            }}
            animate={{
                x: isActive ? 0 : offset * 30,
                scale: isActive ? 1 : 0.92 - Math.abs(offset) * 0.03,
                opacity: isActive ? 1 : Math.max(0, 0.4 - Math.abs(offset) * 0.15),
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {/* Card surface */}
            <div
                className="w-full h-full rounded-2xl overflow-hidden relative select-none"
                style={{ background: card.bgColor }}
            >
                {/* Noise texture overlay */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[60px] sm:text-[80px] opacity-10">📷</div>
                </div>

                {/* Bottom overlay — TikTok/IG style */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20 sm:pt-28">
                    <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/70 font-semibold mb-2 block">
                        {card.tag}
                    </span>
                    <p className="text-[14px] sm:text-[16px] text-white/90 font-medium leading-snug mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {card.text}
                    </p>
                    <p className="text-[11px] sm:text-[12px] text-white/40">
                        — {card.name}
                    </p>
                </div>

                {/* Swipe hint arrows */}
                <div className="absolute top-1/2 -translate-y-1/2 left-3 text-white/10 text-xl">‹</div>
                <div className="absolute top-1/2 -translate-y-1/2 right-3 text-white/10 text-xl">›</div>
            </div>
        </motion.div>
    );
}

export default function Reviews() {
    const [current, setCurrent] = useState(0);
    const [dragging, setDragging] = useState(false);
    const dragX = useMotionValue(0);

    const goTo = (idx: number) => {
        if (idx < 0 || idx >= cards.length) return;
        setCurrent(idx);
    };

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setDragging(false);
        if (info.offset.x < -SWIPE_THRESHOLD && current < cards.length - 1) {
            goTo(current + 1);
        } else if (info.offset.x > SWIPE_THRESHOLD && current > 0) {
            goTo(current - 1);
        }
        animate(dragX, 0, { type: "spring", stiffness: 300, damping: 30 });
    };

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") goTo(current - 1);
            if (e.key === "ArrowRight") goTo(current + 1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    return (
        <section id="reviews" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6 bg-[#0A0A0A]/90">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 sm:mb-16 md:mb-20"
                >
                    <p className="section-label mb-4 sm:mb-6">Отзывы</p>
                    <h2
                        className="text-[clamp(1.6rem,5vw,3.5rem)] font-bold tracking-[-0.04em] text-white leading-[1.05]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Что говорят клиенты
                    </h2>
                    <motion.p
                        initial={{ color: "rgba(80,80,80,1)" }}
                        whileInView={{ color: "rgba(150,150,150,1)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-3 text-[13px] sm:text-[14px]"
                    >
                        Свайпайте ← → чтобы листать
                    </motion.p>
                </motion.div>

                {/* Carousel container */}
                <div className="flex justify-center">
                    <motion.div
                        className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] aspect-[3/4] cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.15}
                        onDragStart={() => setDragging(true)}
                        onDragEnd={handleDragEnd}
                        style={{ x: dragX }}
                    >
                        {cards.map((card, i) => (
                            <Card
                                key={card.id}
                                card={card}
                                isActive={i === current}
                                offset={i - current}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
                    {cards.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`transition-all duration-300 rounded-full ${i === current
                                    ? "w-6 h-1.5 bg-[#C9A84C]"
                                    : "w-1.5 h-1.5 bg-[#333] hover:bg-[#555]"
                                }`}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Counter */}
                <p className="text-center mt-4 text-[11px] text-[#555] tracking-wider" style={{ fontFamily: "'Space Grotesk', monospace" }}>
                    {current + 1} / {cards.length}
                </p>
            </div>
        </section>
    );
}

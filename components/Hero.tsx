"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Hero() {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

    const moveX1 = useTransform(springX, [0, 1], [-15, 15]);
    const moveY1 = useTransform(springY, [0, 1], [-10, 10]);
    const moveX2 = useTransform(springX, [0, 1], [20, -20]);
    const moveY2 = useTransform(springY, [0, 1], [12, -12]);
    const moveX3 = useTransform(springX, [0, 1], [-8, 8]);
    const moveY3 = useTransform(springY, [0, 1], [-6, 6]);
    const rotX = useTransform(springY, [0, 1], [2, -2]);
    const rotY = useTransform(springX, [0, 1], [-2, 2]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
            mouseY.set(e.clientY / window.innerHeight);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-5 sm:px-6 overflow-hidden z-10">
            {/* Floating ambient shapes */}
            <motion.div
                className="absolute w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full pointer-events-none"
                style={{
                    x: moveX2, y: moveY2,
                    background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
                    top: "20%", left: "5%",
                    filter: "blur(60px)",
                }}
            />
            <motion.div
                className="absolute w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full pointer-events-none"
                style={{
                    x: moveX1, y: moveY1,
                    background: "radial-gradient(circle, rgba(61,255,243,0.03) 0%, transparent 70%)",
                    bottom: "15%", right: "5%",
                    filter: "blur(50px)",
                }}
            />

            {/* Geometric accents — hidden on small screens for cleanliness */}
            <motion.div
                className="absolute top-[15%] right-[18%] w-14 sm:w-20 h-14 sm:h-20 border border-[#C9A84C]/[0.06] rotate-45 pointer-events-none hidden sm:block"
                style={{ x: moveX2, y: moveY2 }}
            />
            <motion.div
                className="absolute bottom-[20%] left-[15%] w-8 sm:w-12 h-8 sm:h-12 border border-[#3DFFF3]/[0.05] rotate-12 pointer-events-none hidden sm:block"
                style={{ x: moveX1, y: moveY1 }}
            />
            <motion.div
                className="absolute top-[55%] right-[8%] w-px h-16 sm:h-24 bg-gradient-to-b from-transparent via-[#C9A84C]/[0.08] to-transparent pointer-events-none hidden sm:block"
                style={{ x: moveX3, y: moveY3 }}
            />

            {/* MAIN CONTENT — 3D tilt on desktop */}
            <motion.div
                className="relative z-10 max-w-5xl mx-auto w-full"
                style={{
                    rotateX: rotX,
                    rotateY: rotY,
                    perspective: 1000,
                }}
            >
                {/* Label */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="section-label mb-6 sm:mb-10 md:mb-12 text-[9px] sm:text-[10px]"
                >
                    ▸ Свои поставщики · Производство · Опт
                </motion.p>

                {/* Main headline */}
                <motion.div style={{ x: moveX3, y: moveY3 }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="glitch text-[clamp(1.8rem,6vw,5.5rem)] font-bold leading-[1] sm:leading-[0.98] tracking-[-0.04em] sm:tracking-[-0.05em] text-white mb-5 sm:mb-8"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        data-text="Выкуп, производство и доставка из Китая"
                    >
                        Выкуп, производство
                        <br />
                        <span className="gold-text">и доставка из Китая</span>
                    </motion.h1>
                </motion.div>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.6 }}
                    className="text-[clamp(0.8rem,1.8vw,1.1rem)] text-[#777] leading-relaxed max-w-sm sm:max-w-lg mx-auto mb-8 sm:mb-12 font-light"
                >
                    Свои фабрики и проверенные поставщики.
                    <br className="hidden sm:block" />
                    Производим под заказ, доставляем оптом.
                    <br className="hidden sm:block" />
                    <span className="text-[#3DFFF3]/50">Без посредников.</span>
                </motion.p>

                {/* Trust counters */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.75 }}
                    className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10 sm:mb-16"
                >
                    {[
                        { value: "2800+", label: "заказов" },
                        { value: "4.98", label: "рейтинг ★" },
                        { value: "50+", label: "фабрик" },
                    ].map((stat) => (
                        <div key={stat.label} className="group cursor-default text-center">
                            <p
                                className="text-[22px] sm:text-[28px] md:text-[36px] font-bold text-white tracking-[-0.04em] group-hover:text-[#C9A84C] transition-colors duration-500"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                {stat.value}
                            </p>
                            <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#555] group-hover:text-[#777] transition-colors duration-500 mt-1">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                >
                    <a
                        href="https://t.me/tebevezetai?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%D0%AF%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%2C%20%D0%BC%D0%BD%D0%B5%20%D1%83%D0%B6%D0%B5%20%D0%B2%D0%B5%D0%B7%D1%91%D1%82!%20%F0%9F%8E%89%20%D0%A1%D0%BA%D0%B8%D0%B4%D0%BA%D0%B0%2010%25"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-[#C9A84C] text-[#050505] font-semibold text-[12px] sm:text-[13px] tracking-wide uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_80px_rgba(201,168,76,0.15)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span className="relative z-10">Написать в Telegram</span>
                        <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#E2C37A] to-[#C9A84C] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    </a>
                    <a
                        href="#reviews"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-[12px] sm:text-[13px] tracking-wide uppercase text-[#777] font-medium border border-[#1a1a1a] hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-all duration-500"
                    >
                        Смотреть отзывы
                    </a>
                </motion.div>
            </motion.div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none z-20" />
        </section>
    );
}

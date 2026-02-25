"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const advantages = [
    {
        icon: "🏭",
        title: "Свои поставщики и фабрики",
        desc: "Прямые контракты с проверенными производителями в Китае. Без посредников — вы получаете заводскую цену.",
        accent: true,
    },
    {
        icon: "🤖",
        title: "Личный бот-консьерж 24/7",
        desc: "Отслеживает трек, сообщает точный статус, отвечает мгновенно. Находит товары и поставщиков. Всегда на связи.",
        accent: true,
    },
    {
        icon: "⚙️",
        title: "Производство под заказ",
        desc: "Нужен товар с вашим лого, размером или кастомными параметрами? Наши фабрики произведут под ваш запрос.",
    },
    {
        icon: "📦",
        title: "Оптовые поставки",
        desc: "Закупаем и доставляем партиями — от 10 до 10 000 единиц. Консолидация на складе, единая отправка.",
    },
    {
        icon: "🔍",
        title: "Проверка качества на месте",
        desc: "Собственный контроль на складах в Китае. Фото, видео, чек-лист — до отправки. Брак не уедет.",
    },
    {
        icon: "🛡️",
        title: "100% гарантия и прозрачность",
        desc: "Полная стоимость до оплаты. Если товар не соответствует — возвращаем деньги без оговорок.",
    },
];

function StarItem({ adv, i }: { adv: typeof advantages[0]; i: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-35% 0px -35% 0px" });

    return (
        <div
            ref={ref}
            className={`relative py-8 sm:py-12 border-b border-[#1a1a1a] last:border-none ${i % 2 === 0 ? "md:pl-0 md:pr-[20%]" : "md:pl-[20%] md:pr-0"
                }`}
        >
            <div className="flex items-start gap-4 sm:gap-6">
                {/* Icon — star burst */}
                <div className="relative flex-shrink-0 mt-1">
                    {/* Outer glow ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                            boxShadow: isInView
                                ? adv.accent
                                    ? "0 0 30px 8px rgba(61,255,243,0.25), 0 0 60px 15px rgba(61,255,243,0.08)"
                                    : "0 0 30px 8px rgba(201,168,76,0.25), 0 0 60px 15px rgba(201,168,76,0.08)"
                                : "0 0 0px 0px transparent",
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ width: 44, height: 44, top: -6, left: -6 }}
                    />

                    {/* Pulse rings — like a star twinkling */}
                    {isInView && (
                        <>
                            <motion.div
                                className="absolute rounded-full border"
                                style={{
                                    borderColor: adv.accent ? "rgba(61,255,243,0.3)" : "rgba(201,168,76,0.25)",
                                    top: -6, left: -6, width: 44, height: 44,
                                }}
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            />
                            <motion.div
                                className="absolute rounded-full border"
                                style={{
                                    borderColor: adv.accent ? "rgba(61,255,243,0.2)" : "rgba(201,168,76,0.15)",
                                    top: -6, left: -6, width: 44, height: 44,
                                }}
                                initial={{ scale: 1, opacity: 0.4 }}
                                animate={{ scale: 3, opacity: 0 }}
                                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
                            />
                        </>
                    )}

                    {/* Star rays */}
                    {isInView && (
                        <motion.div
                            className="absolute pointer-events-none"
                            style={{ top: 10, left: 10 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {[0, 45, 90, 135].map((angle) => (
                                <motion.div
                                    key={angle}
                                    className="absolute"
                                    style={{
                                        width: 1,
                                        height: isInView ? 18 : 0,
                                        background: `linear-gradient(${adv.accent ? "rgba(61,255,243,0.4)" : "rgba(201,168,76,0.35)"}, transparent)`,
                                        transformOrigin: "center top",
                                        rotate: `${angle}deg`,
                                        top: -18,
                                        left: 0,
                                    }}
                                    initial={{ scaleY: 0, opacity: 0 }}
                                    animate={{ scaleY: 1, opacity: [0, 0.8, 0.3] }}
                                    transition={{ duration: 1, delay: angle * 0.002, ease: "easeOut" }}
                                />
                            ))}
                        </motion.div>
                    )}

                    {/* Icon core */}
                    <motion.span
                        className="relative z-10 text-xl sm:text-2xl md:text-3xl block"
                        animate={{
                            scale: isInView ? [1, 1.3, 1.1] : 1,
                            filter: isInView
                                ? `brightness(1.5) drop-shadow(0 0 8px ${adv.accent ? "rgba(61,255,243,0.5)" : "rgba(201,168,76,0.4)"})`
                                : "brightness(0.4) drop-shadow(0 0 0px transparent)",
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {adv.icon}
                    </motion.span>
                </div>

                {/* Text content */}
                <div>
                    <motion.h3
                        className="text-[15px] sm:text-[17px] md:text-[20px] font-semibold tracking-[-0.02em] mb-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        animate={{
                            color: isInView
                                ? adv.accent ? "rgba(61,255,243,0.9)" : "rgba(255,255,255,1)"
                                : "rgba(60,60,60,1)",
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        {adv.title}
                    </motion.h3>
                    <motion.p
                        className="text-[13px] sm:text-[14px] leading-[1.7] max-w-md"
                        animate={{
                            color: isInView ? "rgba(170,170,170,1)" : "rgba(50,50,50,1)",
                        }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        {adv.desc}
                    </motion.p>

                    {/* Glow underline */}
                    <motion.div
                        className="mt-3 sm:mt-4 h-px rounded-full origin-left"
                        style={{
                            background: adv.accent
                                ? "linear-gradient(90deg, rgba(61,255,243,0.3), transparent 80%)"
                                : "linear-gradient(90deg, rgba(201,168,76,0.2), transparent 80%)",
                        }}
                        animate={{
                            scaleX: isInView ? 1 : 0,
                            opacity: isInView ? 1 : 0,
                        }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default function WhyUs() {
    return (
        <section id="advantages" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6 bg-[#0A0A0A]/90 relative">
            <div className="absolute top-0 bottom-0 left-[12%] w-px bg-gradient-to-b from-transparent via-[#C9A84C]/[0.03] to-transparent hidden lg:block" />

            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 sm:mb-24 md:mb-28 max-w-xl"
                >
                    <p className="section-label mb-4 sm:mb-6">Почему мы</p>
                    <h2
                        className="text-[clamp(1.6rem,5vw,3.5rem)] font-bold tracking-[-0.04em] text-white leading-[1.05]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Не просто посредник —
                        <br className="hidden sm:block" />
                        <span className="text-[#999]">
                            ваш партнёр в Китае
                        </span>
                    </h2>
                </motion.div>

                <div className="space-y-0">
                    {advantages.map((adv, i) => (
                        <StarItem key={adv.title} adv={adv} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

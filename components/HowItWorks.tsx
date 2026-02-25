"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
    {
        num: "01",
        title: "Расскажите, что нужно",
        desc: "Пришлите ссылку, фото или описание товара. Нужен опт, кастом или конкретный артикул — разберёмся.",
        icon: "📋",
    },
    {
        num: "02",
        title: "Находим поставщика или фабрику",
        desc: "Подбираем лучшие условия из нашей базы проверенных производителей. Или производим на заказ — под ваш бренд.",
        icon: "🔍",
        accent: true,
    },
    {
        num: "03",
        title: "Контроль и упаковка",
        desc: "Принимаем на склад в Китае. Фото, видео, чек-лист качества. Упаковываем под оптовую или розничную отправку.",
        icon: "✅",
    },
    {
        num: "04",
        title: "Доставляем партию",
        desc: "Консолидируем, отправляем удобным способом. Бот-консьерж отслеживает каждый этап до вашего склада.",
        icon: "🚀",
    },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    return (
        <div ref={ref} className="relative pl-12 sm:pl-20 md:pl-28 py-8 sm:py-12 md:py-16">
            {/* Timeline node */}
            <div className="absolute left-0 sm:left-4 md:left-8 top-8 sm:top-12 md:top-16 flex items-center justify-center">
                <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center relative z-10"
                    animate={{
                        borderColor: isInView
                            ? step.accent ? "rgba(61,255,243,0.6)" : "rgba(201,168,76,0.5)"
                            : "rgba(40,40,40,1)",
                        backgroundColor: isInView
                            ? step.accent ? "rgba(61,255,243,0.08)" : "rgba(201,168,76,0.05)"
                            : "rgba(10,10,10,1)",
                        scale: isInView ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <motion.span
                        className="text-sm sm:text-base"
                        animate={{ opacity: isInView ? 1 : 0.3 }}
                        transition={{ duration: 0.4 }}
                    >
                        {step.icon}
                    </motion.span>

                    {/* Pulse ring */}
                    {isInView && (
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                borderColor: step.accent ? "rgba(61,255,243,0.3)" : "rgba(201,168,76,0.2)",
                                borderWidth: 1,
                            }}
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        />
                    )}
                </motion.div>
            </div>

            {/* Step content */}
            <motion.div
                animate={{
                    opacity: isInView ? 1 : 0.25,
                    x: isInView ? 0 : 10,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Ghost number */}
                <motion.span
                    className="block text-[50px] sm:text-[70px] md:text-[90px] font-bold leading-none tracking-[-0.06em] mb-2 sm:mb-3"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    animate={{
                        color: isInView
                            ? step.accent ? "rgba(61,255,243,0.12)" : "rgba(201,168,76,0.08)"
                            : "rgba(25,25,25,1)",
                    }}
                    transition={{ duration: 0.6 }}
                >
                    {step.num}
                </motion.span>

                <motion.h3
                    className="text-[15px] sm:text-[18px] md:text-[22px] font-semibold tracking-[-0.02em] mb-2 sm:mb-3"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    animate={{
                        color: isInView
                            ? step.accent ? "rgba(61,255,243,0.85)" : "rgba(255,255,255,1)"
                            : "rgba(80,80,80,1)",
                    }}
                    transition={{ duration: 0.5 }}
                >
                    {step.title}
                </motion.h3>

                <motion.p
                    className="text-[13px] sm:text-[14px] leading-[1.7] max-w-md"
                    animate={{
                        color: isInView ? "rgba(170,170,170,1)" : "rgba(60,60,60,1)",
                    }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {step.desc}
                </motion.p>

                {/* Active indicator bar */}
                <motion.div
                    className="mt-4 sm:mt-6 h-[2px] rounded-full origin-left"
                    style={{
                        background: step.accent
                            ? "linear-gradient(90deg, rgba(61,255,243,0.4), transparent)"
                            : "linear-gradient(90deg, rgba(201,168,76,0.3), transparent)",
                    }}
                    animate={{
                        scaleX: isInView ? 1 : 0,
                        opacity: isInView ? 1 : 0,
                    }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
            </motion.div>
        </div>
    );
}

export default function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 20%"],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });
    const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    // Progress percentage for the counter
    const progressPercent = useTransform(smoothProgress, [0, 1], [0, 100]);

    return (
        <section id="how" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6 bg-[#0A0A0A]/90 relative">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 sm:mb-16 md:mb-20 max-w-xl md:ml-auto md:text-right"
                >
                    <p className="section-label mb-4 sm:mb-6">Процесс</p>
                    <h2
                        className="text-[clamp(1.6rem,5vw,3.5rem)] font-bold tracking-[-0.04em] text-white leading-[1.05]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        От запроса
                        <br className="hidden sm:block" />
                        <motion.span
                            initial={{ color: "rgba(85,85,85,1)" }}
                            whileInView={{ color: "rgba(200,200,200,1)" }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                        >
                            до склада за 4 шага
                        </motion.span>
                    </h2>
                </motion.div>

                {/* Timeline container */}
                <div ref={containerRef} className="relative">
                    {/* Timeline track (background) */}
                    <div className="absolute left-[18px] sm:left-[38px] md:left-[54px] top-0 bottom-0 w-[2px] bg-[#151515]" />

                    {/* Timeline progress (filled) */}
                    <motion.div
                        className="absolute left-[18px] sm:left-[38px] md:left-[54px] top-0 w-[2px] origin-top"
                        style={{
                            height: lineHeight,
                            background: "linear-gradient(180deg, #C9A84C, #3DFFF3 60%, rgba(61,255,243,0.2))",
                            boxShadow: "0 0 8px rgba(201,168,76,0.3), 0 0 20px rgba(61,255,243,0.1)",
                        }}
                    />

                    {/* Steps */}
                    {steps.map((step, i) => (
                        <StepCard key={step.num} step={step} index={i} />
                    ))}

                    {/* Scroll progress counter — fixed to right on desktop */}
                    <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
                        <motion.div
                            className="text-[11px] font-mono tracking-wider text-[#333]"
                            style={{ fontFamily: "'Space Grotesk', monospace" }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false }}
                        >
                            <motion.span className="text-[#C9A84C]/40">
                                {/* Round the progress to show step number */}
                                ШАГ
                            </motion.span>
                            <br />
                            <motion.span className="text-[28px] font-bold text-[#C9A84C]/20">
                                <ProgressCounter progress={progressPercent} />
                            </motion.span>
                            <span className="text-[#333]"> /4</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Reactive step counter
function ProgressCounter({ progress }: { progress: ReturnType<typeof useTransform<number, number>> }) {
    const step = useTransform(progress, [0, 25, 50, 75, 100], [1, 1, 2, 3, 4]);
    const roundedStep = useTransform(step, (v) => Math.round(v));

    return <motion.span>{roundedStep}</motion.span>;
}

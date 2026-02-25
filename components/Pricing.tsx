"use client";

import { motion } from "framer-motion";

const plans = [
    {
        name: "Выкуп",
        price: "от 10%",
        desc: "Разовые заказы",
        features: ["Любые площадки Китая", "Бот-консьерж 24/7", "Проверка + фото", "Стандартная упаковка"],
    },
    {
        name: "Опт",
        price: "от 6%",
        desc: "Популярный",
        popular: true,
        features: ["Всё из Выкупа", "Свои поставщики", "Складское хранение", "Консолидация партий", "Оптовые цены", "Персональный менеджер"],
    },
    {
        name: "Производство",
        price: "договорная",
        desc: "Кастом и OEM",
        features: ["Всё из Опт", "Производство под бренд", "Разработка образцов", "Контроль на фабрике", "Сертификация"],
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6 bg-[#0A0A0A]/90 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/[0.06] to-transparent" />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-14 sm:mb-20 md:mb-28 text-center"
                >
                    <p className="section-label mb-4 sm:mb-6">Тарифы</p>
                    <h2
                        className="text-[clamp(1.6rem,5vw,3.5rem)] font-bold tracking-[-0.04em] text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Прозрачные цены
                    </h2>
                    <motion.p
                        initial={{ color: "rgba(80,80,80,1)" }}
                        whileInView={{ color: "rgba(170,170,170,1)" }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-3 text-[13px]"
                    >
                        Комиссия от суммы заказа. Оптом — дешевле.
                    </motion.p>
                </motion.div>

                {/* Mobile: stacked, Desktop: 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.7, delay: i * 0.08 }}
                            className={`py-10 sm:py-12 md:px-10 first:md:pl-0 last:md:pr-0 group ${i < plans.length - 1 ? "md:border-r md:border-[#1a1a1a]" : ""
                                } ${i > 0 ? "border-t md:border-t-0 border-[#1a1a1a]" : ""}`}
                        >
                            {plan.popular && (
                                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#3DFFF3]/60 mb-3 sm:mb-4" style={{ fontFamily: "'Space Grotesk', monospace" }}>
                                    ▸ Популярный
                                </p>
                            )}
                            {!plan.popular && <div className="mb-3 sm:mb-4 h-[14px]" />}

                            <h3
                                className={`text-[20px] sm:text-[22px] font-bold tracking-[-0.03em] mb-1 ${plan.popular ? "text-[#3DFFF3]/80" : "text-white"
                                    }`}
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                {plan.name}
                            </h3>
                            <p className="text-[11px] text-[#555] mb-6 sm:mb-8">{plan.desc}</p>

                            <p className="text-[32px] sm:text-[40px] font-bold text-white tracking-[-0.04em] mb-8 sm:mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {plan.price}
                            </p>

                            <ul className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
                                {plan.features.map((f) => (
                                    <motion.li
                                        key={f}
                                        initial={{ color: "rgba(100,100,100,1)" }}
                                        whileInView={{ color: "rgba(170,170,170,1)" }}
                                        viewport={{ once: true, margin: "-10px" }}
                                        transition={{ duration: 0.8 }}
                                        className="text-[12px] sm:text-[13px]"
                                    >
                                        <span className={`mr-2 ${plan.popular ? "text-[#3DFFF3]/40" : "text-[#333]"}`}>—</span>
                                        {f}
                                    </motion.li>
                                ))}
                            </ul>

                            <a
                                href="#contact"
                                className={`text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors duration-500 ${plan.popular
                                        ? "text-[#3DFFF3]/60 hover:text-[#3DFFF3]"
                                        : "text-[#777] hover:text-[#C9A84C]"
                                    }`}
                            >
                                {plan.popular ? "Рассчитать ▸" : "Узнать ▸"}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

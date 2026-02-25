"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
    { q: "Вы работаете только с маркетплейсами?", a: "Нет. У нас своя база проверенных поставщиков и фабрик в Китае. Мы можем как выкупить товар с любой площадки, так и организовать производство на заказ — с вашим дизайном, лого и параметрами." },
    { q: "Какой минимальный опт?", a: "Зависит от товара и фабрики. В среднем от 50–100 единиц. На ходовые позиции — от 10 штук. Обсудим индивидуально." },
    { q: "Можете произвести товар с нашим лого?", a: "Да. Наши фабрики работают с OEM/ODM заказами. Разработка образца, нанесение лого, кастомная упаковка — всё включено." },
    { q: "Как работает бот-консьерж?", a: "Уведомляет на каждом этапе: выкуп, производство, проверка, фото, отправка, трекинг. Написать можно в любое время — ответит быстро." },
    { q: "Как считается стоимость?", a: "Товар × курс + комиссия (от 6% для опта) + доставка. Полная сумма — до оплаты. Оптом — всегда дешевле." },
    { q: "Что если брак?", a: "Проверяем каждый товар на складе в Китае. Если что-то не так после получения — возвращаем деньги." },
    { q: "Сроки доставки?", a: "20–35 дней для стандартной доставки. Производство — от 7 до 30 дней дополнительно. Трек в реальном времени." },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6 bg-[#0A0A0A]/90">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-14 sm:mb-20 md:mb-24"
                >
                    <p className="section-label mb-4 sm:mb-6">FAQ</p>
                    <h2
                        className="text-[clamp(1.6rem,5vw,3.5rem)] font-bold tracking-[-0.04em] text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Вопросы
                    </h2>
                </motion.div>

                <div>
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={faq.q}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.03 }}
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between gap-3 sm:gap-4 py-5 sm:py-7 border-b border-[#1a1a1a] text-left group"
                            >
                                <motion.span
                                    className={`text-[13px] sm:text-[15px] font-medium transition-colors duration-500 ${open === i ? "text-[#3DFFF3]/70" : "text-[#888] group-hover:text-white"
                                        }`}
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {faq.q}
                                </motion.span>
                                <span
                                    className={`flex-shrink-0 text-[14px] sm:text-[16px] font-light transition-all duration-500 ${open === i ? "text-[#3DFFF3]/50 rotate-45" : "text-[#555]"
                                        }`}
                                >
                                    +
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="py-4 sm:py-5 text-[13px] sm:text-[14px] text-[#999] leading-[1.7]">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const TG_LINK = "https://t.me/tebevezetai?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%D0%AF%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%2C%20%D0%BC%D0%BD%D0%B5%20%D1%83%D0%B6%D0%B5%20%D0%B2%D0%B5%D0%B7%D1%91%D1%82!%20%F0%9F%8E%89%20%D0%A1%D0%BA%D0%B8%D0%B4%D0%BA%D0%B0%2010%25";

export default function FinalCTA() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setLoading(true);
        try {
            await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source: "footer_cta" }),
            });
        } catch {
            // fail silently — still redirect to TG
        }
        setLoading(false);
        setSent(true);
    };

    return (
        <section id="contact" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6 bg-[#0A0A0A]/90 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#C9A84C]/[0.02] blur-[120px] sm:blur-[150px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full bg-[#3DFFF3]/[0.015] blur-[60px] sm:blur-[80px] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DFFF3]/[0.05] to-transparent" />

            <div className="relative max-w-md mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="section-label mb-4 sm:mb-6">Начать</p>
                    <h2
                        className="text-[clamp(1.5rem,5vw,3rem)] font-bold tracking-[-0.04em] text-white leading-[1.1] mb-3 sm:mb-4"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Напишите нам
                        <br />
                        <span className="gold-text">в Telegram</span>
                    </h2>
                    <motion.p
                        initial={{ color: "rgba(80,80,80,1)" }}
                        whileInView={{ color: "rgba(170,170,170,1)" }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-[13px] sm:text-[14px] mb-10 sm:mb-14"
                    >
                        Опт, кастом, разовый выкуп — обсудим всё в чате. Ответим за 15 минут.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="space-y-5 sm:space-y-6"
                >
                    {/* Primary — Telegram */}
                    <a
                        href={TG_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center gap-3 w-full py-4 sm:py-5 bg-[#2AABEE] text-white font-bold text-[13px] sm:text-[14px] tracking-wide uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(42,171,238,0.15)] hover:scale-[1.02] active:scale-[0.98] rounded-sm"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                        <span className="relative z-10">Написать в Telegram</span>
                        <span className="absolute inset-0 bg-[#229ED9] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    </a>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-[#1a1a1a]" />
                        <span className="text-[10px] text-[#444] tracking-[0.2em] uppercase">или</span>
                        <div className="flex-1 h-px bg-[#1a1a1a]" />
                    </div>

                    {/* Email capture */}
                    {sent ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-8 text-center"
                        >
                            <p className="text-[#3DFFF3] text-2xl mb-3">✓</p>
                            <p className="text-[14px] text-[#999]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                Сохранили — напишем вам!
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex gap-0">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 min-w-0 px-4 py-3 sm:py-3.5 bg-[#111] border border-[#222] border-r-0 text-white placeholder-[#444] text-[13px] sm:text-[14px] focus:outline-none focus:border-[#C9A84C]/30 transition-colors duration-500 rounded-l-sm"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#C9A84C] text-[#050505] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase hover:bg-[#E2C37A] transition-all duration-300 active:scale-[0.97] rounded-r-sm whitespace-nowrap disabled:opacity-50"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                {loading ? "..." : "Сохранить"}
                            </button>
                        </form>
                    )}

                    <p className="text-[9px] sm:text-[10px] text-[#333] tracking-wide">
                        Оставьте почту — свяжемся, если предпочитаете email
                    </p>
                </motion.div>

                <motion.p
                    initial={{ color: "rgba(50,50,50,1)" }}
                    whileInView={{ color: "rgba(120,120,120,1)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-10 sm:mt-14 text-[10px] sm:text-[11px] tracking-[0.1em]"
                >
                    Опт · Производство · Кастом &nbsp;/ &nbsp;Ответим за 15 мин
                </motion.p>
            </div>

            {/* Footer */}
            <div className="mt-16 sm:mt-28 pt-6 sm:pt-8 border-t border-[#151515] max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-[#444] tracking-wide">
                <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span className="text-[#888]">Тебе везёт</span> — Поставщики и производство в Китае
                </span>
                <span>© 2026</span>
            </div>
        </section>
    );
}

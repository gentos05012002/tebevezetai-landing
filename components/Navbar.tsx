"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links: { href: string; label: string; external?: boolean }[] = [
        { href: "#advantages", label: "Преимущества" },
        { href: "#how", label: "Процесс" },
        { href: "#reviews", label: "Отзывы" },
        { href: "#faq", label: "FAQ" },
        { href: "https://t.me/tebevezetai?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%D0%AF%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%2C%20%D0%BC%D0%BD%D0%B5%20%D1%83%D0%B6%D0%B5%20%D0%B2%D0%B5%D0%B7%D1%91%D1%82!%20%F0%9F%8E%89%20%D0%A1%D0%BA%D0%B8%D0%B4%D0%BA%D0%B0%2010%25", label: "Telegram", external: true },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#0A0A0A]/80 backdrop-blur-xl" : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
                <a
                    href="#"
                    className="text-[14px] sm:text-[15px] font-bold tracking-wide text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    Тебе <span className="gold-text">везёт</span>
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.1em] uppercase text-[#666] font-medium">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className={`hover:text-[#C9A84C] transition-colors duration-500 ${l.external ? "text-[#C9A84C]/60" : ""}`}
                        >
                            {l.label}
                        </a>
                    ))}
                </div>

                {/* Mobile burger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-[5px] w-6 h-5 justify-center relative"
                    aria-label="Menu"
                >
                    <span className={`block w-full h-px bg-[#888] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
                    <span className={`block w-full h-px bg-[#888] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-full h-px bg-[#888] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="md:hidden overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#1a1a1a]"
                    >
                        <div className="px-5 py-6 flex flex-col gap-4">
                            {links.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setMenuOpen(false)}
                                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className={`text-[13px] tracking-[0.1em] uppercase hover:text-[#C9A84C] transition-colors duration-300 font-medium ${l.external ? "text-[#C9A84C]/60" : "text-[#888]"}`}
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}


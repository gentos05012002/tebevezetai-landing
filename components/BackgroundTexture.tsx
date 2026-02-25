"use client";

import { motion } from "framer-motion";

/* 
  Subtle logistics texture layer — barcodes, tracking numbers, scan markers.
  Everything at very low opacity to feel atmospheric, not distracting.
*/

const trackingNumbers = [
    "TV-2026-CN-884291",
    "TRACK: SH2841903CN",
    "1688-ORD-00294",
    "PKG-JD-8812-CN",
    "TBAO-91824-VERIFIED",
    "▮▮▯▮▯▮▮▯▮▮▯▯▮▮▯▮",
    "SCAN: 2026.02.26",
    "TV-PREMIUM-ВЫКУП",
    "DISPATCH: CONFIRMED",
    "CUSTOMS: CLEARED ✓",
    "WEIGHT: 2.4KG",
    "ROUTE: CN→RU",
];

// Generate barcode-like pattern (thin vertical lines)
function Barcode({ className = "" }: { className?: string }) {
    const bars = Array.from({ length: 28 }, (_, i) => ({
        width: Math.random() > 0.6 ? 2 : 1,
        gap: Math.random() > 0.5 ? 2 : 1,
        height: 20 + Math.random() * 15,
    }));

    return (
        <div className={`flex items-end gap-px ${className}`}>
            {bars.map((bar, i) => (
                <div
                    key={i}
                    className="bg-[#C9A84C]"
                    style={{
                        width: `${bar.width}px`,
                        height: `${bar.height}px`,
                        opacity: 0.04 + Math.random() * 0.03,
                        marginRight: `${bar.gap}px`,
                    }}
                />
            ))}
        </div>
    );
}

export default function BackgroundTexture() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">

            {/* === TRACKING NUMBERS scattered across the page === */}
            {trackingNumbers.map((text, i) => {
                const positions = [
                    { top: "8%", left: "3%" },
                    { top: "18%", right: "4%" },
                    { top: "32%", left: "2%" },
                    { top: "44%", right: "3%" },
                    { top: "55%", left: "4%" },
                    { top: "15%", left: "88%" },
                    { top: "67%", right: "2%" },
                    { top: "78%", left: "3%" },
                    { top: "85%", right: "5%" },
                    { top: "92%", left: "2%" },
                    { top: "38%", left: "92%" },
                    { top: "72%", left: "91%" },
                ];
                const pos = positions[i % positions.length];
                const isVertical = i % 3 === 0;

                return (
                    <motion.span
                        key={i}
                        className="absolute text-[8px] font-mono tracking-[0.15em] select-none"
                        style={{
                            ...pos,
                            color: i % 4 === 0 ? "rgba(61,255,243,0.04)" : "rgba(201,168,76,0.04)",
                            writingMode: isVertical ? "vertical-rl" : "horizontal-tb",
                            textOrientation: isVertical ? "mixed" : undefined,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: i * 0.3 }}
                    >
                        {text}
                    </motion.span>
                );
            })}

            {/* === BARCODES at edges === */}
            <div className="absolute top-[12%] left-[2%]" style={{ transform: "rotate(90deg)", transformOrigin: "left top" }}>
                <Barcode />
            </div>
            <div className="absolute top-[45%] right-[3%]" style={{ transform: "rotate(-90deg)", transformOrigin: "right top" }}>
                <Barcode />
            </div>
            <div className="absolute bottom-[20%] left-[3%]" style={{ transform: "rotate(90deg)", transformOrigin: "left bottom" }}>
                <Barcode />
            </div>
            <div className="absolute top-[75%] right-[2%]">
                <Barcode />
            </div>

            {/* === CROSSHAIR / SCAN MARKERS === */}
            {[
                { top: "25%", left: "6%" },
                { top: "60%", right: "5%" },
                { top: "80%", left: "5%" },
            ].map((pos, i) => (
                <div
                    key={`cross-${i}`}
                    className="absolute"
                    style={pos}
                >
                    {/* Horizontal */}
                    <div className="w-6 h-px bg-[#C9A84C]/[0.05] absolute top-1/2 left-1/2 -translate-x-1/2" />
                    {/* Vertical */}
                    <div className="h-6 w-px bg-[#C9A84C]/[0.05] absolute top-1/2 left-1/2 -translate-y-1/2" />
                    {/* Corner brackets */}
                    <div className="w-2 h-2 border-l border-t border-[#C9A84C]/[0.04] absolute -top-1 -left-1" />
                    <div className="w-2 h-2 border-r border-b border-[#C9A84C]/[0.04] absolute -bottom-1 -right-1" />
                </div>
            ))}

            {/* === HORIZONTAL SCAN LINES (very faint, fixed positions) === */}
            {[15, 35, 55, 75, 90].map((pct) => (
                <div
                    key={`scanline-${pct}`}
                    className="absolute left-0 right-0 h-px"
                    style={{
                        top: `${pct}%`,
                        background: `linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.02) 20%, rgba(201,168,76,0.03) 50%, rgba(201,168,76,0.02) 80%, transparent 100%)`,
                    }}
                />
            ))}

            {/* === MOVING SCAN BAR === */}
            <motion.div
                className="absolute left-0 right-0 h-[2px]"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(61,255,243,0.04), rgba(201,168,76,0.06), rgba(61,255,243,0.04), transparent)",
                    boxShadow: "0 0 20px rgba(201,168,76,0.02)",
                }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* === CORNER REGISTRATION MARKS === */}
            {/* Top-left */}
            <div className="absolute top-8 left-6">
                <div className="w-8 h-px bg-[#C9A84C]/[0.06]" />
                <div className="w-px h-8 bg-[#C9A84C]/[0.06]" />
            </div>
            {/* Top-right */}
            <div className="absolute top-8 right-6 flex flex-col items-end">
                <div className="w-8 h-px bg-[#C9A84C]/[0.06]" />
                <div className="w-px h-8 bg-[#C9A84C]/[0.06] self-end" />
            </div>
            {/* Bottom-left */}
            <div className="absolute bottom-8 left-6">
                <div className="w-px h-8 bg-[#C9A84C]/[0.06]" />
                <div className="w-8 h-px bg-[#C9A84C]/[0.06]" />
            </div>
            {/* Bottom-right */}
            <div className="absolute bottom-8 right-6 flex flex-col items-end">
                <div className="w-px h-8 bg-[#C9A84C]/[0.06] self-end" />
                <div className="w-8 h-px bg-[#C9A84C]/[0.06]" />
            </div>

            {/* === FAINT QR-LIKE PATTERN === */}
            <div className="absolute top-[50%] left-[1.5%] w-10 h-10 opacity-[0.025]">
                <div className="grid grid-cols-5 grid-rows-5 gap-px w-full h-full">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div
                            key={`qr-${i}`}
                            className={`${Math.random() > 0.45 ? "bg-[#C9A84C]" : "bg-transparent"}`}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute top-[30%] right-[1.5%] w-8 h-8 opacity-[0.02]">
                <div className="grid grid-cols-4 grid-rows-4 gap-px w-full h-full">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div
                            key={`qr2-${i}`}
                            className={`${Math.random() > 0.5 ? "bg-[#3DFFF3]" : "bg-transparent"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

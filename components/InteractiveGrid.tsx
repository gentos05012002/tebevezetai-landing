"use client";

import { useEffect, useRef } from "react";

interface Dot {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    alpha: number;
}

export default function InteractiveGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const dotsRef = useRef<Dot[]>([]);
    const animRef = useRef<number | null>(null);
    const sizeRef = useRef({ w: 0, h: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;

        const GOLD = "201,168,76";
        const CYAN = "61,255,243";
        const CONNECT_DIST = 140;
        const MOUSE_RADIUS = 250;
        const DOT_COUNT_FACTOR = 0.00012;

        function resize() {
            const dpr = Math.min(window.devicePixelRatio, 2);
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas!.width = w * dpr;
            canvas!.height = h * dpr;
            canvas!.style.width = `${w}px`;
            canvas!.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            sizeRef.current = { w, h };
            initDots(w, h);
        }

        function initDots(w: number, h: number) {
            const count = Math.floor(w * h * DOT_COUNT_FACTOR);
            const dots: Dot[] = [];
            for (let i = 0; i < count; i++) {
                const x = Math.random() * w;
                const y = Math.random() * h;
                dots.push({
                    x, y, baseX: x, baseY: y,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 2 + 0.8,
                    color: Math.random() > 0.8 ? CYAN : GOLD,
                    alpha: Math.random() * 0.4 + 0.12,
                });
            }
            dotsRef.current = dots;
        }

        function animate() {
            const { w, h } = sizeRef.current;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const dots = dotsRef.current;

            ctx.fillStyle = "rgba(8,8,10,0.2)";
            ctx.fillRect(0, 0, w, h);

            for (let i = 0; i < dots.length; i++) {
                const d = dots[i];
                d.x += d.vx;
                d.y += d.vy;
                d.vx += (d.baseX - d.x) * 0.001;
                d.vy += (d.baseY - d.y) * 0.001;

                const dmx = d.x - mx;
                const dmy = d.y - my;
                const distMouse = Math.sqrt(dmx * dmx + dmy * dmy);
                if (distMouse < MOUSE_RADIUS && distMouse > 0) {
                    const force = (1 - distMouse / MOUSE_RADIUS) * 2.5;
                    d.vx += (dmx / distMouse) * force;
                    d.vy += (dmy / distMouse) * force;
                }

                d.vx *= 0.96;
                d.vy *= 0.96;

                if (d.x < -20) d.x = w + 20;
                if (d.x > w + 20) d.x = -20;
                if (d.y < -20) d.y = h + 20;
                if (d.y > h + 20) d.y = -20;

                const glowAlpha = distMouse < MOUSE_RADIUS
                    ? d.alpha + (1 - distMouse / MOUSE_RADIUS) * 0.8
                    : d.alpha;

                ctx.beginPath();
                ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${d.color},${glowAlpha})`;
                ctx.fill();
            }

            // Connections
            ctx.lineWidth = 0.6;
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dx = dots[i].x - dots[j].x;
                    const dy = dots[i].y - dots[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECT_DIST) {
                        const midX = (dots[i].x + dots[j].x) / 2;
                        const midY = (dots[i].y + dots[j].y) / 2;
                        const midDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);

                        let lineAlpha = (1 - dist / CONNECT_DIST) * 0.08;
                        if (midDist < MOUSE_RADIUS) {
                            lineAlpha += (1 - midDist / MOUSE_RADIUS) * 0.25;
                        }

                        const lineColor = dots[i].color === CYAN || dots[j].color === CYAN ? CYAN : GOLD;
                        ctx.beginPath();
                        ctx.moveTo(dots[i].x, dots[i].y);
                        ctx.lineTo(dots[j].x, dots[j].y);
                        ctx.strokeStyle = `rgba(${lineColor},${lineAlpha})`;
                        ctx.stroke();
                    }
                }
            }

            // Mouse glow — bigger and brighter
            if (mx > 0 && my > 0) {
                const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS * 1.2);
                gradient.addColorStop(0, "rgba(201,168,76,0.12)");
                gradient.addColorStop(0.4, "rgba(61,255,243,0.04)");
                gradient.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = gradient;
                ctx.fillRect(mx - MOUSE_RADIUS * 1.2, my - MOUSE_RADIUS * 1.2, MOUSE_RADIUS * 2.4, MOUSE_RADIUS * 2.4);
            }

            animRef.current = requestAnimationFrame(animate);
        }

        const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
        const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
        const onTouch = (e: TouchEvent) => {
            if (e.touches.length > 0) mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseleave", onLeave);
        window.addEventListener("touchmove", onTouch, { passive: true });
        window.addEventListener("resize", resize);

        resize();
        animate();

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("touchmove", onTouch);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: "#08080A" }}
        />
    );
}

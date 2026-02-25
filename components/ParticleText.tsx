"use client"

import { useEffect, useRef, useCallback } from "react"

class Particle {
    pos = { x: 0, y: 0 }
    vel = { x: 0, y: 0 }
    acc = { x: 0, y: 0 }
    target = { x: 0, y: 0 }
    closeEnoughTarget = 100
    maxSpeed = 1.0
    maxForce = 0.1
    particleSize = 10
    isKilled = false
    startColor = { r: 0, g: 0, b: 0 }
    targetColor = { r: 0, g: 0, b: 0 }
    colorWeight = 0
    colorBlendRate = 0.01

    move() {
        let proximityMult = 1
        const dx = this.pos.x - this.target.x
        const dy = this.pos.y - this.target.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < this.closeEnoughTarget) proximityMult = distance / this.closeEnoughTarget

        const tx = this.target.x - this.pos.x
        const ty = this.target.y - this.pos.y
        const mag = Math.sqrt(tx * tx + ty * ty)
        const desired = mag > 0
            ? { x: (tx / mag) * this.maxSpeed * proximityMult, y: (ty / mag) * this.maxSpeed * proximityMult }
            : { x: 0, y: 0 }

        const sx = desired.x - this.vel.x
        const sy = desired.y - this.vel.y
        const sm = Math.sqrt(sx * sx + sy * sy)
        const steer = sm > 0
            ? { x: (sx / sm) * this.maxForce, y: (sy / sm) * this.maxForce }
            : { x: 0, y: 0 }

        this.acc.x += steer.x
        this.acc.y += steer.y
        this.vel.x += this.acc.x
        this.vel.y += this.acc.y
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.acc.x = 0
        this.acc.y = 0
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.colorWeight < 1) this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1)
        const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight)
        const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight)
        const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight)
        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
    }

    kill(w: number, h: number) {
        if (this.isKilled) return
        const angle = Math.random() * Math.PI * 2
        const dist = (w + h) / 2
        this.target.x = w / 2 + Math.cos(angle) * dist
        this.target.y = h / 2 + Math.sin(angle) * dist
        this.startColor = {
            r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
            g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
            b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
        }
        this.targetColor = { r: 0, g: 0, b: 0 }
        this.colorWeight = 0
        this.isKilled = true
    }
}

interface Props {
    words?: string[]
    className?: string
    colors?: Array<{ r: number; g: number; b: number }>
    fontSize?: number
    interval?: number
}

const GOLD_COLORS = [
    { r: 201, g: 168, b: 76 },
    { r: 226, g: 195, b: 122 },
    { r: 61, g: 255, b: 243 },
    { r: 201, g: 168, b: 76 },
]

export function ParticleTextEffect({
    words = ["ПОСТАВЩИКИ", "ПРОИЗВОДСТВО", "ОПТ", "ДОСТАВКА"],
    className = "",
    colors = GOLD_COLORS,
    fontSize = 80,
    interval = 200,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animRef = useRef<number>(0)
    const particlesRef = useRef<Particle[]>([])
    const frameRef = useRef(0)
    const wordIdxRef = useRef(0)
    const pixelSteps = 5

    const nextWord = useCallback((word: string, canvas: HTMLCanvasElement) => {
        const off = document.createElement("canvas")
        off.width = canvas.width
        off.height = canvas.height
        const offCtx = off.getContext("2d")!
        offCtx.fillStyle = "white"
        offCtx.font = `bold ${fontSize}px 'Space Grotesk', Arial, sans-serif`
        offCtx.textAlign = "center"
        offCtx.textBaseline = "middle"
        offCtx.fillText(word, canvas.width / 2, canvas.height / 2)

        const imgData = offCtx.getImageData(0, 0, canvas.width, canvas.height).data
        const color = colors[wordIdxRef.current % colors.length]
        const particles = particlesRef.current
        let pIdx = 0

        const coords: number[] = []
        for (let i = 0; i < imgData.length; i += pixelSteps * 4) coords.push(i)
        for (let i = coords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[coords[i], coords[j]] = [coords[j], coords[i]]
        }

        for (const ci of coords) {
            if (imgData[ci + 3] > 0) {
                const x = (ci / 4) % canvas.width
                const y = Math.floor(ci / 4 / canvas.width)
                let p: Particle

                if (pIdx < particles.length) {
                    p = particles[pIdx]
                    p.isKilled = false
                    pIdx++
                } else {
                    p = new Particle()
                    const angle = Math.random() * Math.PI * 2
                    const dist = (canvas.width + canvas.height) / 2
                    p.pos.x = canvas.width / 2 + Math.cos(angle) * dist
                    p.pos.y = canvas.height / 2 + Math.sin(angle) * dist
                    p.maxSpeed = Math.random() * 6 + 4
                    p.maxForce = p.maxSpeed * 0.05
                    p.particleSize = Math.random() * 6 + 6
                    p.colorBlendRate = Math.random() * 0.025 + 0.003
                    particles.push(p)
                }

                p.startColor = {
                    r: p.startColor.r + (p.targetColor.r - p.startColor.r) * p.colorWeight,
                    g: p.startColor.g + (p.targetColor.g - p.startColor.g) * p.colorWeight,
                    b: p.startColor.b + (p.targetColor.b - p.startColor.b) * p.colorWeight,
                }
                p.targetColor = color
                p.colorWeight = 0
                p.target.x = x
                p.target.y = y
            }
        }

        for (let i = pIdx; i < particles.length; i++) particles[i].kill(canvas.width, canvas.height)
    }, [colors, fontSize])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        canvas.width = 900
        canvas.height = 200

        nextWord(words[0], canvas)

        const animate = () => {
            const ctx = canvas.getContext("2d")!
            ctx.fillStyle = "rgba(5,5,5,0.15)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const particles = particlesRef.current
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].move()
                particles[i].draw(ctx)
                if (particles[i].isKilled) {
                    const p = particles[i].pos
                    if (p.x < -50 || p.x > canvas.width + 50 || p.y < -50 || p.y > canvas.height + 50) {
                        particles.splice(i, 1)
                    }
                }
            }

            frameRef.current++
            if (frameRef.current % interval === 0) {
                wordIdxRef.current = (wordIdxRef.current + 1) % words.length
                nextWord(words[wordIdxRef.current], canvas)
            }

            animRef.current = requestAnimationFrame(animate)
        }

        animate()
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
    }, [words, nextWord, interval])

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ maxWidth: "100%", height: "auto" }}
        />
    )
}

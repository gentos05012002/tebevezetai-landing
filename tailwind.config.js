/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    DEFAULT: "#C9A84C",
                    light: "#E2C37A",
                    dark: "#A07830",
                },
                surface: {
                    DEFAULT: "#0A0A0A",
                    1: "#111111",
                    2: "#161616",
                    3: "#1A1A1A",
                    border: "#242424",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            letterSpacing: {
                tighter: "-0.04em",
                tight: "-0.02em",
            },
            animation: {
                "fade-up": "fadeUp 0.6s ease both",
                shimmer: "shimmer 2s linear infinite",
            },
            keyframes: {
                fadeUp: {
                    from: { opacity: "0", transform: "translateY(20px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    from: { backgroundPosition: "0 0" },
                    to: { backgroundPosition: "-200% 0" },
                },
            },
        },
    },
    plugins: [],
};

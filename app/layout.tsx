import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Тебе везёт — Премиум выкуп и доставка из Китая",
    description:
        "Покупаем за вас на Taobao, 1688, JD. Личный бот-консьерж 24/7. Проверяем качество. Упаковываем как для себя. 4.98 ★ • 2800+ выкупов • 100% гарантия.",
    keywords: "выкуп из Китая, Taobao, 1688, доставка из Китая, байер",
    openGraph: {
        title: "Тебе везёт — Премиум выкуп и доставка из Китая",
        description: "Личный бот-консьерж 24/7. Покупаем на Taobao, 1688, JD. 4.98 ★ • 2800+ выкупов.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="antialiased scanlines">{children}</body>
        </html>
    );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pindrop — Discover the World's Most Spectacular Places",
    description: "Discover and explore the world's most spectacular tourist spots. Detailed guides, scores, maps and travel info for every destination.",
    keywords: "travel, tourist spots, travel guide, hidden gems, discover places, world travel",
    openGraph: {
        title: "Pindrop",
        description: "Discover the World's Most Spectacular Places",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

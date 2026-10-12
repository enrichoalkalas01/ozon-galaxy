import type { Metadata, Viewport } from "next";
import { Inter, Sora, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const sora = Sora({
    variable: "--font-sora",
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Ozone Lab — Interactive Ozone Layer Simulation",
        template: "%s · Ozone Lab",
    },
    description:
        "An interactive virtual lab about Earth's ozone layer: simulate depletion and recovery, meet the chemicals that damage it, and see why the Montreal Protocol worked.",
    keywords: [
        "ozone layer",
        "ozone depletion",
        "CFC",
        "Montreal Protocol",
        "UV radiation",
        "climate education",
        "interactive simulation",
    ],
    authors: [{ name: "Ozone Lab" }],
    openGraph: {
        title: "Ozone Lab — Interactive Ozone Layer Simulation",
        description:
            "Simulate Earth's protective shield: adjust ozone levels, seasons and emissions, and watch the atmosphere respond.",
        type: "website",
        siteName: "Ozone Lab",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ozone Lab — Interactive Ozone Layer Simulation",
        description:
            "Simulate Earth's protective shield and learn how the ozone layer is healing.",
    },
};

export const viewport: Viewport = {
    themeColor: "#05060d",
    colorScheme: "dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${inter.variable} ${sora.variable} ${geistMono.variable} space-bg min-h-screen antialiased`}
            >
                {children}
                <Toaster
                    position="bottom-right"
                    closeButton
                    richColors
                    theme="dark"
                />
            </body>
        </html>
    );
}

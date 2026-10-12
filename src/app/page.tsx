import React from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import OzoneSimulation from "@/components/OzoneSimulation";
import Culprits from "@/components/Culprits";
import Consequences from "@/components/Consequences";
import Recovery from "@/components/Recovery";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-x-clip text-white">
            <AnimatedBackground />
            <ScrollReveal />

            <a
                href="#about"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-space-900"
            >
                Skip to content
            </a>

            <Navbar />

            <main id="content">
                <Hero />
                <About />
                <OzoneSimulation />
                <Culprits />
                <Consequences />
                <Recovery />
            </main>

            <Footer />
        </div>
    );
}

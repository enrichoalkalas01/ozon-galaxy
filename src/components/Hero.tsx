"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

const Hero: React.FC = () => {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "opacity-100",
                            "translate-y-0"
                        );
                        entry.target.classList.remove(
                            "opacity-0",
                            "translate-y-8"
                        );
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll(".hero-animate");
        elements.forEach((el) => observer.observe(el));

        return () => elements.forEach((el) => observer.unobserve(el));
    }, []);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            <AnimatedBackground />

            <div className="container px-4 py-20 pt-32 md:py-32 mx-auto text-center relative z-10">
                <div ref={textRef} className="max-w-3xl mx-auto space-y-6">
                    <h1 className="hero-animate opacity-0 translate-y-8 transition-all duration-1000 text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                        The{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                            Ozone Layer
                        </span>{" "}
                        Virtual Lab
                    </h1>

                    <p className="hero-animate opacity-0 translate-y-8 transition-all duration-1000 delay-300 md:text-xl text-white/80 max-w-2xl mx-auto">
                        Welcome to an interactive experience about Earth's
                        protective shield and the environmental challenges it
                        faces.
                    </p>

                    <div className="hero-animate opacity-0 translate-y-8 transition-all duration-1000 delay-500 pt-8">
                        <Button
                            size="lg"
                            onClick={scrollToAbout}
                            className="bg-white text-black hover:bg-white/90 hover:text-black transition-all duration-300 rounded-full px-8 py-6 text-lg shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        >
                            Begin Exploration
                            <ArrowDown className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
        </section>
    );
};

export default Hero;

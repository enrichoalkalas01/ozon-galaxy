"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OzoneSimulation from "@/components/OzoneSimulation";
import Culprits from "@/components/Culprits";
import Consequences from "@/components/Consequences";
import Recovery from "@/components/Recovery";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toats";

const Index = () => {
    const { toast } = useToast();

    useEffect(() => {
        // Initialize intersection observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("section-visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll(".section-fade-in");
        sections.forEach((section) => observer.observe(section));

        // Welcome toast
        setTimeout(() => {
            toast({
                title: "Welcome to the Ozone Layer Lab",
                description:
                    "Explore interactive simulations and learn about our atmosphere's protective shield.",
                duration: 5000,
            });
        }, 1500);

        return () => sections.forEach((section) => observer.unobserve(section));
    }, [toast]);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <Navbar />

            <main>
                <Hero />

                <section
                    id="about"
                    className="py-20 md:py-32 bg-gradient-to-b from-black to-slate-950 section-fade-in"
                >
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                                <div>
                                    <span className="inline-block text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">
                                        The Protective Shield
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                        What is the Ozone Layer?
                                    </h2>
                                    <div className="prose prose-invert">
                                        <p className="text-lg text-white/80">
                                            The ozone layer is a region of
                                            Earth's stratosphere that absorbs
                                            most of the Sun's ultraviolet
                                            radiation. It contains a high
                                            concentration of ozone (O₃) relative
                                            to other parts of the atmosphere.
                                        </p>
                                        <p className="text-lg text-white/80 mt-4">
                                            Located approximately 15-35
                                            kilometers above Earth's surface,
                                            this protective shield plays a
                                            crucial role in maintaining life on
                                            our planet by filtering out harmful
                                            UV-B and UV-C radiation.
                                        </p>
                                        <p className="text-lg text-white/80 mt-4">
                                            In the late 20th century, scientists
                                            discovered that this vital layer was
                                            being depleted by human-made
                                            chemicals—primarily
                                            chlorofluorocarbons (CFCs)—leading
                                            to an environmental crisis that
                                            required global cooperation to
                                            solve.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-xl p-6 border border-white/10 shadow-lg backdrop-blur-sm">
                                    <div className="aspect-video rounded-lg overflow-hidden relative">
                                        <div className="absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-b from-blue-900/70 to-black/70">
                                            <div>
                                                <h3 className="text-2xl font-semibold text-white">
                                                    Ozone Structure
                                                </h3>
                                                <p className="text-white/80 mt-2">
                                                    Stratospheric ozone (15-35
                                                    km altitude)
                                                </p>
                                            </div>

                                            <div className="space-y-4 relative">
                                                {/* Atmosphere layers */}
                                                <div className="flex flex-col space-y-1">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-white/80">
                                                            Troposphere
                                                        </span>
                                                        <span className="text-white/60">
                                                            0-15 km
                                                        </span>
                                                    </div>
                                                    <div className="h-2 w-full bg-white/10 rounded-full"></div>
                                                </div>

                                                <div className="flex flex-col space-y-1">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-blue-300">
                                                            Stratosphere (Ozone
                                                            Layer)
                                                        </span>
                                                        <span className="text-white/60">
                                                            15-35 km
                                                        </span>
                                                    </div>
                                                    <div className="h-4 w-full bg-blue-500/30 rounded-full overflow-hidden">
                                                        <div className="h-full w-3/4 bg-blue-500/50 rounded-full animate-pulse"></div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col space-y-1">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-white/80">
                                                            Mesosphere
                                                        </span>
                                                        <span className="text-white/60">
                                                            35-85 km
                                                        </span>
                                                    </div>
                                                    <div className="h-2 w-full bg-white/10 rounded-full"></div>
                                                </div>

                                                <div className="flex flex-col space-y-1">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-white/80">
                                                            Thermosphere &
                                                            Beyond
                                                        </span>
                                                        <span className="text-white/60">
                                                            85+ km
                                                        </span>
                                                    </div>
                                                    <div className="h-2 w-full bg-white/10 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <h4 className="text-lg font-medium text-white mb-1">
                                                Function
                                            </h4>
                                            <p className="text-sm text-white/70">
                                                Absorbs 97-99% of the sun's
                                                medium-frequency ultraviolet
                                                light
                                            </p>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <h4 className="text-lg font-medium text-white mb-1">
                                                Composition
                                            </h4>
                                            <p className="text-sm text-white/70">
                                                Three oxygen atoms (O₃)
                                                constantly forming and breaking
                                                down
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <OzoneSimulation />
                <Culprits />
                <Consequences />
                <Recovery />
            </main>

            <Footer />
        </div>
    );
};

export default Index;

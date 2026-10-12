"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, FlaskConical, Sparkles } from "lucide-react";

const HIGHLIGHTS = [
    { value: "15–35 km", label: "Altitude of the layer" },
    { value: "97–99%", label: "UV-B radiation absorbed" },
    { value: "198", label: "Nations in the treaty" },
    { value: "~2066", label: "Projected full recovery" },
];

const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24 pb-16"
        >
            {/* Horizon glow behind the headline */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 size-[52rem] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.14),transparent_62%)] blur-2xl"
            />

            {/* Stratosphere band */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 bg-gradient-to-b from-transparent via-ozone-500/[0.07] to-transparent"
            />

            <div className="container-page relative z-10">
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    <span className="eyebrow reveal text-ozone-300">
                        <Sparkles className="size-3.5" aria-hidden="true" />
                        Interactive Atmosphere Lab
                    </span>

                    <h1 className="reveal mt-6 text-balance text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                        The{" "}
                        <span className="text-gradient-ozone animate-gradient-text">
                            Ozone Layer
                        </span>{" "}
                        Virtual Lab
                    </h1>

                    <p
                        className="reveal mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg"
                        style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
                    >
                        Earth&apos;s thin shield of O₃ blocks the radiation that
                        would otherwise sterilise the surface. Simulate how
                        emissions break it down — and how the world put it back
                        together.
                    </p>

                    <div
                        className="reveal mt-10 flex flex-col items-center gap-3 sm:flex-row"
                        style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
                    >
                        <Button
                            size="lg"
                            onClick={() => scrollTo("simulation")}
                            className="h-12 rounded-full bg-white px-7 text-base font-semibold text-space-900 shadow-[0_0_32px_-8px_rgba(186,230,253,0.65)] transition-all hover:bg-ozone-100 hover:shadow-[0_0_44px_-6px_rgba(186,230,253,0.8)]"
                        >
                            <FlaskConical className="size-5" aria-hidden="true" />
                            Open the Simulation
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => scrollTo("about")}
                            className="h-12 rounded-full border-white/15 bg-white/[0.03] px-7 text-base font-medium text-white backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
                        >
                            Start from the basics
                            <ArrowDown className="size-4" aria-hidden="true" />
                        </Button>
                    </div>

                    {/* Key figures */}
                    <dl
                        className="reveal mt-12 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm sm:grid-cols-4"
                        style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
                    >
                        {HIGHLIGHTS.map((item) => (
                            <div
                                key={item.label}
                                className="flex flex-col gap-1 bg-space-700/40 px-4 py-5"
                            >
                                <dt className="order-2 text-xs leading-snug text-white/50">
                                    {item.label}
                                </dt>
                                <dd className="order-1 font-display text-xl font-semibold text-ozone-200 sm:text-2xl">
                                    {item.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* Scroll affordance */}
            <button
                type="button"
                onClick={() => scrollTo("about")}
                aria-label="Scroll to the next section"
                className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-white/35 transition-colors hover:text-white/70 md:flex"
            >
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em]">
                    Scroll
                </span>
                <ArrowDown className="size-4 animate-float" aria-hidden="true" />
            </button>
        </section>
    );
};

export default Hero;

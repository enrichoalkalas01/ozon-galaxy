"use client";

import React from "react";
import SectionHeading from "./SectionHeading";
import {
    AlertCircle,
    Droplets,
    Fish,
    Shield,
    Sun,
    Thermometer,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Consequence {
    title: string;
    description: string;
    icon: LucideIcon;
    iconTone: string;
    cardTone: string;
}

const CONSEQUENCES: Consequence[] = [
    {
        title: "Increased UV radiation",
        description:
            "Every 1% drop in ozone lets roughly 2% more UV-B through. That radiation reaches the ground with enough energy to break DNA bonds directly.",
        icon: Sun,
        iconTone: "text-warn-300",
        cardTone: "from-warn-500/12",
    },
    {
        title: "Human health risks",
        description:
            "Higher rates of melanoma and other skin cancers, cataracts and clouded corneas, plus measurable suppression of the immune response in skin.",
        icon: Shield,
        iconTone: "text-danger-300",
        cardTone: "from-danger-500/12",
    },
    {
        title: "Shifted climate patterns",
        description:
            "A cooler stratosphere over Antarctica strengthens the polar vortex, nudging the southern jet stream and changing rainfall far from the pole.",
        icon: Thermometer,
        iconTone: "text-orange-300",
        cardTone: "from-orange-500/12",
    },
    {
        title: "Crop damage",
        description:
            "UV-B stress reduces leaf area and disrupts photosynthesis. Staples such as rice, wheat and soy show lower yields and altered nutrient content.",
        icon: Droplets,
        iconTone: "text-safe-300",
        cardTone: "from-safe-500/12",
    },
    {
        title: "Marine ecosystem disruption",
        description:
            "Phytoplankton live in the sunlit surface layer and cannot escape UV-B. Losing them weakens the entire food web and the ocean's carbon uptake.",
        icon: Fish,
        iconTone: "text-ozone-300",
        cardTone: "from-ozone-500/12",
    },
];

const Consequences: React.FC = () => {
    return (
        <section
            id="consequences"
            className="section-veil-cool scroll-mt-24 py-16 md:py-24"
        >
            <div className="container-page">
                <SectionHeading
                    className="reveal mb-10 md:mb-12"
                    eyebrow="Why it matters"
                    title="Consequences of Depletion"
                    description="The ozone layer is three millimetres thick if compressed to sea-level pressure. Thinning it changes conditions for everything living underneath."
                    tone="warn"
                />

                <div className="mx-auto max-w-3xl">
                    <ol className="relative space-y-5">
                        {/* Connecting rail, aligned to the centre of the icon column */}
                        <span
                            aria-hidden="true"
                            className="absolute left-6 top-4 bottom-4 hidden w-px bg-gradient-to-b from-warn-400/40 via-white/15 to-ozone-400/40 sm:block"
                        />

                        {CONSEQUENCES.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <li
                                    key={item.title}
                                    className="reveal relative grid gap-4 sm:grid-cols-[3rem_1fr] sm:gap-5"
                                    style={
                                        {
                                            "--reveal-delay": `${index * 55}ms`,
                                        } as React.CSSProperties
                                    }
                                >
                                    {/* Icon node */}
                                    <div className="relative z-10 grid size-12 shrink-0 place-items-center rounded-2xl border border-white/15 bg-space-700 shadow-[0_0_0_4px_rgba(5,6,13,0.9)]">
                                        <Icon
                                            className={cn(
                                                "size-5",
                                                item.iconTone
                                            )}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div
                                        className={cn(
                                            "rounded-2xl border border-white/10 bg-gradient-to-r to-transparent p-5 backdrop-blur-sm transition-transform duration-300 hover:translate-x-1",
                                            item.cardTone
                                        )}
                                    >
                                        <h3 className="text-lg font-semibold text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-white/65">
                                            {item.description}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>

                    {/* Caveat */}
                    <div className="reveal mt-10 flex gap-4 rounded-2xl border border-danger-400/25 bg-danger-500/[0.07] p-5 sm:p-6">
                        <AlertCircle
                            className="mt-0.5 size-5 shrink-0 text-danger-300"
                            aria-hidden="true"
                        />
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-white">
                                This is not only a historical problem
                            </h3>
                            <p className="text-sm leading-relaxed text-white/65">
                                The Montreal Protocol worked, but the Antarctic
                                ozone hole still opens every spring, and cold
                                Arctic winters produce their own depletion
                                events. Full recovery is not projected until
                                around 2066.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Consequences;

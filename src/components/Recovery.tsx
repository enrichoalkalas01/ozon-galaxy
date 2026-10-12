"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";
import {
    ExternalLink,
    FileText,
    HeartHandshake,
    Recycle,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Solution {
    title: string;
    description: string;
    icon: LucideIcon;
    tone: string;
    stat: string;
    statLabel: string;
}

const SOLUTIONS: Solution[] = [
    {
        title: "The Montreal Protocol",
        description:
            "A binding treaty that phased out ozone-depleting substances on a fixed schedule, with separate timelines for developing economies and a fund to pay for the switch.",
        icon: FileText,
        tone: "text-ozone-300 border-ozone-400/25 bg-ozone-500/10",
        stat: "~99%",
        statLabel: "of controlled substances phased out since 1987",
    },
    {
        title: "Alternative technologies",
        description:
            "Industry replaced CFCs with HCFCs, then HFCs, and is now moving to HFOs, hydrocarbons and CO₂ — each generation less damaging than the last.",
        icon: Recycle,
        tone: "text-safe-300 border-safe-400/25 bg-safe-500/10",
        stat: "4",
        statLabel: "generations of refrigerant chemistry replaced",
    },
    {
        title: "Global cooperation",
        description:
            "The only UN treaty ever ratified by every member state. Science, industry and governments agreed on evidence first, then on a timetable.",
        icon: HeartHandshake,
        tone: "text-purple-300 border-purple-400/25 bg-purple-500/10",
        stat: "198",
        statLabel: "parties — universal ratification",
    },
    {
        title: "Ongoing monitoring",
        description:
            "Satellites, ground stations and balloon soundings track ozone, UV and trace gases continuously — which is how illegal CFC-11 emissions were caught in 2018.",
        icon: ShieldCheck,
        tone: "text-warn-300 border-warn-400/25 bg-warn-500/10",
        stat: "~2066",
        statLabel: "projected return to 1980 Antarctic levels",
    },
];

const TIMELINE = [
    {
        year: "1974",
        event: "Molina and Rowland publish the theory that CFCs destroy stratospheric ozone.",
    },
    {
        year: "1985",
        event: "The British Antarctic Survey reports the ozone hole over Halley Bay.",
    },
    {
        year: "1987",
        event: "The Montreal Protocol is signed, setting binding phase-out schedules.",
    },
    {
        year: "1990",
        event: "London amendments tighten the targets and create the Multilateral Fund.",
    },
    {
        year: "2000",
        event: "Production of CFCs for most uses ends in industrialised countries.",
    },
    {
        year: "2016",
        event: "The first statistically significant healing of the Antarctic hole is confirmed.",
    },
    {
        year: "2023",
        event: "WMO assessment confirms recovery remains on track for the 2060s.",
    },
];

const Recovery: React.FC = () => {
    return (
        <section
            id="recovery"
            className="section-veil scroll-mt-24 py-16 md:py-24"
        >
            <div className="container-page">
                <SectionHeading
                    className="reveal mb-10 md:mb-12"
                    eyebrow="Hope for the future"
                    title="The Path to Recovery"
                    description="The ozone layer is the clearest case we have of a global environmental problem being identified, legislated and measurably reversed."
                    tone="aurora"
                />

                {/* Solutions */}
                <div className="grid gap-6 md:grid-cols-2">
                    {SOLUTIONS.map((solution, index) => {
                        const Icon = solution.icon;

                        return (
                            <article
                                key={solution.title}
                                className="reveal glass-card flex flex-col gap-4 p-6 transition-transform duration-500 hover:-translate-y-1"
                                style={
                                    {
                                        "--reveal-delay": `${index * 60}ms`,
                                    } as React.CSSProperties
                                }
                            >
                                <span
                                    className={cn(
                                        "grid size-12 place-items-center rounded-2xl border",
                                        solution.tone
                                    )}
                                >
                                    <Icon
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </span>

                                <h3 className="text-xl font-semibold text-white">
                                    {solution.title}
                                </h3>

                                <p className="text-sm leading-relaxed text-white/65">
                                    {solution.description}
                                </p>

                                <div className="mt-auto flex items-baseline gap-3 border-t border-white/10 pt-4">
                                    <span className="font-display text-2xl font-semibold text-aurora-300">
                                        {solution.stat}
                                    </span>
                                    <span className="text-xs leading-snug text-white/50">
                                        {solution.statLabel}
                                    </span>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Timeline ------------------------------------------------ */}
                <div className="reveal mt-16">
                    <h3 className="mb-8 text-center text-2xl font-semibold text-white">
                        Fifty years, start to recovery
                    </h3>

                    {/* One column with the years aligned in a gutter: denser
                        than an alternating layout and far easier to scan. */}
                    <ol className="relative mx-auto max-w-2xl">
                        <span
                            aria-hidden="true"
                            className="absolute bottom-3 top-3 left-[3.6875rem] w-px bg-gradient-to-b from-ozone-400/60 via-white/15 to-aurora-400/60"
                        />

                        {TIMELINE.map((item, index) => (
                            <li
                                key={item.year}
                                className="reveal group grid grid-cols-[3.25rem_1.5rem_1fr] items-start gap-x-3 py-2.5"
                                style={
                                    {
                                        "--reveal-delay": `${index * 30}ms`,
                                    } as React.CSSProperties
                                }
                            >
                                <span className="pt-0.5 text-right font-mono text-sm font-semibold tabular-nums text-ozone-200">
                                    {item.year}
                                </span>

                                <span
                                    aria-hidden="true"
                                    className="relative z-10 mt-1.5 grid size-6 place-items-center"
                                >
                                    <span className="size-2.5 rounded-full bg-ozone-400 ring-4 ring-space-900 transition-transform duration-300 group-hover:scale-125" />
                                </span>

                                <p className="pt-0.5 text-sm leading-relaxed text-white/70">
                                    {item.event}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Call to action ------------------------------------------ */}
                <div className="reveal mx-auto mt-16 max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-b from-ozone-500/10 to-transparent p-8 text-center sm:p-10">
                    <h3 className="text-2xl font-semibold text-white">
                        Be part of the solution
                    </h3>
                    <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">
                        The layer is healing because the problem was taken
                        seriously. Keep following the science — and the
                        monitoring that keeps the treaty honest.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="h-11 rounded-full bg-white px-6 font-semibold text-space-900 hover:bg-ozone-100"
                        >
                            <a
                                href="https://www.unep.org/ozonaction/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                UNEP OzonAction
                                <ExternalLink
                                    className="size-3.5"
                                    aria-hidden="true"
                                />
                            </a>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-11 rounded-full border-white/15 bg-white/[0.03] px-6 text-white hover:border-white/25 hover:bg-white/10 hover:text-white"
                        >
                            <a
                                href="https://ozonewatch.gsfc.nasa.gov/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                NASA Ozone Watch
                                <ExternalLink
                                    className="size-3.5"
                                    aria-hidden="true"
                                />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Recovery;

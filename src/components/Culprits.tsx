"use client";

import React from "react";
import MoleculeAnimation, { type MoleculeType } from "./MoleculeAnimation";
import SectionHeading from "./SectionHeading";
import {
    AlertTriangle,
    ArrowRight,
    Flame,
    PlaneTakeoff,
    Zap,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Culprit {
    name: string;
    shortName: string;
    formula: string;
    icon: LucideIcon;
    tone: string;
    description: string;
    moleculeType: MoleculeType;
    reaction: string;
    secondReaction: string;
    usedIn: string;
}

const CULPRITS: Culprit[] = [
    {
        name: "Chlorofluorocarbons",
        shortName: "CFC-12",
        formula: "CCl₂F₂",
        icon: AlertTriangle,
        tone: "text-danger-300 border-danger-400/30 bg-danger-500/10",
        description:
            "Once standard in fridges, air conditioners and aerosol cans. They are inert at ground level, which is exactly why they survive the trip to the stratosphere — where UV light finally breaks them apart.",
        moleculeType: "cfc",
        reaction: "CCl₂F₂ + UV → CClF₂· + Cl·",
        secondReaction: "Cl· + O₃ → ClO· + O₂",
        usedIn: "Refrigeration · aerosols",
    },
    {
        name: "Halons",
        shortName: "Halon-1301",
        formula: "CBrF₃",
        icon: Flame,
        tone: "text-orange-300 border-orange-400/30 bg-orange-500/10",
        description:
            "Fire-suppression agents built around bromine, which is roughly 60 times more destructive to ozone than chlorine. A single bromine atom can take out thousands of ozone molecules.",
        moleculeType: "halon",
        reaction: "CBrF₃ + UV → CF₃· + Br·",
        secondReaction: "Br· + O₃ → BrO· + O₂",
        usedIn: "Fire extinguishers",
    },
    {
        name: "Nitrogen oxides",
        shortName: "NOₓ",
        formula: "NO₂",
        icon: PlaneTakeoff,
        tone: "text-ozone-300 border-ozone-400/30 bg-ozone-500/10",
        description:
            "Produced by high-altitude aircraft, lightning and fertiliser breakdown. They run a catalytic cycle that quietly converts ozone back into ordinary oxygen.",
        moleculeType: "nox",
        reaction: "NO· + O₃ → NO₂ + O₂",
        secondReaction: "NO₂ + O· → NO· + O₂",
        usedIn: "Aviation · combustion",
    },
];

const Culprits: React.FC = () => {
    return (
        <section
            id="culprits"
            className="section-veil scroll-mt-24 py-16 md:py-24"
        >
            <div className="container-page">
                <SectionHeading
                    className="reveal mb-10 md:mb-12"
                    eyebrow="The danger zone"
                    title="Meet the Culprits"
                    description="Three families of molecules did most of the damage. Each one is stable enough to reach the stratosphere and reactive enough to wreck it once there."
                    tone="danger"
                />

                <div className="grid gap-6 lg:grid-cols-3">
                    {CULPRITS.map((culprit, index) => {
                        const Icon = culprit.icon;

                        return (
                            <article
                                key={culprit.formula}
                                className="reveal glass-card group flex flex-col gap-5 p-6 transition-transform duration-500 hover:-translate-y-1"
                                style={
                                    {
                                        "--reveal-delay": `${index * 70}ms`,
                                    } as React.CSSProperties
                                }
                            >
                                <header className="space-y-3">
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                                            culprit.tone
                                        )}
                                    >
                                        <Icon
                                            className="size-3.5"
                                            aria-hidden="true"
                                        />
                                        {culprit.shortName}
                                    </span>

                                    <h3 className="text-xl font-semibold text-white">
                                        {culprit.name}
                                    </h3>

                                    <p className="font-mono text-sm text-white/55">
                                        {culprit.formula}
                                        <span className="mx-2 text-white/20">
                                            |
                                        </span>
                                        <span className="font-sans text-xs">
                                            {culprit.usedIn}
                                        </span>
                                    </p>
                                </header>

                                <div className="flex justify-center py-2">
                                    <MoleculeAnimation
                                        type={culprit.moleculeType}
                                        className="max-w-[9rem]"
                                    />
                                </div>

                                <p className="text-sm leading-relaxed text-white/65">
                                    {culprit.description}
                                </p>

                                <div className="mt-auto rounded-xl border border-white/10 bg-space-800/60 p-4">
                                    <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                                        <Zap
                                            className="size-3.5 text-warn-300"
                                            aria-hidden="true"
                                        />
                                        Reaction chain
                                    </h4>
                                    <div className="space-y-1.5">
                                        <code className="block rounded-lg border border-white/5 bg-white/[0.04] px-2.5 py-2 text-center text-xs text-white/85">
                                            {culprit.reaction}
                                        </code>
                                        <ArrowRight
                                            className="mx-auto size-3.5 rotate-90 text-white/25"
                                            aria-hidden="true"
                                        />
                                        <code className="block rounded-lg border border-white/5 bg-white/[0.04] px-2.5 py-2 text-center text-xs text-white/85">
                                            {culprit.secondReaction}
                                        </code>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Catalytic cycle explainer */}
                <div className="reveal mt-14 glass-card overflow-hidden">
                    <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-white">
                                Why one atom does so much damage
                            </h3>
                            <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                                Chlorine does not get used up. It strips an
                                oxygen atom from ozone to form chlorine
                                monoxide, then hands that oxygen off to a free
                                oxygen atom — releasing the chlorine to start
                                over.
                            </p>
                            <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                                That loop runs until the chlorine is finally
                                locked into a reservoir compound and rained out.
                                In the meantime, a{" "}
                                <strong className="font-semibold text-white">
                                    single chlorine atom can destroy around
                                    100,000 ozone molecules
                                </strong>
                                .
                            </p>
                        </div>

                        {/* Cycle diagram */}
                        <div className="rounded-2xl border border-white/10 bg-space-800/50 p-6">
                            <ol className="space-y-3">
                                {[
                                    {
                                        step: "O₃ + Cl· → ClO· + O₂",
                                        note: "Ozone is torn apart",
                                        tone: "border-danger-400/30 text-danger-200",
                                    },
                                    {
                                        step: "ClO· + O· → Cl· + O₂",
                                        note: "Chlorine is handed back",
                                        tone: "border-warn-400/30 text-warn-200",
                                    },
                                    {
                                        step: "Net: 2O₃ → 3O₂",
                                        note: "The catalyst survives intact",
                                        tone: "border-ozone-400/30 text-ozone-200",
                                    },
                                ].map((item, index) => (
                                    <li
                                        key={item.step}
                                        className={cn(
                                            "rounded-xl border bg-white/[0.03] px-4 py-3",
                                            item.tone
                                        )}
                                    >
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-mono text-xs opacity-60">
                                                {index + 1}
                                            </span>
                                            <code className="font-mono text-sm font-semibold">
                                                {item.step}
                                            </code>
                                        </div>
                                        <p className="mt-1 pl-6 text-xs text-white/50">
                                            {item.note}
                                        </p>
                                    </li>
                                ))}
                            </ol>

                            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-danger-300/90">
                                <AlertTriangle
                                    className="mt-0.5 size-3.5 shrink-0"
                                    aria-hidden="true"
                                />
                                The chlorine atom is released again — the cycle
                                repeats for years.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Culprits;

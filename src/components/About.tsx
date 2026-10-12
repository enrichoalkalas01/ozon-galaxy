import React from "react";
import SectionHeading from "./SectionHeading";
import { Atom, Ruler, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/** Atmospheric layers, ordered top-down for display. */
const LAYERS = [
    {
        name: "Thermosphere",
        range: "85–600 km",
        weight: 2,
        className: "bg-white/[0.04]",
        labelTone: "text-white/55",
    },
    {
        name: "Mesosphere",
        range: "50–85 km",
        weight: 2.4,
        className: "bg-white/[0.06]",
        labelTone: "text-white/55",
    },
    {
        name: "Stratosphere",
        range: "15–50 km",
        weight: 3,
        className:
            "bg-gradient-to-b from-ozone-500/15 via-ozone-400/35 to-ozone-500/15",
        labelTone: "text-ozone-200",
        highlight: "Ozone layer concentrated at 15–35 km",
    },
    {
        name: "Troposphere",
        range: "0–15 km",
        weight: 1.6,
        className: "bg-gradient-to-b from-white/[0.06] to-safe-500/15",
        labelTone: "text-white/55",
    },
];

const FACTS = [
    {
        icon: Ruler,
        term: "Thickness",
        copy: "Compressed to sea-level pressure the whole layer would be about 3 mm thick.",
    },
    {
        icon: ShieldCheck,
        term: "Function",
        copy: "Absorbs 97–99% of the Sun's incoming medium-frequency ultraviolet light.",
    },
    {
        icon: Atom,
        term: "Composition",
        copy: "Three oxygen atoms (O₃), continuously formed and destroyed by sunlight.",
    },
];

const About: React.FC = () => {
    return (
        <section id="about" className="section-veil scroll-mt-24 py-16 md:py-24">
            <div className="container-page">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Copy */}
                    <div className="reveal space-y-6">
                        <SectionHeading
                            align="left"
                            eyebrow="The protective shield"
                            title="What is the Ozone Layer?"
                        />

                        <div className="space-y-4 text-base leading-relaxed text-white/70">
                            <p>
                                The ozone layer is a band within Earth&apos;s
                                stratosphere, roughly 15 to 35 kilometres up,
                                where ozone (O₃) is concentrated far more
                                densely than anywhere else in the atmosphere.
                            </p>
                            <p>
                                It is not a solid shell. Ozone is constantly
                                being created as UV light splits oxygen
                                molecules, and constantly being destroyed as it
                                absorbs more UV. That balance is what filters
                                out UV-B and UV-C before they reach the ground.
                            </p>
                            <p>
                                In the 1970s and 80s scientists found that
                                human-made chemicals — mainly
                                chlorofluorocarbons — were tipping that balance
                                towards destruction. It became the first
                                environmental crisis the whole world agreed to
                                fix together.
                            </p>
                        </div>

                        <dl className="grid gap-3 pt-2 sm:grid-cols-3">
                            {FACTS.map(({ icon: Icon, term, copy }) => (
                                <div
                                    key={term}
                                    className="glass-panel space-y-2 p-4"
                                >
                                    <Icon
                                        className="size-4 text-ozone-300"
                                        aria-hidden="true"
                                    />
                                    <dt className="text-sm font-semibold text-white">
                                        {term}
                                    </dt>
                                    <dd className="text-xs leading-relaxed text-white/55">
                                        {copy}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* Atmosphere diagram */}
                    <div
                        className="reveal glass-card p-5 sm:p-6"
                        style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
                    >
                        <div className="mb-5 space-y-1">
                            <h3 className="text-lg font-semibold text-white">
                                Where the layer sits
                            </h3>
                            <p className="text-sm text-white/55">
                                Layers of the atmosphere, ground at the bottom.
                            </p>
                        </div>

                        <div
                            className="flex h-[22rem] flex-col gap-1.5"
                            role="img"
                            aria-label="Diagram of the atmospheric layers, with the ozone layer inside the stratosphere between 15 and 35 kilometres"
                        >
                            {LAYERS.map((layer) => (
                                <div
                                    key={layer.name}
                                    className={cn(
                                        "relative flex flex-col justify-center overflow-hidden rounded-xl border border-white/10 px-4",
                                        layer.className
                                    )}
                                    style={{ flexGrow: layer.weight, flexBasis: 0 }}
                                >
                                    <div className="flex items-baseline justify-between gap-3">
                                        <span
                                            className={cn(
                                                "text-sm font-semibold",
                                                layer.labelTone
                                            )}
                                        >
                                            {layer.name}
                                        </span>
                                        <span className="font-mono text-[0.7rem] text-white/40">
                                            {layer.range}
                                        </span>
                                    </div>

                                    {layer.highlight && (
                                        <p className="mt-1 text-xs text-ozone-200/80">
                                            {layer.highlight}
                                        </p>
                                    )}
                                </div>
                            ))}

                            {/* Ground */}
                            <div className="flex h-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-safe-500/20">
                                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-safe-200/80">
                                    Surface
                                </span>
                            </div>
                        </div>

                        {/* Ozone density indicator */}
                        <div className="mt-5 space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-medium text-ozone-200">
                                    Ozone concentration
                                </span>
                                <span className="font-mono text-white/45">
                                    peak ≈ 22 km
                                </span>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-ozone-600 via-ozone-400 to-aurora-300 animate-pulse-slow" />
                            </div>
                            <p className="text-xs text-white/45">
                                Even at its peak, ozone is only a few parts per
                                million of the surrounding air.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

"use client";
import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import MoleculeAnimation from "./MoleculeAnimation";
import {
    AlertTriangle,
    Flame,
    PlaneTakeoff,
    ArrowRight,
    Zap,
} from "lucide-react";

const Culprits: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const culprits = [
        {
            name: "Chlorofluorocarbons (CFC-12)",
            formula: "CCl₂F₂",
            icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
            description:
                "Once commonly used in refrigerators, air conditioners, and aerosol spray cans, these synthetic compounds break down in the stratosphere, releasing chlorine atoms that destroy ozone molecules.",
            moleculeType: "cfc",
            reaction: "CCl₂F₂ + UV light → CCl₂F + Cl",
            secondReaction: "Cl + O₃ → ClO + O₂",
        },
        {
            name: "Halons (Halon-1301)",
            formula: "CBrF₃",
            icon: <Flame className="h-5 w-5 text-orange-500" />,
            description:
                "Used in fire extinguishers, these compounds contain bromine, which is even more destructive to ozone than chlorine. When released, one bromine atom can destroy thousands of ozone molecules.",
            moleculeType: "halon",
            reaction: "CBrF₃ + UV light → CBrF₂ + Br",
            secondReaction: "Br + O₃ → BrO + O₂",
        },
        {
            name: "Nitrogen Oxides",
            formula: "NO₂",
            icon: <PlaneTakeoff className="h-5 w-5 text-blue-500" />,
            description:
                "Emitted by high-flying aircraft and formed during lightning strikes, these gases participate in catalytic cycles that convert ozone back to oxygen, reducing the protective layer.",
            moleculeType: "nox",
            reaction: "NO + O₃ → NO₂ + O₂",
            secondReaction: "NO₂ + O → NO + O₂",
        },
    ];

    return (
        <section
            id="culprits"
            ref={sectionRef}
            className="py-20 md:py-32 bg-gradient-to-b from-space-dark to-slate-900 section-fade-in"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-primary/80 uppercase tracking-wider mb-2">
                        The Danger Zone
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Meet the Culprits
                    </h2>
                    <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                        These harmful substances are responsible for depleting
                        our protective ozone shield.
                    </p>
                </div>

                {/* Culprits cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {culprits.map((culprit, index) => (
                        <Card
                            key={index}
                            className="glass-card overflow-hidden transition-transform duration-500 hover:translate-y-[-5px]"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    {culprit.icon}
                                    <h3 className="text-xl font-semibold text-white">
                                        {culprit.name}
                                    </h3>
                                </div>
                                <div className="text-sm text-white/80 mb-4">
                                    {culprit.formula}
                                </div>
                                <p className="text-white/70">
                                    {culprit.description}
                                </p>

                                <div className="mt-6 flex justify-center h-44">
                                    <MoleculeAnimation
                                        type={culprit.moleculeType as any}
                                    />
                                </div>

                                <div className="mt-4 bg-black/30 rounded-lg p-3 border border-white/10">
                                    <h4 className="text-sm font-semibold text-white/90 mb-2 flex items-center">
                                        <Zap className="h-4 w-4 text-yellow-400 mr-1" />
                                        Chemical Reactions
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="text-xs text-white/80 bg-white/5 p-2 rounded">
                                            <div className="flex items-center">
                                                <span>{culprit.reaction}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <ArrowRight className="h-4 w-4 text-white/40" />
                                        </div>
                                        <div className="text-xs text-white/80 bg-white/5 p-2 rounded">
                                            <div className="flex items-center">
                                                <span>
                                                    {culprit.secondReaction}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Visualization */}
                <div className="mt-20 bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                How Ozone Gets Destroyed
                            </h3>
                            <p className="text-white/70 mb-4">
                                When UV radiation strikes a CFC molecule in the
                                stratosphere, it breaks off a chlorine atom.
                                This chlorine atom then attacks an ozone
                                molecule, converting it to oxygen and creating a
                                chlorine monoxide molecule.
                            </p>
                            <p className="text-white/70">
                                The chlorine monoxide can then react with an
                                oxygen atom, releasing the chlorine atom again
                                to restart the cycle. A single chlorine atom can
                                destroy up to 100,000 ozone molecules before
                                it's removed from the stratosphere.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="relative flex flex-col items-center">
                                <MoleculeAnimation
                                    type="ozone"
                                    className="mb-4"
                                />
                                <div className="h-16 w-1 bg-gradient-to-b from-transparent to-red-500"></div>
                                <div className="mt-4 text-center">
                                    <div className="inline-flex items-center gap-2 text-red-400 mb-2">
                                        <AlertTriangle className="h-4 w-4" />
                                        <span className="font-semibold">
                                            Destruction Process
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/70">
                                        O₃ + Cl → O₂ + ClO
                                    </p>
                                    <p className="text-sm text-white/70">
                                        ClO + O → Cl + O₂
                                    </p>
                                    <p className="text-xs mt-1 text-red-400/70">
                                        Cl atom is released to destroy more
                                        ozone!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Culprits;

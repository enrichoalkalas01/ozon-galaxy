"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    ExternalLink,
    FileText,
    HeartHandshake,
    Recycle,
    ShieldCheck,
} from "lucide-react";

const Recovery: React.FC = () => {
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

    const solutions = [
        {
            title: "Montreal Protocol",
            description:
                "An international treaty designed to protect the ozone layer by phasing out the production and consumption of ozone-depleting substances.",
            icon: <FileText className="h-12 w-12 p-2 text-blue-400" />,
            stats: "98% reduction in ozone-depleting substances since 1987",
        },
        {
            title: "Alternative Technologies",
            description:
                "Development and adoption of ozone-friendly alternatives to CFCs and other harmful chemicals in refrigeration, air conditioning, and aerosols.",
            icon: <Recycle className="h-12 w-12 p-2 text-green-400" />,
            stats: "Hundreds of new safe alternatives developed",
        },
        {
            title: "Global Cooperation",
            description:
                "Unprecedented collaboration between nations, industries, and scientists to address a common environmental threat.",
            icon: <HeartHandshake className="h-12 w-12 p-2 text-purple-400" />,
            stats: "198 countries participating in protection efforts",
        },
        {
            title: "Ongoing Monitoring",
            description:
                "Continuous scientific monitoring of ozone levels, UV radiation, and the concentration of ozone-depleting substances in the atmosphere.",
            icon: <ShieldCheck className="h-12 w-12 p-2 text-yellow-400" />,
            stats: "Expected full recovery by 2060-2070",
        },
    ];

    const timeline = [
        { year: 1974, event: "Scientists discover that CFCs destroy ozone" },
        {
            year: 1985,
            event: "British Antarctic Survey discovers the ozone hole",
        },
        { year: 1987, event: "Montreal Protocol is signed" },
        { year: 1990, event: "Protocol amendments strengthen restrictions" },
        { year: 2000, event: "Global CFC production for most uses ends" },
        {
            year: 2016,
            event: "First signs of Antarctic ozone healing detected",
        },
        { year: 2019, event: "Confirmation of ozone layer recovery progress" },
    ];

    return (
        <section
            id="recovery"
            ref={sectionRef}
            className="py-20 md:py-32 bg-gradient-to-b from-black to-blue-950 section-fade-in"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">
                        Hope for the Future
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        The Path to Recovery
                    </h2>
                    <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                        The ozone layer's healing is one of humanity's greatest
                        environmental success stories.
                    </p>
                </div>

                {/* Solutions grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
                    {solutions.map((solution, index) => (
                        <div
                            key={index}
                            className="glass-card rounded-xl p-6 transition-transform duration-500 hover:translate-y-[-5px]"
                        >
                            <div className="mb-4 bg-white/5 rounded-full w-16 h-16 flex items-center justify-center">
                                {solution.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {solution.title}
                            </h3>
                            <p className="text-white/70 mb-4">
                                {solution.description}
                            </p>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-sm font-medium text-blue-400">
                                    {solution.stats}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto mb-20">
                    <h3 className="text-2xl font-semibold text-white mb-8 text-center">
                        Recovery Timeline
                    </h3>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-blue-600/50 via-blue-400/50 to-green-400/50"></div>

                        {/* Timeline events */}
                        {timeline.map((item, index) => (
                            <div
                                key={index}
                                className={`relative mb-8 ${
                                    index % 2 === 0 ? "md:text-right" : ""
                                }`}
                            >
                                <div className="flex items-center mb-2 md:mb-0">
                                    {/* Timeline marker */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                        <div className="h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                    </div>

                                    {/* Content for larger screens (different sides) */}
                                    <div
                                        className={`hidden md:block absolute top-0 w-[calc(50%-20px)] ${
                                            index % 2 === 0
                                                ? "left-0"
                                                : "right-0"
                                        }`}
                                    >
                                        <div
                                            className={`${
                                                index % 2 === 0
                                                    ? "pr-8"
                                                    : "pl-8"
                                            }`}
                                        >
                                            <span className="text-xl font-semibold text-blue-400">
                                                {item.year}
                                            </span>
                                            <p className="text-white/90 mt-1">
                                                {item.event}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content for mobile (all on right side) */}
                                    <div className="md:hidden ml-16">
                                        <span className="text-xl font-semibold text-blue-400">
                                            {item.year}
                                        </span>
                                        <p className="text-white/90 mt-1">
                                            {item.event}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to action */}
                <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                        Be Part of the Solution
                    </h3>
                    <p className="text-white/70 mb-8">
                        While the ozone layer is healing, our efforts must
                        continue. Learn more about how you can contribute to
                        protecting our atmosphere.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                            onClick={() =>
                                window.open(
                                    "https://www.unep.org/ozonaction/",
                                    "_blank"
                                )
                            }
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            UNEP OzonAction
                            <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                        <Button
                            variant="outline"
                            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                            onClick={() =>
                                window.open(
                                    "https://ozonewatch.gsfc.nasa.gov/",
                                    "_blank"
                                )
                            }
                        >
                            NASA Ozone Watch
                            <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Recovery;

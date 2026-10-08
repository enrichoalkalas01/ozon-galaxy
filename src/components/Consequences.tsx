"use client";
import React, { useEffect, useRef } from "react";
import {
    ChevronRight,
    AlertCircle,
    Shield,
    Sun,
    Thermometer,
    Droplets,
    Fish,
} from "lucide-react";

const Consequences: React.FC = () => {
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

    const consequences = [
        {
            title: "Increased UV Radiation",
            description:
                "Higher levels of harmful UV-B radiation reach Earth's surface, leading to various health and environmental issues.",
            icon: <Sun className="h-10 w-10 text-yellow-400" />,
            color: "from-yellow-500/20 to-yellow-600/5",
        },
        {
            title: "Human Health Risks",
            description:
                "More cases of skin cancer, cataracts, and weakened immune systems due to increased UV exposure.",
            icon: <Shield className="h-10 w-10 text-red-400" />,
            color: "from-red-500/20 to-red-600/5",
        },
        {
            title: "Climate Change Effects",
            description:
                "Ozone depletion can impact atmospheric circulation patterns, contributing to climate change.",
            icon: <Thermometer className="h-10 w-10 text-orange-400" />,
            color: "from-orange-500/20 to-orange-600/5",
        },
        {
            title: "Crop Damage",
            description:
                "Reduced agricultural yields as increased UV radiation harms plant growth and photosynthesis processes.",
            icon: <Droplets className="h-10 w-10 text-green-400" />,
            color: "from-green-500/20 to-green-600/5",
        },
        {
            title: "Marine Ecosystem Disruption",
            description:
                "Phytoplankton productivity decreases, affecting the entire marine food chain and reducing oceanic carbon dioxide absorption.",
            icon: <Fish className="h-10 w-10 text-blue-400" />,
            color: "from-blue-500/20 to-blue-600/5",
        },
    ];

    return (
        <section
            id="consequences"
            ref={sectionRef}
            className="py-20 md:py-32 bg-gradient-to-b from-slate-900 to-black section-fade-in"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-red-400 uppercase tracking-wider mb-2">
                        Why It Matters
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Consequences of Ozone Depletion
                    </h2>
                    <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                        When our protective shield weakens, several serious
                        effects impact life on Earth.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative pl-8 border-l border-white/10">
                        {consequences.map((item, index) => (
                            <div
                                key={index}
                                className="mb-14 relative animate-fade-in"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                {/* Timeline dot */}
                                <div className="absolute -left-[41px] rounded-full p-2 bg-gradient-radial bg-black border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    {item.icon}
                                </div>

                                {/* Content */}
                                <div
                                    className={`pl-6 pr-4 py-6 rounded-xl bg-gradient-to-r ${item.color} backdrop-blur-sm border border-white/10 transition-transform duration-300 hover:translate-x-1`}
                                >
                                    <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                                        {item.title}
                                        <ChevronRight className="ml-2 h-4 w-4 text-primary/70" />
                                    </h3>
                                    <p className="text-white/70">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alert box */}
                <div className="mt-8 max-w-4xl mx-auto p-6 rounded-xl bg-red-500/10 border border-red-500/30">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <AlertCircle className="h-6 w-6 text-red-400" />
                        </div>
                        <div>
                            <h4 className="text-lg font-medium text-white mb-2">
                                This is not just a future concern
                            </h4>
                            <p className="text-white/70">
                                While the Montreal Protocol has helped reduce
                                ozone-depleting substances, the Antarctic ozone
                                hole still forms annually, and full recovery
                                isn't expected until around 2060-2070. The
                                Arctic has also experienced significant ozone
                                depletion during cold winters.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Consequences;

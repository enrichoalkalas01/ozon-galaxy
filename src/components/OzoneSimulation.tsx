"use client";
import React, { useState, useEffect, useRef } from "react";
import EarthModel from "./EarthModel";
import SimulationControls from "./SimulationControls";
import MoleculeAnimation from "./MoleculeAnimation";
import TemperatureDisplay from "./TemperatureDisplay";
import { Info } from "lucide-react";

type Season = "spring" | "summer" | "autumn" | "winter";

const OzoneSimulation: React.FC = () => {
    const [ozoneLevel, setOzoneLevel] = useState<number>(10);
    const [temperature, setTemperature] = useState<number>(16); // Default to spring
    const [currentSeason, setCurrentSeason] = useState<Season>("spring");
    const [simulationInfo, setSimulationInfo] = useState<string>(
        "Healthy ozone layer protects Earth from harmful UV radiation"
    );
    const sectionRef = useRef<HTMLElement>(null);

    const getOzoneStatus = () => {
        if (ozoneLevel > 7) return "healthy";
        if (ozoneLevel > 3) return "damaged";
        return "critical";
    };

    const handleSeasonChange = (season: string) => {
        setCurrentSeason(season as Season);
    };

    useEffect(() => {
        if (ozoneLevel <= 3) {
            setSimulationInfo(
                "CRITICAL: Ozone layer severely depleted, dangerous UV radiation reaching Earth's surface"
            );
        } else if (ozoneLevel <= 7) {
            setSimulationInfo(
                "WARNING: Ozone layer damaged, increased UV radiation reaching Earth"
            );
        } else {
            setSimulationInfo(
                "Healthy ozone layer protects Earth from harmful UV radiation"
            );
        }

        if (temperature >= 30) {
            setSimulationInfo(
                (prev) =>
                    `${prev}. High temperatures accelerating ozone depletion`
            );
        } else if (temperature <= 10) {
            setSimulationInfo(
                (prev) =>
                    `${prev}. Cold temperatures slow ozone recovery process`
            );
        }
    }, [ozoneLevel, temperature]);

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

    return (
        <section
            id="simulation"
            ref={sectionRef}
            className="py-20 md:py-32 bg-gradient-to-b from-slate-950 to-space-dark section-fade-in"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">
                        Interactive Experience
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Ozone Layer Simulation
                    </h2>
                    <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                        Explore how different factors affect Earth's protective
                        ozone shield.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-black/30 backdrop-blur-md rounded-xl p-8 w-full border border-white/10 shadow-lg">
                            <div className="flex justify-center">
                                <EarthModel
                                    ozoneLevel={ozoneLevel}
                                    rotating={true}
                                    temperature={temperature}
                                />
                            </div>

                            <div className="mt-4 bg-black/60 rounded-lg p-4 border border-white/10 animate-pulse-slow">
                                <div className="flex items-start gap-3">
                                    <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-white/90">
                                        <span className="font-medium text-blue-400">
                                            Simulation Status:
                                        </span>{" "}
                                        {simulationInfo}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 bg-black/40 rounded-lg p-4 border border-white/5">
                                <div className="flex flex-wrap justify-between items-start gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs text-white/50 uppercase tracking-wider">
                                            Ozone Layer Status
                                        </p>
                                        <p className="text-lg font-medium text-white flex items-center">
                                            <span
                                                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                                    ozoneLevel > 7
                                                        ? "bg-green-500"
                                                        : ozoneLevel > 3
                                                        ? "bg-yellow-500"
                                                        : "bg-red-500"
                                                }`}
                                            ></span>
                                            {ozoneLevel > 7
                                                ? "Healthy"
                                                : ozoneLevel > 3
                                                ? "Damaged"
                                                : "Critical"}
                                        </p>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <TemperatureDisplay
                                            temperature={temperature}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <div className="text-xs text-white/50 uppercase tracking-wider mb-3 text-center">
                                        Molecular Structure
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="flex flex-col items-center">
                                            <p className="text-xs text-blue-400 mb-1">
                                                Ozone (O₃)
                                            </p>
                                            <MoleculeAnimation
                                                type="ozone"
                                                status={getOzoneStatus()}
                                                showLabels={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <SimulationControls
                            onOzoneChange={setOzoneLevel}
                            onTemperatureChange={setTemperature}
                            onSeasonChange={handleSeasonChange}
                        />
                    </div>
                </div>

                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg">
                        <h3 className="text-xl font-semibold text-white mb-4">
                            What's Happening in the Simulation?
                        </h3>
                        <div className="space-y-4 text-white/80">
                            <p>
                                This interactive simulation demonstrates how
                                various factors affect the Earth's ozone layer
                                and climate:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <span className="text-blue-400 font-medium">
                                        Ozone Layer:
                                    </span>{" "}
                                    The blue shield surrounding Earth represents
                                    the ozone layer. Its opacity changes based
                                    on the ozone level value (0-10).
                                </li>
                                <li>
                                    <span className="text-yellow-400 font-medium">
                                        UV Radiation:
                                    </span>{" "}
                                    When the ozone layer becomes depleted (less
                                    than 5), yellow rays appear, representing
                                    harmful UV radiation reaching Earth.
                                </li>
                                <li>
                                    <span className="text-green-400 font-medium">
                                        Earth Condition:
                                    </span>{" "}
                                    The colors and appearance of Earth change
                                    based on temperature and ozone levels.
                                    Drought conditions appear during high
                                    temperatures or critical ozone levels.
                                </li>
                                <li>
                                    <span className="text-purple-400 font-medium">
                                        Chemical Reactions:
                                    </span>{" "}
                                    Each action you take (adding factories,
                                    cars, etc.) triggers specific chemical
                                    reactions that affect the ozone layer and
                                    temperature.
                                </li>
                                <li>
                                    <span className="text-orange-400 font-medium">
                                        Seasons:
                                    </span>{" "}
                                    Changing seasons affects the baseline
                                    temperature, which influences how quickly
                                    the ozone layer can recover or degrade.
                                </li>
                            </ul>
                            <p>
                                Try different combinations of actions to see how
                                they impact the Earth and its protective ozone
                                shield!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OzoneSimulation;

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    PlusCircle,
    MinusCircle,
    AlertCircle,
    Factory,
    Car,
    Plane,
    TreePine,
    Leaf,
    Sun,
    Snowflake,
    Flower,
    Leaf as AutumnLeaf,
    Beaker,
    ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface SimulationControlsProps {
    onOzoneChange: (value: number) => void;
    onTemperatureChange: (value: number) => void;
    onSeasonChange?: (season: string) => void;
}

type Season = "spring" | "summer" | "autumn" | "winter";

const seasonTemperatures = {
    spring: 16,
    summer: 25,
    autumn: 18,
    winter: 9,
};

const SimulationControls: React.FC<SimulationControlsProps> = ({
    onOzoneChange,
    onTemperatureChange,
    onSeasonChange,
}) => {
    const [ozone, setOzone] = useState<number>(10);
    const [temperature, setTemperature] = useState<number>(20);
    const [currentSeason, setCurrentSeason] = useState<Season>("spring");
    const [showReaction, setShowReaction] = useState<string | null>(null);

    useEffect(() => {
        setTemperature(seasonTemperatures.spring);
        onTemperatureChange(seasonTemperatures.spring);
    }, []);

    const handleSeasonChange = (season: Season) => {
        setCurrentSeason(season);

        setTemperature(seasonTemperatures[season]);
        onTemperatureChange(seasonTemperatures[season]);

        if (onSeasonChange) {
            onSeasonChange(season);
        }

        toast(`Changed to ${season} season`, {
            description: `Base temperature: ${seasonTemperatures[season]}°C`,
        });
    };

    const reactionInfo = {
        factories: {
            reaction: "CFCs + UV Light → Cl + CFCs fragments",
            effect: "Cl + O₃ → ClO + O₂",
            description:
                "Factories release CFCs which break down in the atmosphere, releasing chlorine radicals that destroy ozone.",
        },
        cars: {
            reaction: "Fossil Fuels + O₂ → CO₂ + NO₂ + Heat",
            effect: "NO₂ + O → NO + O₂",
            description:
                "Cars produce nitrogen oxides that catalytically destroy ozone and release carbon dioxide that traps heat.",
        },
        planes: {
            reaction: "Jet Fuel + High Altitude O₂ → NO₂ + CO₂ + H₂O",
            effect: "NO + O₃ → NO₂ + O₂",
            description:
                "High-altitude emissions directly impact the stratosphere, where nitrogen oxides rapidly deplete ozone.",
        },
        trees: {
            reaction: "CO₂ + H₂O + Sunlight → O₂ + Glucose",
            effect: "CO₂ absorption reduces greenhouse effect",
            description:
                "Trees absorb carbon dioxide, reducing the greenhouse effect and cooling the atmosphere.",
        },
        reduce: {
            reaction: "Reduced CFCs → Less Cl in stratosphere",
            effect: "Natural O₃ formation outpaces destruction",
            description:
                "Reducing emissions allows the natural ozone formation process to overcome depletion.",
        },
    };

    const handleAction = (action: string) => {
        let newOzone = ozone;
        let newTemp = temperature;

        setShowReaction(action);

        switch (action) {
            case "factories":
                newOzone = Math.max(0, ozone - 2);
                newTemp = Math.min(50, temperature + 3);
                toast("Added factories", {
                    description: "Ozone -2, Temperature +3°C",
                    icon: <Factory className="h-5 w-5 text-red-500" />,
                });
                break;
            case "cars":
                newOzone = Math.max(0, ozone - 1);
                newTemp = Math.min(50, temperature + 1);
                toast("Added cars", {
                    description: "Ozone -1, Temperature +1°C",
                    icon: <Car className="h-5 w-5 text-orange-500" />,
                });
                break;
            case "planes":
                newOzone = Math.max(0, ozone - 3);
                newTemp = Math.min(50, temperature + 4);
                toast("Added planes", {
                    description: "Ozone -3, Temperature +4°C",
                    icon: <Plane className="h-5 w-5 text-red-600" />,
                });
                break;
            case "trees":
                newOzone = Math.min(10, ozone + 2);

                if (temperature > seasonTemperatures[currentSeason]) {
                    newTemp = Math.max(
                        seasonTemperatures[currentSeason],
                        temperature - 2
                    );
                } else {
                    newTemp = temperature;
                }

                toast("Planted trees", {
                    description:
                        newTemp < temperature
                            ? `Ozone +2, Temperature -2°C`
                            : `Ozone +2, Temperature unchanged`,
                    icon: <TreePine className="h-5 w-5 text-green-500" />,
                });
                break;
            case "reduce":
                newOzone = Math.min(10, ozone + 1);

                if (temperature > seasonTemperatures[currentSeason]) {
                    newTemp = Math.max(
                        seasonTemperatures[currentSeason],
                        temperature - 1
                    );
                } else {
                    newTemp = temperature;
                }

                toast("Reduced emissions", {
                    description:
                        newTemp < temperature
                            ? `Ozone +1, Temperature -1°C`
                            : `Ozone +1, Temperature unchanged`,
                    icon: <Leaf className="h-5 w-5 text-green-400" />,
                });
                break;
        }

        setOzone(newOzone);
        setTemperature(newTemp);
        onOzoneChange(newOzone);
        onTemperatureChange(newTemp);

        if (newOzone <= 0) {
            toast("Critical Warning", {
                description:
                    "The ozone layer has been completely destroyed! Extreme UV radiation is hitting Earth!",
                icon: <AlertCircle className="h-5 w-5 text-red-500" />,
                duration: 5000,
            });
        }

        if (newTemp >= 50) {
            toast("Critical Warning", {
                description:
                    "The Earth's temperature is too high! Climate disaster is happening!",
                icon: <AlertCircle className="h-5 w-5 text-red-500" />,
                duration: 5000,
            });
        }
    };

    const getSeasonButtonClass = (season: Season) => {
        const baseClass =
            "flex-1 py-2 rounded-md flex flex-col items-center justify-center gap-1 border transition-all";

        if (season === currentSeason) {
            switch (season) {
                case "spring":
                    return `${baseClass} bg-green-500/20 border-green-500 text-green-500`;
                case "summer":
                    return `${baseClass} bg-yellow-500/20 border-yellow-500 text-yellow-500`;
                case "autumn":
                    return `${baseClass} bg-orange-500/20 border-orange-500 text-orange-500`;
                case "winter":
                    return `${baseClass} bg-blue-400/20 border-blue-400 text-blue-400`;
            }
        }

        return `${baseClass} border-white/10 bg-white/5 text-white/70 hover:bg-white/10`;
    };

    return (
        <div className="space-y-8 w-full max-w-lg mx-auto bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg">
            <div className="space-y-2">
                <h3 className="text-lg font-medium mb-3">Season</h3>
                <div className="flex gap-2">
                    <button
                        className={getSeasonButtonClass("spring")}
                        onClick={() => handleSeasonChange("spring")}
                    >
                        <Flower className="h-5 w-5" />
                        <span className="text-xs">Spring</span>
                    </button>
                    <button
                        className={getSeasonButtonClass("summer")}
                        onClick={() => handleSeasonChange("summer")}
                    >
                        <Sun className="h-5 w-5" />
                        <span className="text-xs">Summer</span>
                    </button>
                    <button
                        className={getSeasonButtonClass("autumn")}
                        onClick={() => handleSeasonChange("autumn")}
                    >
                        <AutumnLeaf className="h-5 w-5" />
                        <span className="text-xs">Autumn</span>
                    </button>
                    <button
                        className={getSeasonButtonClass("winter")}
                        onClick={() => handleSeasonChange("winter")}
                    >
                        <Snowflake className="h-5 w-5" />
                        <span className="text-xs">Winter</span>
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Ozone Level</h3>
                    <span className="text-sm font-medium bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full">
                        {ozone}/10
                    </span>
                </div>
                <Slider
                    value={[ozone]}
                    min={0}
                    max={10}
                    step={1}
                    className="py-4"
                    onValueChange={(values) => {
                        setOzone(values[0]);
                        onOzoneChange(values[0]);
                    }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Depleted</span>
                    <span>Healthy</span>
                </div>
            </div>

            {showReaction && (
                <div className="bg-black/30 rounded-lg p-4 border border-white/10 animate-fade-in">
                    <div className="flex items-center gap-2 mb-2">
                        <Beaker className="h-4 w-4 text-blue-400" />
                        <h3 className="text-sm font-medium text-blue-400">
                            Chemical Reaction
                        </h3>
                    </div>
                    <div className="space-y-2 text-xs">
                        <div className="bg-white/5 p-2 rounded border border-white/5">
                            {
                                reactionInfo[
                                    showReaction as keyof typeof reactionInfo
                                ]?.reaction
                            }
                        </div>
                        <div className="flex justify-center">
                            <ArrowRight className="h-4 w-4 text-white/40" />
                        </div>
                        <div className="bg-white/5 p-2 rounded border border-white/5">
                            {
                                reactionInfo[
                                    showReaction as keyof typeof reactionInfo
                                ]?.effect
                            }
                        </div>
                        <p className="mt-2 text-white/60 text-xs italic">
                            {
                                reactionInfo[
                                    showReaction as keyof typeof reactionInfo
                                ]?.description
                            }
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-3">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        Harmful Actions
                    </h3>
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full justify-start border-red-500/20 hover:bg-red-500/10 hover:text-red-500 transition-all"
                            onClick={() => handleAction("factories")}
                        >
                            <Factory className="mr-2 h-4 w-4" />
                            Add Factories
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full justify-start border-orange-500/20 hover:bg-orange-500/10 hover:text-orange-500 transition-all"
                            onClick={() => handleAction("cars")}
                        >
                            <Car className="mr-2 h-4 w-4" />
                            Add Cars
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full justify-start border-red-600/20 hover:bg-red-600/10 hover:text-red-600 transition-all"
                            onClick={() => handleAction("planes")}
                        >
                            <Plane className="mr-2 h-4 w-4" />
                            Add Planes
                        </Button>
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        Beneficial Actions
                    </h3>
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full justify-start border-green-500/20 hover:bg-green-500/10 hover:text-green-500 transition-all"
                            onClick={() => handleAction("trees")}
                        >
                            <TreePine className="mr-2 h-4 w-4" />
                            Plant Trees
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full justify-start border-green-400/20 hover:bg-green-400/10 hover:text-green-400 transition-all"
                            onClick={() => handleAction("reduce")}
                        >
                            <Leaf className="mr-2 h-4 w-4" />
                            Reduce Emissions
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimulationControls;

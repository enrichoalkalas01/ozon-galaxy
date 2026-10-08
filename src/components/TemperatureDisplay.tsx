"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Thermometer } from "lucide-react";

interface TemperatureDisplayProps {
    temperature: number;
    className?: string;
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({
    temperature,
    className,
}) => {
    // Determine temperature color based on value
    const getTemperatureColor = () => {
        if (temperature < 15) return "text-blue-400";
        if (temperature < 20) return "text-green-400";
        if (temperature < 30) return "text-yellow-400";
        return "text-red-400";
    };

    // Determine fill height based on temperature (0-50°C range)
    const fillPercentage = Math.min(100, Math.max(0, (temperature / 50) * 100));

    // Determine fill color based on temperature
    const getFillColor = () => {
        if (temperature < 15) return "bg-blue-500";
        if (temperature < 20) return "bg-green-500";
        if (temperature < 30) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className={cn("flex items-center", className)}>
            <div className="relative h-20 w-5 bg-white/10 rounded-full overflow-hidden border border-white/20 mr-3">
                <div
                    className={`absolute bottom-0 w-full transition-all duration-1000 ${getFillColor()}`}
                    style={{ height: `${fillPercentage}%` }}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-0.5 pointer-events-none">
                    <span className="block w-full h-px bg-white/30"></span>
                    <span className="block w-full h-px bg-white/30"></span>
                    <span className="block w-full h-px bg-white/30"></span>
                    <span className="block w-full h-px bg-white/30"></span>
                </div>

                {/* Thermometer bulb */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border border-white/20 bg-gradient-to-br from-white/5 to-white/10"></div>
            </div>

            <div>
                <div className="flex items-center text-xs text-white/70">
                    <Thermometer className="w-3 h-3 mr-1" />
                    <span>Temperature</span>
                </div>
                <div className={`text-xl font-bold ${getTemperatureColor()}`}>
                    {temperature}°C
                </div>
                <div className="text-xs text-white/50">
                    {temperature < 15
                        ? "Cold"
                        : temperature < 20
                        ? "Mild"
                        : temperature < 30
                        ? "Warm"
                        : "Hot"}
                </div>
            </div>
        </div>
    );
};

export default TemperatureDisplay;

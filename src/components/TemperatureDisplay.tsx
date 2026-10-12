"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Thermometer } from "lucide-react";
import { TEMP_MAX, TEMP_MIN } from "./simulation-model";

interface TemperatureDisplayProps {
    temperature: number;
    className?: string;
}

const BANDS = [
    { max: 15, label: "Cold", text: "text-ozone-300", fill: "bg-ozone-500" },
    { max: 20, label: "Mild", text: "text-safe-300", fill: "bg-safe-500" },
    { max: 30, label: "Warm", text: "text-warn-300", fill: "bg-warn-500" },
    { max: Infinity, label: "Hot", text: "text-danger-300", fill: "bg-danger-500" },
] as const;

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({
    temperature,
    className,
}) => {
    const band = BANDS.find((entry) => temperature < entry.max) ?? BANDS[3];

    const fillPercentage = Math.min(
        100,
        Math.max(
            0,
            ((temperature - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * 100
        )
    );

    return (
        <div className={cn("flex items-center gap-3", className)}>
            {/* Thermometer tube */}
            <div
                className="relative h-20 w-4 overflow-hidden rounded-full border border-white/15 bg-white/[0.06]"
                role="meter"
                aria-valuenow={temperature}
                aria-valuemin={TEMP_MIN}
                aria-valuemax={TEMP_MAX}
                aria-label="Surface temperature"
            >
                <div
                    className={cn(
                        "absolute bottom-0 w-full rounded-full transition-all duration-700 ease-out",
                        band.fill
                    )}
                    style={{ height: `${fillPercentage}%` }}
                />
                {/* Graduations */}
                <div
                    className="pointer-events-none absolute inset-0 flex flex-col justify-evenly px-[3px]"
                    aria-hidden="true"
                >
                    {Array.from({ length: 4 }).map((_, index) => (
                        <span
                            key={index}
                            className="block h-px w-full bg-white/25"
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-0.5">
                <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-white/45">
                    <Thermometer className="size-3.5" aria-hidden="true" />
                    Temperature
                </p>
                <p
                    className={cn(
                        "font-display text-2xl font-semibold tabular-nums",
                        band.text
                    )}
                >
                    {temperature}
                    <span className="text-base font-medium opacity-70">°C</span>
                </p>
                <p className="text-xs text-white/45">{band.label}</p>
            </div>
        </div>
    );
};

export default TemperatureDisplay;

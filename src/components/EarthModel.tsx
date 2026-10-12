"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface EarthModelProps {
    className?: string;
    /** 0–10 scale. */
    ozoneLevel?: number;
    rotating?: boolean;
    /** Degrees Celsius. */
    temperature?: number;
}

/** Continent plates, positioned as percentages of the globe. */
const CONTINENTS = [
    { name: "north-america", x: 20, y: 26, w: 34, h: 26, rotate: -14, radius: "48% 42% 36% 54%" },
    { name: "south-america", x: 31, y: 65, w: 18, h: 30, rotate: 14, radius: "52% 48% 30% 60%" },
    { name: "africa-europe", x: 53, y: 46, w: 20, h: 52, rotate: -4, radius: "46% 54% 42% 38%" },
    { name: "asia", x: 72, y: 28, w: 38, h: 28, rotate: 8, radius: "54% 40% 50% 44%" },
    { name: "australia", x: 80, y: 72, w: 18, h: 14, rotate: -8, radius: "50%" },
];

const EarthModel: React.FC<EarthModelProps> = ({
    className,
    ozoneLevel = 10,
    rotating = true,
    temperature = 16,
}) => {
    const level = Math.max(0, Math.min(10, ozoneLevel));
    const ozoneOpacity = level / 10;

    // Drought appears under sustained heat or a collapsed shield.
    const isDrought = temperature >= 30 || level <= 3;

    const shellTone =
        level > 7
            ? { ring: "rgba(56,189,248,0.55)", glow: "rgba(56,189,248,0.35)" }
            : level > 3
            ? { ring: "rgba(251,191,36,0.55)", glow: "rgba(251,191,36,0.3)" }
            : { ring: "rgba(244,63,94,0.6)", glow: "rgba(244,63,94,0.32)" };

    const landColor = isDrought
        ? "linear-gradient(145deg, #b45309, #92400e)"
        : "linear-gradient(145deg, #15803d, #14532d)";

    const uvIntensity = 1 - ozoneOpacity;

    return (
        <div
            className={cn(
                "relative grid aspect-square w-full max-w-[18rem] place-items-center",
                className
            )}
        >
            {/* Outer atmospheric bloom — stays still while the globe spins */}
            <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full blur-2xl transition-all duration-1000"
                style={{
                    background: `radial-gradient(circle, ${shellTone.glow}, transparent 62%)`,
                    opacity: 0.45 + ozoneOpacity * 0.45,
                }}
            />

            {/* UV radiation breaking through a depleted shield */}
            {level < 5 && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 grid place-items-center"
                >
                    {Array.from({ length: 16 }).map((_, index) => (
                        // The rotation lives on the wrapper: `animate-ray`
                        // animates `transform`, which would otherwise override
                        // an inline rotate on the same element.
                        <span
                            key={index}
                            className="absolute flex h-full w-full items-center justify-center"
                            style={{
                                transform: `rotate(${index * (360 / 16)}deg)`,
                            }}
                        >
                            <span
                                className="animate-ray rounded-full bg-gradient-to-t from-transparent via-warn-300 to-transparent"
                                style={{
                                    width: "2px",
                                    height: "118%",
                                    opacity: uvIntensity * 0.75,
                                    animationDelay: `${index * 0.12}s`,
                                    filter: "drop-shadow(0 0 6px rgba(252,211,77,0.8))",
                                }}
                            />
                        </span>
                    ))}
                </div>
            )}

            {/* Ozone shell */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[6%] rounded-full transition-all duration-1000"
                style={{
                    border: `2px dashed ${shellTone.ring}`,
                    opacity: 0.25 + ozoneOpacity * 0.75,
                    boxShadow: `inset 0 0 36px -6px ${shellTone.glow}`,
                }}
            />

            {/* Globe */}
            <div
                className={cn(
                    "relative aspect-square w-[72%] overflow-hidden rounded-full",
                    rotating && "animate-spin-slow"
                )}
                style={{
                    background:
                        "radial-gradient(circle at 32% 28%, #60a5fa 0%, #2563eb 42%, #1e3a8a 78%, #0f1f4d 100%)",
                    boxShadow:
                        "inset -14px -10px 28px rgba(0,0,0,0.55), 0 0 44px -10px rgba(59,130,246,0.5)",
                }}
                role="img"
                aria-label={`Earth with a ${
                    level > 7 ? "healthy" : level > 3 ? "damaged" : "critical"
                } ozone layer at ${temperature} degrees Celsius`}
            >
                {/* Landmasses — transform lives only in the inline style */}
                {CONTINENTS.map((continent) => (
                    <span
                        key={continent.name}
                        className="absolute transition-all duration-1000"
                        style={{
                            left: `${continent.x}%`,
                            top: `${continent.y}%`,
                            width: `${continent.w}%`,
                            height: `${continent.h}%`,
                            borderRadius: continent.radius,
                            background: landColor,
                            transform: `translate(-50%, -50%) rotate(${continent.rotate}deg) scale(${isDrought ? 1.12 : 1})`,
                            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.35)",
                            opacity: 0.92,
                        }}
                    />
                ))}

                {/* Polar caps */}
                <span
                    className="absolute inset-x-[26%] top-[-7%] h-[14%] rounded-full bg-white blur-[4px] transition-opacity duration-1000"
                    style={{ opacity: isDrought ? 0.18 : 0.45 }}
                />
                <span
                    className="absolute inset-x-[22%] bottom-[-8%] h-[16%] rounded-full bg-white blur-[4px] transition-opacity duration-1000"
                    style={{ opacity: isDrought ? 0.2 : 0.55 }}
                />

                {/* Cloud wisps — kept faint so they read as haze, not streaks */}
                <span className="absolute left-[14%] top-[20%] h-[6%] w-[34%] rounded-full bg-white/25 blur-[6px]" />
                <span className="absolute right-[12%] top-[56%] h-[5%] w-[28%] rounded-full bg-white/20 blur-[6px]" />
                <span className="absolute left-[30%] top-[78%] h-[4%] w-[24%] rounded-full bg-white/15 blur-[6px]" />

                {/* Terminator + specular highlight */}
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_26%,rgba(255,255,255,0.35),transparent_45%)]" />
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(115deg,transparent_45%,rgba(2,6,23,0.55)_100%)]" />
            </div>
        </div>
    );
};

export default EarthModel;

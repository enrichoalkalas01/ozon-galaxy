"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface EarthModelProps {
    className?: string;
    ozoneLevel?: number; // 0-10 scale
    rotating?: boolean;
    temperature?: number; // Added temperature prop
}

const EarthModel: React.FC<EarthModelProps> = ({
    className,
    ozoneLevel = 10,
    rotating = true,
    temperature = 16, // Default temperature
}) => {
    const earthRef = useRef<HTMLDivElement>(null);
    const ozoneLayerRef = useRef<HTMLDivElement>(null);

    // Normalize ozone level to 0-1 scale for opacity
    const ozoneOpacity = Math.max(0, Math.min(1, ozoneLevel / 10));

    // Determine if earth is in drought conditions (high temp or critical ozone)
    const isDrought = temperature >= 30 || ozoneLevel <= 3;

    // Land color based on drought conditions
    const landColor = isDrought ? "bg-amber-800" : "bg-green-700";
    const landSize = isDrought ? 1.15 : 1; // Expand land size by 15% during drought

    useEffect(() => {
        const ozoneLayer = ozoneLayerRef.current;
        if (!ozoneLayer) return;

        // Update the ozone layer visualization based on ozone level
        ozoneLayer.style.opacity = `${ozoneOpacity}`;
    }, [ozoneOpacity]);

    return (
        <div
            className={cn(
                "relative w-full flex items-center justify-center",
                rotating ? "animate-spin-slow" : "",
                className
            )}
        >
            {/* Earth sphere */}
            <div
                ref={earthRef}
                className="w-48 h-48 rounded-full bg-gradient-radial from-blue-500 via-blue-600 to-blue-900 overflow-hidden relative shadow-[0_0_40px_rgba(59,130,246,0.4)]"
            >
                {/* Ocean texture */}
                <div className="absolute inset-0 bg-blue-500 opacity-30">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_70%)]"></div>
                </div>

                {/* Land masses - more realistic continent shapes */}
                <div className="absolute inset-0">
                    {/* North America */}
                    <div
                        className={`absolute w-20 h-16 ${landColor} rounded-lg skew-x-12 -skew-y-6 top-[25%] left-[15%] transform -translate-x-1/2 -translate-y-1/2 shadow-inner transition-all duration-1000`}
                        style={{
                            transform: `translateX(-50%) translateY(-50%) scale(${landSize})`,
                        }}
                    ></div>

                    {/* South America */}
                    <div
                        className={`absolute w-10 h-14 ${landColor} rounded-lg rotate-12 top-[60%] left-[28%] transition-all duration-1000`}
                        style={{
                            transform: `rotate(12deg) scale(${landSize})`,
                        }}
                    ></div>

                    {/* Europe & Africa */}
                    <div
                        className={`absolute w-10 h-28 ${landColor} rounded-lg top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000`}
                        style={{
                            transform: `translateX(-50%) translateY(-50%) scale(${landSize})`,
                        }}
                    ></div>

                    {/* Asia */}
                    <div
                        className={`absolute w-24 h-16 ${landColor} rounded-lg top-[30%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000`}
                        style={{
                            transform: `translateX(-50%) translateY(-50%) scale(${landSize})`,
                        }}
                    ></div>

                    {/* Australia */}
                    <div
                        className={`absolute w-10 h-8 ${landColor} rounded-lg top-[70%] left-[75%] transition-all duration-1000`}
                        style={{ transform: `scale(${landSize})` }}
                    ></div>

                    {/* Antarctica */}
                    <div
                        className={`absolute w-14 h-6 ${
                            isDrought ? "bg-amber-900/80" : "bg-green-800/80"
                        } rounded-full bottom-[10%] left-[50%] transform -translate-x-1/2 transition-all duration-1000`}
                        style={{
                            transform: `translateX(-50%) scale(${landSize})`,
                        }}
                    ></div>
                </div>

                {/* Cloud cover - partial wisps */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute w-28 h-8 bg-white/80 rounded-full blur-sm top-[15%] left-[20%] transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute w-20 h-6 bg-white/80 rounded-full blur-sm top-[70%] right-[30%]"></div>
                    <div className="absolute w-24 h-7 bg-white/80 rounded-full blur-sm top-[40%] right-[5%]"></div>
                </div>

                {/* Subtle atmosphere glow */}
                <div className="absolute inset-[-2px] rounded-full bg-gradient-radial from-blue-400/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Ozone layer - changed to circular */}
            <div
                ref={ozoneLayerRef}
                className="absolute w-64 h-64 rounded-full border-4 border-dashed border-blue-400/30 pointer-events-none transition-opacity duration-1000"
                style={{ opacity: ozoneOpacity }}
            ></div>

            {/* UV rays visualization when ozone is depleted - centered on earth */}
            {ozoneLevel < 5 && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div
                            key={index}
                            className="absolute w-1 bg-yellow-300 animate-pulse"
                            style={{
                                height: "60px",
                                transformOrigin: "center",
                                transform: `rotate(${index * 30}deg)`,
                                opacity: 1 - ozoneOpacity,
                                boxShadow: "0 0 8px rgba(250, 204, 21, 0.8)",
                            }}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EarthModel;

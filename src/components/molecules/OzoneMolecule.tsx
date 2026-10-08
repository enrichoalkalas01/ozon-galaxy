"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface OzoneMoleculeProps {
    className?: string;
    status?: "healthy" | "damaged" | "critical";
    showLabels?: boolean;
}

const OzoneMolecule: React.FC<OzoneMoleculeProps> = ({
    className,
    status = "healthy",
    showLabels = true,
}) => {
    // Determine colors based on status
    const atomColor =
        status === "healthy"
            ? "bg-blue-500 shadow-blue-400"
            : status === "damaged"
            ? "bg-yellow-500 shadow-yellow-400"
            : "bg-red-500 shadow-red-400";

    const bondColor =
        status === "healthy"
            ? "bg-blue-300"
            : status === "damaged"
            ? "bg-yellow-300"
            : "bg-red-300";

    const textColor =
        status === "healthy"
            ? "text-blue-500"
            : status === "damaged"
            ? "text-yellow-500"
            : "text-red-500";

    const pulseAnimation = status === "critical" ? "animate-pulse" : "";

    return (
        <div className={cn("relative w-24 h-20", className)}>
            {/* O3 molecule with actual structure - angle bonds */}
            <div className="flex flex-col items-center justify-center h-full">
                {/* Top oxygen atom */}
                <div
                    className={`w-5 h-5 rounded-full ${atomColor} ${pulseAnimation} shadow-sm z-10 flex items-center justify-center`}
                >
                    <span className="text-xs text-white font-bold">O</span>
                </div>

                {/* Bonds connecting to center atom */}
                <div className="relative h-6 w-5">
                    <div
                        className={`absolute left-1/2 top-0 h-6 w-0.5 ${bondColor} transform -translate-x-1/2`}
                    ></div>
                </div>

                {/* Center oxygen atom */}
                <div
                    className={`w-5 h-5 rounded-full ${atomColor} ${pulseAnimation} shadow-sm z-10 flex items-center justify-center`}
                >
                    <span className="text-xs text-white font-bold">O</span>
                </div>

                {/* Bonds connecting to bottom atom */}
                <div className="relative h-6 w-5">
                    <div
                        className={`absolute left-1/2 top-0 h-6 w-0.5 ${bondColor} transform -translate-x-1/2`}
                    ></div>
                </div>

                {/* Bottom oxygen atom */}
                <div
                    className={`w-5 h-5 rounded-full ${atomColor} ${pulseAnimation} shadow-sm z-10 flex items-center justify-center`}
                >
                    <span className="text-xs text-white font-bold">O</span>
                </div>

                {/* Label */}
                {showLabels && (
                    <div
                        className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium ${textColor}`}
                    >
                        O₃
                    </div>
                )}
            </div>
        </div>
    );
};

export default OzoneMolecule;

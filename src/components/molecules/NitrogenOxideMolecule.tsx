"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface NitrogenOxideMoleculeProps {
    className?: string;
    showLabels?: boolean;
}

const NitrogenOxideMolecule: React.FC<NitrogenOxideMoleculeProps> = ({
    className,
    showLabels = true,
}) => {
    return (
        <div className={cn("relative w-36 h-36", className)}>
            <div className="flex items-center justify-center h-full">
                {/* Nitrogen atom at center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-purple-700 shadow-sm shadow-purple-500 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">N</span>
                </div>

                {/* Oxygen atoms on the tips of the V */}
                <div className="absolute top-[15px] left-[15px] w-12 h-12 rounded-full bg-purple-500 shadow-sm shadow-purple-400 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">O</span>
                </div>
                <div className="absolute top-[15px] right-[15px] w-12 h-12 rounded-full bg-purple-500 shadow-sm shadow-purple-400 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">O</span>
                </div>

                {/* Single bond on left side */}
                <div className="absolute top-[40px] left-[32px] h-1 w-[20px] bg-purple-400 transform rotate-[-45deg]"></div>

                {/* Double bond on right side */}
                <div className="absolute top-[38px] right-[32px] h-1 w-[20px] bg-purple-400 transform rotate-[45deg]"></div>
                <div className="absolute top-[42px] right-[32px] h-1 w-[20px] bg-purple-400 transform rotate-[45deg]"></div>

                {/* Label */}
                {showLabels && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-purple-600">
                        NO₂
                    </div>
                )}
            </div>
        </div>
    );
};

export default NitrogenOxideMolecule;

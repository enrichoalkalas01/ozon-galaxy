"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface CfcMoleculeProps {
    className?: string;
    showLabels?: boolean;
}

const CfcMolecule: React.FC<CfcMoleculeProps> = ({
    className,
    showLabels = true,
}) => {
    return (
        <div className={cn("relative w-36 h-36", className)}>
            <div className="flex items-center justify-center h-full">
                {/* Carbon atom at center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-700 shadow-sm shadow-slate-500 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">C</span>
                </div>

                {/* Chlorine atoms (green) at top and right */}
                <div className="absolute top-[15px] left-[15px] w-12 h-12 rounded-full bg-green-500 shadow-sm shadow-green-400 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">Cl</span>
                </div>
                <div className="absolute top-[15px] right-[15px] w-12 h-12 rounded-full bg-green-500 shadow-sm shadow-green-400 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">Cl</span>
                </div>

                {/* Fluorine atoms (light blue) at bottom left and right */}
                <div className="absolute bottom-[15px] left-[15px] w-12 h-12 rounded-full bg-cyan-400 shadow-sm shadow-cyan-300 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">F</span>
                </div>
                <div className="absolute bottom-[15px] right-[15px] w-12 h-12 rounded-full bg-cyan-400 shadow-sm shadow-cyan-300 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">F</span>
                </div>

                {/* Bonds connecting atoms */}
                <div className="absolute top-[40px] left-[32px] h-1 w-[20px] bg-slate-400 transform rotate-[-45deg]"></div>
                <div className="absolute top-[40px] right-[32px] h-1 w-[20px] bg-slate-400 transform rotate-[45deg]"></div>
                <div className="absolute bottom-[40px] left-[32px] h-1 w-[20px] bg-slate-400 transform rotate-[45deg]"></div>
                <div className="absolute bottom-[40px] right-[32px] h-1 w-[20px] bg-slate-400 transform rotate-[-45deg]"></div>

                {/* Label */}
                {showLabels && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-500">
                        CCl₂F₂
                    </div>
                )}
            </div>
        </div>
    );
};

export default CfcMolecule;

"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface HalonMoleculeProps {
    className?: string;
    showLabels?: boolean;
}

const HalonMolecule: React.FC<HalonMoleculeProps> = ({
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

                {/* Bromine atom (brown) at top */}
                <div className="absolute top-[15px] left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-orange-700 shadow-sm shadow-orange-600 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">Br</span>
                </div>

                {/* Fluorine atoms (light purple) positioned in a trigonal pattern */}
                <div className="absolute bottom-[15px] left-[15px] w-12 h-12 rounded-full bg-purple-400 shadow-sm shadow-purple-300 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">F</span>
                </div>
                <div className="absolute bottom-[15px] right-[15px] w-12 h-12 rounded-full bg-purple-400 shadow-sm shadow-purple-300 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">F</span>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[5px] w-12 h-12 rounded-full bg-purple-400 shadow-sm shadow-purple-300 z-10 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">F</span>
                </div>

                {/* Bonds connecting atoms */}
                <div className="absolute top-[40px] left-1/2 transform -translate-x-1/2 h-1 w-[20px] rotate-90 bg-slate-400"></div>
                <div className="absolute bottom-[40px] left-[32px] h-1 w-[20px] bg-slate-400 transform rotate-[45deg]"></div>
                <div className="absolute bottom-[40px] right-[32px] h-1 w-[20px] bg-slate-400 transform rotate-[-45deg]"></div>
                <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 h-1 w-[20px] rotate-90 bg-slate-400"></div>

                {/* Label */}
                {showLabels && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-orange-700">
                        CBrF₃
                    </div>
                )}
            </div>
        </div>
    );
};

export default HalonMolecule;

"use client";
import React from "react";
import { cn } from "@/lib/utils";
import OzoneMolecule from "./molecules/OzoneMolecule";
import CfcMolecule from "./molecules/CfcMolecule";
import HalonMolecule from "./molecules/HalonMolecule";
import NitrogenOxideMolecule from "./molecules/NitrogenOxideMolecule";

interface MoleculeAnimationProps {
    className?: string;
    type?: "ozone" | "cfc" | "halon" | "nox";
    status?: "healthy" | "damaged" | "critical";
    showLabels?: boolean;
}

const MoleculeAnimation: React.FC<MoleculeAnimationProps> = ({
    className,
    type = "ozone",
    status = "healthy",
    showLabels = true,
}) => {
    // Render the appropriate molecule based on type
    switch (type) {
        case "ozone":
            return (
                <OzoneMolecule
                    className={className}
                    status={status}
                    showLabels={showLabels}
                />
            );

        case "cfc":
            return (
                <CfcMolecule className={className} showLabels={showLabels} />
            );

        case "halon":
            return (
                <HalonMolecule className={className} showLabels={showLabels} />
            );

        case "nox":
            return (
                <NitrogenOxideMolecule
                    className={className}
                    showLabels={showLabels}
                />
            );

        default:
            // Default fallback
            return (
                <div className={cn("relative w-28 h-20", className)}>
                    <div className="flex items-center justify-center h-full text-white text-sm">
                        Molecule
                    </div>
                </div>
            );
    }
};

export default MoleculeAnimation;

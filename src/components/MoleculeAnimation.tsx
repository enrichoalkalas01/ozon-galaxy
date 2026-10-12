"use client";

import React from "react";
import OzoneMolecule from "./molecules/OzoneMolecule";
import CfcMolecule from "./molecules/CfcMolecule";
import HalonMolecule from "./molecules/HalonMolecule";
import NitrogenOxideMolecule from "./molecules/NitrogenOxideMolecule";

export type MoleculeType = "ozone" | "cfc" | "halon" | "nox";

interface MoleculeAnimationProps {
    className?: string;
    type?: MoleculeType;
    /** Only meaningful for `type="ozone"`. */
    status?: "healthy" | "damaged" | "critical";
    showLabels?: boolean;
}

const MoleculeAnimation: React.FC<MoleculeAnimationProps> = ({
    className,
    type = "ozone",
    status = "healthy",
    showLabels = true,
}) => {
    switch (type) {
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
        case "ozone":
        default:
            return (
                <OzoneMolecule
                    className={className}
                    status={status}
                    showLabels={showLabels}
                />
            );
    }
};

export default MoleculeAnimation;

"use client";

import React from "react";
import MoleculeDiagram, { type MoleculeSpec } from "./MoleculeDiagram";

interface OzoneMoleculeProps {
    className?: string;
    status?: "healthy" | "damaged" | "critical";
    showLabels?: boolean;
}

const STATUS_PALETTE = {
    healthy: { atom: "#0ea5e9", bond: "#7dd3fc", label: "#7dd3fc" },
    damaged: { atom: "#f59e0b", bond: "#fcd34d", label: "#fcd34d" },
    critical: { atom: "#f43f5e", bond: "#fda4af", label: "#fda4af" },
} as const;

/**
 * Ozone, drawn with its real bent geometry (~117° between the bonds) rather
 * than a straight chain.
 */
const OzoneMolecule: React.FC<OzoneMoleculeProps> = ({
    className,
    status = "healthy",
    showLabels = true,
}) => {
    const palette = STATUS_PALETTE[status];

    const spec: MoleculeSpec = {
        atoms: [
            { symbol: "O", x: 50, y: 32, r: 14, color: palette.atom },
            { symbol: "O", x: 22, y: 66, r: 14, color: palette.atom },
            { symbol: "O", x: 78, y: 66, r: 14, color: palette.atom },
        ],
        bonds: [
            { from: 0, to: 1 },
            { from: 0, to: 2, double: true },
        ],
        formula: "O₃",
        bondColor: palette.bond,
        labelColor: palette.label,
    };

    return (
        <MoleculeDiagram
            spec={spec}
            className={className}
            showLabels={showLabels}
            pulse={status === "critical"}
        />
    );
};

export default OzoneMolecule;

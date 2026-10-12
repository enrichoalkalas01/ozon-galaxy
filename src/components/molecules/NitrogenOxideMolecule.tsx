"use client";

import React from "react";
import MoleculeDiagram, { type MoleculeSpec } from "./MoleculeDiagram";

interface NitrogenOxideMoleculeProps {
    className?: string;
    showLabels?: boolean;
}

/** Nitrogen dioxide — bent, with the nitrogen at the apex. */
const SPEC: MoleculeSpec = {
    atoms: [
        { symbol: "N", x: 50, y: 34, r: 15, color: "#6366f1", reactive: true },
        { symbol: "O", x: 20, y: 68, r: 13, color: "#ef4444" },
        { symbol: "O", x: 80, y: 68, r: 13, color: "#ef4444" },
    ],
    bonds: [
        { from: 0, to: 1, double: true },
        { from: 0, to: 2 },
    ],
    formula: "NO₂",
    bondColor: "#a5b4fc",
    labelColor: "#a5b4fc",
};

const NitrogenOxideMolecule: React.FC<NitrogenOxideMoleculeProps> = ({
    className,
    showLabels = true,
}) => (
    <MoleculeDiagram
        spec={SPEC}
        className={className}
        showLabels={showLabels}
    />
);

export default NitrogenOxideMolecule;

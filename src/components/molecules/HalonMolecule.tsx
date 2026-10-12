"use client";

import React from "react";
import MoleculeDiagram, { type MoleculeSpec } from "./MoleculeDiagram";

interface HalonMoleculeProps {
    className?: string;
    showLabels?: boolean;
}

/** Halon-1301 (bromotrifluoromethane). The bromine is the ozone killer. */
const SPEC: MoleculeSpec = {
    atoms: [
        { symbol: "C", x: 50, y: 54, r: 15, color: "#475569" },
        { symbol: "Br", x: 50, y: 20, r: 15, color: "#f97316", reactive: true },
        { symbol: "F", x: 20, y: 74, r: 12, color: "#22d3ee" },
        { symbol: "F", x: 50, y: 86, r: 12, color: "#22d3ee" },
        { symbol: "F", x: 80, y: 74, r: 12, color: "#22d3ee" },
    ],
    bonds: [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 0, to: 3 },
        { from: 0, to: 4 },
    ],
    formula: "CBrF₃",
    bondColor: "#94a3b8",
    labelColor: "#fdba74",
};

const HalonMolecule: React.FC<HalonMoleculeProps> = ({
    className,
    showLabels = true,
}) => (
    <MoleculeDiagram
        spec={SPEC}
        className={className}
        showLabels={showLabels}
    />
);

export default HalonMolecule;

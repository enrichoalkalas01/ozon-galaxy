"use client";

import React from "react";
import MoleculeDiagram, { type MoleculeSpec } from "./MoleculeDiagram";

interface CfcMoleculeProps {
    className?: string;
    showLabels?: boolean;
}

/** CFC-12 (dichlorodifluoromethane), tetrahedral around the carbon. */
const SPEC: MoleculeSpec = {
    atoms: [
        { symbol: "C", x: 50, y: 50, r: 15, color: "#475569" },
        { symbol: "Cl", x: 21, y: 26, r: 14, color: "#22c55e", reactive: true },
        { symbol: "Cl", x: 79, y: 26, r: 14, color: "#22c55e", reactive: true },
        { symbol: "F", x: 23, y: 77, r: 12, color: "#22d3ee" },
        { symbol: "F", x: 77, y: 77, r: 12, color: "#22d3ee" },
    ],
    bonds: [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 0, to: 3 },
        { from: 0, to: 4 },
    ],
    formula: "CCl₂F₂",
    bondColor: "#94a3b8",
    labelColor: "#cbd5e1",
};

const CfcMolecule: React.FC<CfcMoleculeProps> = ({
    className,
    showLabels = true,
}) => (
    <MoleculeDiagram
        spec={SPEC}
        className={className}
        showLabels={showLabels}
    />
);

export default CfcMolecule;

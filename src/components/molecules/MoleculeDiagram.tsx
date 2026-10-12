import React from "react";
import { cn } from "@/lib/utils";

export interface Atom {
    /** Element symbol rendered inside the sphere. */
    symbol: string;
    /** Position in the 0–100 viewBox space. */
    x: number;
    y: number;
    /** Sphere radius in viewBox units. */
    r: number;
    color: string;
    /** Highlights the reactive atom (the one that attacks ozone). */
    reactive?: boolean;
}

export interface Bond {
    /** Indices into the atom list. */
    from: number;
    to: number;
    /** Draw as a double bond. */
    double?: boolean;
}

export interface MoleculeSpec {
    atoms: Atom[];
    bonds: Bond[];
    /** Chemical formula shown beneath the structure. */
    formula: string;
    bondColor: string;
    labelColor: string;
}

interface MoleculeDiagramProps {
    spec: MoleculeSpec;
    className?: string;
    showLabels?: boolean;
    /** Adds a slow idle drift, disabled for reduced motion via global CSS. */
    animate?: boolean;
    /** Pulses the whole structure — used for the critical ozone state. */
    pulse?: boolean;
}

/**
 * Renders a ball-and-stick molecule as SVG.
 *
 * Bonds are computed from the atom coordinates and clipped behind the spheres,
 * so geometry stays correct at any size — unlike absolutely positioned divs
 * with hardcoded pixel offsets.
 */
const MoleculeDiagram: React.FC<MoleculeDiagramProps> = ({
    spec,
    className,
    showLabels = true,
    animate = true,
    pulse = false,
}) => {
    const { atoms, bonds, formula, bondColor, labelColor } = spec;
    const gradientId = React.useId();

    return (
        <figure
            className={cn(
                "flex w-full max-w-[11rem] flex-col items-center gap-1.5",
                className
            )}
        >
            <svg
                viewBox="0 0 100 100"
                className={cn(
                    "w-full",
                    animate && "animate-float",
                    pulse && "animate-pulse"
                )}
                role="img"
                aria-label={`Structural diagram of ${formula}`}
            >
                <defs>
                    {atoms.map((atom, index) => (
                        <radialGradient
                            key={index}
                            id={`${gradientId}-atom-${index}`}
                            cx="35%"
                            cy="30%"
                            r="75%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#ffffff"
                                stopOpacity="0.75"
                            />
                            <stop
                                offset="45%"
                                stopColor={atom.color}
                                stopOpacity="1"
                            />
                            <stop
                                offset="100%"
                                stopColor="#020617"
                                stopOpacity="0.65"
                            />
                        </radialGradient>
                    ))}
                </defs>

                {/* Bonds first so the spheres overlap their ends */}
                <g
                    stroke={bondColor}
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                >
                    {bonds.map((bond, index) => {
                        const a = atoms[bond.from];
                        const b = atoms[bond.to];
                        if (!a || !b) return null;

                        if (!bond.double) {
                            return (
                                <line
                                    key={index}
                                    x1={a.x}
                                    y1={a.y}
                                    x2={b.x}
                                    y2={b.y}
                                    strokeWidth="3"
                                />
                            );
                        }

                        // Offset the pair perpendicular to the bond axis.
                        const dx = b.x - a.x;
                        const dy = b.y - a.y;
                        const length = Math.hypot(dx, dy) || 1;
                        const offsetX = (-dy / length) * 2.2;
                        const offsetY = (dx / length) * 2.2;

                        return (
                            <g key={index} strokeWidth="2.2">
                                <line
                                    x1={a.x + offsetX}
                                    y1={a.y + offsetY}
                                    x2={b.x + offsetX}
                                    y2={b.y + offsetY}
                                />
                                <line
                                    x1={a.x - offsetX}
                                    y1={a.y - offsetY}
                                    x2={b.x - offsetX}
                                    y2={b.y - offsetY}
                                />
                            </g>
                        );
                    })}
                </g>

                {/* Atoms */}
                {atoms.map((atom, index) => (
                    <g key={index}>
                        {atom.reactive && (
                            <circle
                                cx={atom.x}
                                cy={atom.y}
                                r={atom.r + 3}
                                fill="none"
                                stroke={atom.color}
                                strokeWidth="1.2"
                                strokeOpacity="0.5"
                                strokeDasharray="3 3"
                            />
                        )}
                        <circle
                            cx={atom.x}
                            cy={atom.y}
                            r={atom.r}
                            fill={`url(#${gradientId}-atom-${index})`}
                        />
                        <text
                            x={atom.x}
                            y={atom.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#ffffff"
                            fontSize={atom.r * 0.9}
                            fontWeight="700"
                            style={{ paintOrder: "stroke" }}
                        >
                            {atom.symbol}
                        </text>
                    </g>
                ))}
            </svg>

            {showLabels && (
                <figcaption
                    className="font-mono text-xs font-semibold tracking-wide"
                    style={{ color: labelColor }}
                >
                    {formula}
                </figcaption>
            )}
        </figure>
    );
};

export default MoleculeDiagram;

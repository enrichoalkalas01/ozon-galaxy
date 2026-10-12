"use client";

import React, { useEffect, useState } from "react";
import AnimatedStar from "./AnimatedStar";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
    starCount?: number;
    className?: string;
}

interface Star {
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
    opacity: number;
}

/** Deterministic PRNG so the field is stable across re-renders. */
const createRandom = (seed: number) => {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
};

const buildStars = (count: number): Star[] => {
    const random = createRandom(20240917);

    return Array.from({ length: count }, () => {
        const size = random() * 1.8 + 0.6;
        return {
            x: random() * 100,
            y: random() * 100,
            size,
            delay: random() * 6,
            duration: random() * 3 + 3,
            // Smaller stars sit further back.
            opacity: 0.35 + (size / 2.4) * 0.65,
        };
    });
};

/**
 * Fixed, non-interactive backdrop: nebulae, a twinkling star field and a faint
 * horizon glow. Stars are built in state (not a ref) so they actually render,
 * and positioned in percentages so they survive viewport resizes.
 */
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
    starCount = 160,
    className,
}) => {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        // Trim the field on small screens and for reduced-motion users.
        const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
        setStars(buildStars(isSmallScreen ? Math.round(starCount / 2) : starCount));
    }, [starCount]);

    return (
        <div
            aria-hidden="true"
            className={cn(
                "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
                className
            )}
        >
            {/* Nebula washes */}
            <div className="absolute -left-[15%] -top-[20%] size-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16),transparent_65%)] blur-3xl animate-aurora" />
            <div
                className="absolute -right-[12%] top-[25%] size-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.13),transparent_65%)] blur-3xl animate-aurora"
                style={{ animationDelay: "-6s" }}
            />
            <div
                className="absolute bottom-[-25%] left-[20%] size-[65vmax] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.14),transparent_65%)] blur-3xl animate-aurora"
                style={{ animationDelay: "-12s" }}
            />

            {/* Star field */}
            <div className="absolute inset-0">
                {stars.map((star, index) => (
                    <AnimatedStar
                        key={index}
                        x={star.x}
                        y={star.y}
                        size={star.size}
                        delay={star.delay}
                        duration={star.duration}
                        opacity={star.opacity}
                    />
                ))}
            </div>

            {/* Vignette keeps text legible over the brighter nebulae */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,13,0.75)_100%)]" />
        </div>
    );
};

export default AnimatedBackground;

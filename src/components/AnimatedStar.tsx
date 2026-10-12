import React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedStarProps {
    className?: string;
    /** Diameter in pixels. */
    size?: number;
    /** Horizontal position as a percentage of the container width. */
    x: number;
    /** Vertical position as a percentage of the container height. */
    y: number;
    /** Twinkle offset in seconds. */
    delay?: number;
    duration?: number;
    opacity?: number;
}

/**
 * A single twinkling star. Pure and memoised — the field renders hundreds of
 * these, so it keeps no refs and runs no effects.
 */
const AnimatedStar: React.FC<AnimatedStarProps> = ({
    className,
    size = 2,
    x,
    y,
    delay = 0,
    duration = 4,
    opacity = 1,
}) => {
    return (
        <span
            aria-hidden="true"
            className={cn(
                "absolute rounded-full bg-white animate-twinkle",
                className
            )}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                boxShadow: `0 0 ${size * 2.5}px rgba(186, 230, 253, 0.7)`,
            }}
        />
    );
};

export default React.memo(AnimatedStar);

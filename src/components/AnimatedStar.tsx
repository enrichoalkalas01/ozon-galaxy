"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedStarProps {
    className?: string;
    size?: number;
    x?: number;
    y?: number;
    delay?: number;
}

const AnimatedStar: React.FC<AnimatedStarProps> = ({
    className,
    size = 2,
    x,
    y,
    delay = 0,
}) => {
    const starRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const star = starRef.current;
        if (!star) return;

        if (x !== undefined && y !== undefined) {
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
        }

        // Random animation delay for twinkling effect
        star.style.animationDelay = `${delay}s`;
    }, [x, y, delay]);

    return (
        <div
            ref={starRef}
            className={cn(
                "absolute rounded-full bg-white animate-twinkle",
                className
            )}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`,
            }}
        />
    );
};

export default AnimatedStar;

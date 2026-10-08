"use client";
import { useEffect, useRef } from "react";
import AnimatedStar from "./AnimatedStar";

interface AnimatedBackgroundProps {
    starCount?: number;
    className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
    starCount = 150,
    className,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const starsRef = useRef<
        Array<{ x: number; y: number; size: number; delay: number }>
    >([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.offsetWidth;
        const height = container.offsetHeight;

        // Generate random stars
        starsRef.current = Array.from({ length: starCount }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 5,
        }));
    }, [starCount]);

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 z-[-1] space-bg ${className || ""}`}
        >
            {starsRef.current.map((star, index) => (
                <AnimatedStar
                    key={index}
                    x={star.x}
                    y={star.y}
                    size={star.size}
                    delay={star.delay}
                />
            ))}
        </div>
    );
};

export default AnimatedBackground;

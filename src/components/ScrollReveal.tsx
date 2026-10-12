"use client";

import { useEffect } from "react";

/**
 * Drives the `.reveal` scroll animation for the whole page.
 *
 * The hidden-state CSS is scoped under `.js-reveal`, which this component adds
 * on mount — so if JS never runs, content renders plainly visible instead of
 * being stuck at `opacity: 0`.
 */
const ScrollReveal: React.FC = () => {
    useEffect(() => {
        const root = document.documentElement;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            return;
        }

        root.classList.add("js-reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );

        const targets = Array.from(document.querySelectorAll(".reveal"));
        targets.forEach((target) => observer.observe(target));

        // Anything already in view on load (above the fold) reveals immediately
        // rather than waiting for a scroll event.
        const raf = requestAnimationFrame(() => {
            targets.forEach((target) => {
                const { top } = target.getBoundingClientRect();
                if (top < window.innerHeight) {
                    target.classList.add("is-visible");
                    observer.unobserve(target);
                }
            });
        });

        return () => {
            cancelAnimationFrame(raf);
            observer.disconnect();
            root.classList.remove("js-reveal");
        };
    }, []);

    return null;
};

export default ScrollReveal;

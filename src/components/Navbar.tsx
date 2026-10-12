"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Menu, X, Orbit } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "About", id: "about" },
    { label: "Simulation", id: "simulation" },
    { label: "Culprits", id: "culprits" },
    { label: "Consequences", id: "consequences" },
    { label: "Recovery", id: "recovery" },
] as const;

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("hero");

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Highlight whichever section currently owns the upper third of the viewport.
    useEffect(() => {
        const ids = ["hero", ...NAV_ITEMS.map((item) => item.id)];
        const sections = ids
            .map((id) => document.getElementById(id))
            .filter((element): element is HTMLElement => element !== null);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    )[0];

                if (visible) setActiveSection(visible.target.id);
            },
            { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.2, 0.5, 1] }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Lock body scroll while the mobile sheet is open.
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsMobileMenuOpen(false);
        };
        window.addEventListener("keydown", handleKeydown);

        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [isMobileMenuOpen]);

    const scrollToSection = useCallback((id: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (!element) return;
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                isScrolled
                    ? "border-b border-white/10 bg-space-900/80 py-2.5 backdrop-blur-xl"
                    : "border-b border-transparent py-4"
            )}
        >
            <div className="container-page flex items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={() => scrollToSection("hero")}
                    className="group flex items-center gap-2.5 rounded-lg px-1 py-1 text-left transition-opacity hover:opacity-85"
                >
                    <span className="grid size-8 place-items-center rounded-lg border border-ozone-400/30 bg-ozone-500/10">
                        <Orbit
                            className="size-4 text-ozone-300 transition-transform duration-500 group-hover:rotate-90"
                            aria-hidden="true"
                        />
                    </span>
                    <span className="font-display text-lg font-semibold tracking-tight">
                        <span className="text-gradient-ozone animate-gradient-text">
                            Ozone Lab
                        </span>
                    </span>
                </button>

                {/* Desktop navigation */}
                <nav
                    aria-label="Sections"
                    className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md md:flex"
                >
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => scrollToSection(item.id)}
                                aria-current={isActive ? "true" : undefined}
                                className={cn(
                                    "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-ozone-500/15 text-ozone-200"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <button
                    type="button"
                    className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/10 md:hidden"
                    onClick={() => setIsMobileMenuOpen((open) => !open)}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-nav"
                    aria-label={
                        isMobileMenuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                >
                    {isMobileMenuOpen ? (
                        <X className="size-5" aria-hidden="true" />
                    ) : (
                        <Menu className="size-5" aria-hidden="true" />
                    )}
                </button>
            </div>

            {/* Mobile navigation */}
            {isMobileMenuOpen && (
                <nav
                    id="mobile-nav"
                    aria-label="Sections"
                    className="absolute inset-x-0 top-full border-y border-white/10 bg-space-900/95 backdrop-blur-xl animate-slide-down md:hidden"
                >
                    <div className="container-page flex flex-col py-3">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => scrollToSection(item.id)}
                                    aria-current={isActive ? "true" : undefined}
                                    className={cn(
                                        "rounded-lg px-3 py-3 text-left text-base font-medium transition-colors",
                                        isActive
                                            ? "bg-ozone-500/15 text-ozone-200"
                                            : "text-white/70 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Navbar;

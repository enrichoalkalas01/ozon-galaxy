"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-black/70 backdrop-blur-md py-3 shadow-lg"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Button
                        variant="link"
                        className="font-display text-xl tracking-tight font-medium p-0 text-white hover:text-white/80"
                        onClick={() => scrollToSection("hero")}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 animate-gradient-text">
                            Ozone Lab
                        </span>
                    </Button>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {[
                        { label: "About", id: "about" },
                        { label: "Simulation", id: "simulation" },
                        { label: "Culprits", id: "culprits" },
                        { label: "Consequences", id: "consequences" },
                        { label: "Recovery", id: "recovery" },
                    ].map((item) => (
                        <Button
                            key={item.id}
                            variant="link"
                            className="text-sm text-white/80 hover:text-white"
                            onClick={() => scrollToSection(item.id)}
                        >
                            {item.label}
                        </Button>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 animate-slide-down">
                    <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        {[
                            { label: "About", id: "about" },
                            { label: "Simulation", id: "simulation" },
                            { label: "Culprits", id: "culprits" },
                            { label: "Consequences", id: "consequences" },
                            { label: "Recovery", id: "recovery" },
                        ].map((item) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                className="justify-start text-white/80 hover:text-white hover:bg-white/5"
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;

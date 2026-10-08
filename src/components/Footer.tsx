"use client";
import React from "react";
import { Github, Heart, Twitter } from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="py-12 bg-black border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-xl font-display font-semibold tracking-tight text-white">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                                Ozone Layer Lab
                            </span>
                        </h3>
                        <p className="text-sm text-white/60 mt-2">
                            An educational project about Earth's protective
                            shield
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
                        <div>
                            <h4 className="text-sm font-medium text-white mb-3">
                                Resources
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="https://www.nasa.gov/ozone"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-white/60 hover:text-white/80 transition-colors"
                                    >
                                        NASA Ozone Research
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.epa.gov/ozone-layer-protection"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-white/60 hover:text-white/80 transition-colors"
                                    >
                                        EPA Ozone Protection
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.unep.org/ozonaction/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-white/60 hover:text-white/80 transition-colors"
                                    >
                                        UNEP OzonAction
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-white mb-3">
                                Connect
                            </h4>
                            <div className="flex space-x-4">
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/60 hover:text-white/90 transition-colors"
                                    aria-label="GitHub"
                                >
                                    <Github className="h-5 w-5" />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/60 hover:text-white/90 transition-colors"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-xs text-white/50">
                        &copy; {new Date().getFullYear()} Ozone Layer Lab. All
                        rights reserved.
                    </p>
                    <p className="text-xs text-white/50 mt-2 sm:mt-0 flex items-center">
                        Made with
                        <Heart className="h-3 w-3 mx-1 text-red-500" />
                        for Earth
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

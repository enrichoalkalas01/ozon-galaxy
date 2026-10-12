import React from "react";
import { Github, Heart, Orbit, Twitter } from "lucide-react";

const RESOURCES = [
    {
        label: "NASA Ozone Watch",
        href: "https://ozonewatch.gsfc.nasa.gov/",
    },
    {
        label: "EPA Ozone Protection",
        href: "https://www.epa.gov/ozone-layer-protection",
    },
    {
        label: "UNEP OzonAction",
        href: "https://www.unep.org/ozonaction/",
    },
    {
        label: "WMO Ozone Assessment",
        href: "https://csl.noaa.gov/assessments/ozone/",
    },
];

const SOCIALS = [
    { label: "GitHub", href: "https://github.com", icon: Github },
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
];

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/[0.07] bg-space-900/50 py-12">
            <div className="container-page">
                <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                    {/* Brand */}
                    <div className="max-w-sm space-y-3">
                        <div className="flex items-center gap-2.5">
                            <span className="grid size-8 place-items-center rounded-lg border border-ozone-400/30 bg-ozone-500/10">
                                <Orbit
                                    className="size-4 text-ozone-300"
                                    aria-hidden="true"
                                />
                            </span>
                            <span className="font-display text-lg font-semibold tracking-tight text-gradient-ozone">
                                Ozone Lab
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-white/55">
                            An educational project about Earth&apos;s protective
                            shield — how it works, what damaged it, and how it
                            is recovering.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
                        <nav aria-labelledby="footer-resources">
                            <h2
                                id="footer-resources"
                                className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/45"
                            >
                                Resources
                            </h2>
                            <ul className="space-y-2.5">
                                {RESOURCES.map((item) => (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-white/65 transition-colors hover:text-ozone-200"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div>
                            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                                Connect
                            </h2>
                            <div className="flex gap-2.5">
                                {SOCIALS.map(({ label, href, icon: Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                                    >
                                        <Icon
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
                    <p className="text-xs text-white/40">
                        &copy; {new Date().getFullYear()} Ozone Lab. Educational
                        use — figures from NASA, NOAA and UNEP.
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-white/40">
                        Made with
                        <Heart
                            className="size-3 text-danger-400"
                            aria-hidden="true"
                        />
                        for Earth
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    eyebrow: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    align?: "center" | "left";
    tone?: "ozone" | "danger" | "warn" | "aurora";
    className?: string;
}

const toneStyles: Record<NonNullable<SectionHeadingProps["tone"]>, string> = {
    ozone: "text-ozone-300",
    aurora: "text-aurora-300",
    warn: "text-warn-400",
    danger: "text-danger-400",
};

const SectionHeading: React.FC<SectionHeadingProps> = ({
    eyebrow,
    title,
    description,
    align = "center",
    tone = "ozone",
    className,
}) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-4",
                align === "center"
                    ? "items-center text-center"
                    : "items-start text-left",
                className
            )}
        >
            <span className={cn("eyebrow", toneStyles[tone])}>
                <span
                    className="size-1.5 rounded-full bg-current"
                    aria-hidden="true"
                />
                {eyebrow}
            </span>

            <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                {title}
            </h2>

            {description ? (
                <p
                    className={cn(
                        "max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg",
                        align === "center" && "mx-auto"
                    )}
                >
                    {description}
                </p>
            ) : null}
        </div>
    );
};

export default SectionHeading;

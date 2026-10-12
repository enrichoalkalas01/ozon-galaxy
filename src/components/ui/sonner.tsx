"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Toast host. The app is dark-only, so the theme is fixed rather than read
 * from next-themes (no ThemeProvider is mounted).
 */
const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="dark"
            className="toaster group"
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast: "!rounded-xl !border-white/10 !bg-space-600/95 !text-foreground !backdrop-blur-xl !shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)]",
                    description: "!text-muted-foreground",
                    actionButton: "!bg-primary !text-primary-foreground",
                    cancelButton: "!bg-secondary !text-secondary-foreground",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };

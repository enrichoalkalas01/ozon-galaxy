"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    ArrowRight,
    Beaker,
    Car,
    Factory,
    Flower2,
    Leaf,
    Plane,
    RotateCcw,
    Snowflake,
    Sun,
    TreePine,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    ACTIONS,
    OZONE_MAX,
    OZONE_MIN,
    SEASONS,
    SEASON_TEMPERATURES,
    type ActionId,
    type Season,
} from "./simulation-model";

interface SimulationControlsProps {
    ozoneLevel: number;
    season: Season;
    lastAction: ActionId | null;
    isPristine: boolean;
    onOzoneChange: (value: number) => void;
    onSeasonChange: (season: Season) => void;
    onAction: (action: ActionId) => void;
    onReset: () => void;
}

const SEASON_META: Record<
    Season,
    { label: string; icon: LucideIcon; active: string }
> = {
    spring: {
        label: "Spring",
        icon: Flower2,
        active: "border-safe-400/60 bg-safe-500/15 text-safe-300",
    },
    summer: {
        label: "Summer",
        icon: Sun,
        active: "border-warn-400/60 bg-warn-500/15 text-warn-300",
    },
    autumn: {
        label: "Autumn",
        icon: Leaf,
        active: "border-orange-400/60 bg-orange-500/15 text-orange-300",
    },
    winter: {
        label: "Winter",
        icon: Snowflake,
        active: "border-ozone-400/60 bg-ozone-500/15 text-ozone-300",
    },
};

const ACTION_META: Record<ActionId, { icon: LucideIcon; accent: string }> = {
    factories: {
        icon: Factory,
        accent: "hover:border-danger-400/50 hover:bg-danger-500/10 hover:text-danger-300",
    },
    cars: {
        icon: Car,
        accent: "hover:border-orange-400/50 hover:bg-orange-500/10 hover:text-orange-300",
    },
    planes: {
        icon: Plane,
        accent: "hover:border-danger-400/50 hover:bg-danger-500/10 hover:text-danger-300",
    },
    trees: {
        icon: TreePine,
        accent: "hover:border-safe-400/50 hover:bg-safe-500/10 hover:text-safe-300",
    },
    reduce: {
        icon: Leaf,
        accent: "hover:border-aurora-400/50 hover:bg-aurora-500/10 hover:text-aurora-300",
    },
};

const formatDelta = (value: number, unit = "") =>
    `${value > 0 ? "+" : ""}${value}${unit}`;

const ActionButton: React.FC<{
    id: ActionId;
    onAction: (action: ActionId) => void;
}> = ({ id, onAction }) => {
    const action = ACTIONS[id];
    const { icon: Icon, accent } = ACTION_META[id];

    return (
        <Button
            variant="outline"
            onClick={() => onAction(id)}
            className={cn(
                "h-auto w-full justify-start gap-3 border-white/10 bg-white/[0.03] px-3 py-2.5 text-left text-white/85 transition-colors",
                accent
            )}
        >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            <span className="flex-1 text-sm font-medium">{action.label}</span>
            <span className="shrink-0 font-mono text-[0.7rem] text-white/45">
                O₃ {formatDelta(action.ozoneDelta)} · {formatDelta(action.tempDelta, "°")}
            </span>
        </Button>
    );
};

const SimulationControls: React.FC<SimulationControlsProps> = ({
    ozoneLevel,
    season,
    lastAction,
    isPristine,
    onOzoneChange,
    onSeasonChange,
    onAction,
    onReset,
}) => {
    const reaction = lastAction ? ACTIONS[lastAction] : null;

    return (
        <div className="glass-card flex flex-col gap-7 p-5 sm:p-6">
            {/* Season ------------------------------------------------------ */}
            <fieldset className="space-y-3">
                <legend className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
                    Season
                </legend>
                <div className="grid grid-cols-4 gap-2">
                    {SEASONS.map((item) => {
                        const { label, icon: Icon, active } = SEASON_META[item];
                        const isActive = item === season;

                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => onSeasonChange(item)}
                                aria-pressed={isActive}
                                className={cn(
                                    "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition-all",
                                    isActive
                                        ? active
                                        : "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.07] hover:text-white/80"
                                )}
                            >
                                <Icon className="size-5" aria-hidden="true" />
                                <span className="text-xs font-medium">
                                    {label}
                                </span>
                                <span className="font-mono text-[0.65rem] opacity-70">
                                    {SEASON_TEMPERATURES[item]}°
                                </span>
                            </button>
                        );
                    })}
                </div>
            </fieldset>

            {/* Ozone level ------------------------------------------------- */}
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <label
                        htmlFor="ozone-level"
                        className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50"
                    >
                        Ozone level
                    </label>
                    <span className="rounded-full border border-ozone-400/30 bg-ozone-500/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-ozone-200">
                        {ozoneLevel} / {OZONE_MAX}
                    </span>
                </div>

                <Slider
                    id="ozone-level"
                    value={[ozoneLevel]}
                    min={OZONE_MIN}
                    max={OZONE_MAX}
                    step={1}
                    aria-label="Ozone level"
                    className="py-2"
                    onValueChange={(values) => onOzoneChange(values[0])}
                />

                <div className="flex justify-between text-xs text-white/40">
                    <span>Depleted</span>
                    <span>Healthy</span>
                </div>
            </div>

            {/* Actions ----------------------------------------------------- */}
            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2.5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-danger-300/80">
                        Harmful
                    </h3>
                    <div className="space-y-2">
                        {(["factories", "cars", "planes"] as ActionId[]).map(
                            (id) => (
                                <ActionButton
                                    key={id}
                                    id={id}
                                    onAction={onAction}
                                />
                            )
                        )}
                    </div>
                </div>

                <div className="space-y-2.5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-safe-300/80">
                        Beneficial
                    </h3>
                    <div className="space-y-2">
                        {(["trees", "reduce"] as ActionId[]).map((id) => (
                            <ActionButton key={id} id={id} onAction={onAction} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Reaction read-out ------------------------------------------- */}
            <div className="min-h-[7.5rem]">
                {reaction ? (
                    <div
                        key={reaction.id}
                        className="animate-scale-in rounded-xl border border-white/10 bg-space-800/60 p-4"
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <Beaker
                                className="size-4 text-ozone-300"
                                aria-hidden="true"
                            />
                            <h3 className="text-sm font-semibold text-ozone-200">
                                Chemical reaction
                            </h3>
                        </div>

                        <div className="flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-center">
                            <code className="flex-1 rounded-lg border border-white/5 bg-white/[0.04] px-2.5 py-2 text-center text-xs text-white/85">
                                {reaction.reaction}
                            </code>
                            <ArrowRight
                                className="mx-auto size-4 shrink-0 rotate-90 text-white/30 sm:rotate-0"
                                aria-hidden="true"
                            />
                            <code className="flex-1 rounded-lg border border-white/5 bg-white/[0.04] px-2.5 py-2 text-center text-xs text-white/85">
                                {reaction.effect}
                            </code>
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-white/55">
                            {reaction.description}
                        </p>
                    </div>
                ) : (
                    <div className="flex h-full min-h-[7.5rem] items-center justify-center gap-2.5 rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-center">
                        <Beaker
                            className="size-4 shrink-0 text-white/25"
                            aria-hidden="true"
                        />
                        <p className="text-xs leading-relaxed text-white/40">
                            Pick an action to see the chemistry behind it.
                        </p>
                    </div>
                )}
            </div>

            <Button
                variant="ghost"
                onClick={onReset}
                disabled={isPristine}
                className="justify-center gap-2 text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-35"
            >
                <RotateCcw className="size-4" aria-hidden="true" />
                Reset simulation
            </Button>
        </div>
    );
};

export default SimulationControls;

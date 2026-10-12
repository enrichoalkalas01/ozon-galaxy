"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import EarthModel from "./EarthModel";
import SimulationControls from "./SimulationControls";
import MoleculeAnimation from "./MoleculeAnimation";
import TemperatureDisplay from "./TemperatureDisplay";
import SectionHeading from "./SectionHeading";
import { Info, ShieldAlert, Sun, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    ACTIONS,
    clamp,
    describeState,
    getOzoneStatus,
    OZONE_MAX,
    OZONE_MIN,
    SEASON_TEMPERATURES,
    STATUS_COPY,
    TEMP_MAX,
    TEMP_MIN,
    type ActionId,
    type Season,
} from "./simulation-model";

const INITIAL_SEASON: Season = "spring";

const LEGEND = [
    {
        icon: Waves,
        tone: "text-ozone-300",
        term: "Ozone shell",
        copy: "The dashed ring around Earth. Its opacity and colour track the ozone level from 0 to 10.",
    },
    {
        icon: Sun,
        tone: "text-warn-300",
        term: "UV radiation",
        copy: "Below a level of 5, amber rays break through — the UV-B that reaches the surface.",
    },
    {
        icon: ShieldAlert,
        tone: "text-danger-300",
        term: "Surface stress",
        copy: "Above 30 °C or at a critical ozone level, the land browns and the polar caps retreat.",
    },
] as const;

const OzoneSimulation: React.FC = () => {
    const [ozoneLevel, setOzoneLevel] = useState(OZONE_MAX);
    const [temperature, setTemperature] = useState(
        SEASON_TEMPERATURES[INITIAL_SEASON]
    );
    const [season, setSeason] = useState<Season>(INITIAL_SEASON);
    const [lastAction, setLastAction] = useState<ActionId | null>(null);

    // Guards so the critical alerts fire on the transition, not every render.
    const warnedOzone = useRef(false);
    const warnedHeat = useRef(false);

    const status = getOzoneStatus(ozoneLevel);
    const statusCopy = STATUS_COPY[status];
    const readout = useMemo(
        () => describeState(ozoneLevel, temperature),
        [ozoneLevel, temperature]
    );

    const isPristine =
        ozoneLevel === OZONE_MAX &&
        season === INITIAL_SEASON &&
        temperature === SEASON_TEMPERATURES[INITIAL_SEASON] &&
        lastAction === null;

    const announceThresholds = useCallback(
        (nextOzone: number, nextTemp: number) => {
            if (nextOzone <= OZONE_MIN && !warnedOzone.current) {
                warnedOzone.current = true;
                toast.error("Ozone layer destroyed", {
                    description:
                        "Nothing is absorbing UV-B any more. Surface life would not survive this.",
                    duration: 6000,
                });
            } else if (nextOzone > OZONE_MIN) {
                warnedOzone.current = false;
            }

            if (nextTemp >= TEMP_MAX && !warnedHeat.current) {
                warnedHeat.current = true;
                toast.error("Runaway heating", {
                    description: `Surface temperature has hit the ${TEMP_MAX} °C ceiling of this model.`,
                    duration: 6000,
                });
            } else if (nextTemp < TEMP_MAX) {
                warnedHeat.current = false;
            }
        },
        []
    );

    const handleOzoneChange = useCallback(
        (value: number) => {
            const next = clamp(value, OZONE_MIN, OZONE_MAX);
            setOzoneLevel(next);
            announceThresholds(next, temperature);
        },
        [announceThresholds, temperature]
    );

    const handleSeasonChange = useCallback(
        (next: Season) => {
            setSeason(next);
            setTemperature(SEASON_TEMPERATURES[next]);
            toast(`Season set to ${next}`, {
                description: `Baseline temperature is now ${SEASON_TEMPERATURES[next]} °C.`,
            });
        },
        []
    );

    const handleAction = useCallback(
        (id: ActionId) => {
            const action = ACTIONS[id];
            setLastAction(id);

            const nextOzone = clamp(
                ozoneLevel + action.ozoneDelta,
                OZONE_MIN,
                OZONE_MAX
            );

            // Cooling can only bring the temperature back to the seasonal
            // baseline — planting trees cannot freeze the planet.
            const baseline = SEASON_TEMPERATURES[season];
            const nextTemp =
                action.tempDelta < 0
                    ? Math.max(baseline, temperature + action.tempDelta)
                    : clamp(temperature + action.tempDelta, TEMP_MIN, TEMP_MAX);

            setOzoneLevel(nextOzone);
            setTemperature(nextTemp);

            const ozoneShift = nextOzone - ozoneLevel;
            const tempShift = nextTemp - temperature;
            const parts = [
                ozoneShift === 0
                    ? "ozone unchanged"
                    : `ozone ${ozoneShift > 0 ? "+" : ""}${ozoneShift}`,
                tempShift === 0
                    ? "temperature unchanged"
                    : `temperature ${tempShift > 0 ? "+" : ""}${tempShift} °C`,
            ];

            const notify = action.kind === "harmful" ? toast.warning : toast.success;
            notify(action.label, { description: parts.join(", ") + "." });

            announceThresholds(nextOzone, nextTemp);
        },
        [announceThresholds, ozoneLevel, season, temperature]
    );

    const handleReset = useCallback(() => {
        setOzoneLevel(OZONE_MAX);
        setSeason(INITIAL_SEASON);
        setTemperature(SEASON_TEMPERATURES[INITIAL_SEASON]);
        setLastAction(null);
        warnedOzone.current = false;
        warnedHeat.current = false;
        toast("Simulation reset", {
            description: "Back to a healthy layer in spring conditions.",
        });
    }, []);

    return (
        <section
            id="simulation"
            className="section-veil-cool scroll-mt-24 py-16 md:py-24"
        >
            <div className="container-page">
                <SectionHeading
                    className="reveal mb-10 md:mb-12"
                    eyebrow="Interactive experience"
                    title="Ozone Layer Simulation"
                    description="Change the season, drag the ozone level, or add emissions — the globe, the thermometer and the chemistry all respond."
                />

                <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-8">
                    {/* Visualisation ---------------------------------------- */}
                    <div className="reveal glass-card flex flex-col gap-5 p-5 sm:p-6">
                        <div className="flex justify-center py-2">
                            <EarthModel
                                ozoneLevel={ozoneLevel}
                                temperature={temperature}
                                rotating
                            />
                        </div>

                        {/* Live read-out */}
                        <div
                            className="flex items-start gap-3 rounded-xl border border-white/10 bg-space-800/60 p-4"
                            role="status"
                            aria-live="polite"
                        >
                            <Info
                                className="mt-0.5 size-4 shrink-0 text-ozone-300"
                                aria-hidden="true"
                            />
                            <p className="text-sm leading-relaxed text-white/80">
                                <span className="font-semibold text-ozone-200">
                                    Status:
                                </span>{" "}
                                {readout}
                            </p>
                        </div>

                        {/* Gauges */}
                        <div className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-2">
                            <div className="flex flex-col justify-center gap-2">
                                <p className="text-xs uppercase tracking-[0.12em] text-white/45">
                                    Layer condition
                                </p>
                                <p
                                    className={cn(
                                        "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold",
                                        statusCopy.ring,
                                        statusCopy.text
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "size-2 rounded-full",
                                            statusCopy.dot
                                        )}
                                        aria-hidden="true"
                                    />
                                    {statusCopy.label}
                                </p>
                                <p className="font-mono text-xs text-white/45">
                                    O₃ index {ozoneLevel}/{OZONE_MAX}
                                </p>
                            </div>

                            <TemperatureDisplay
                                temperature={temperature}
                                className="sm:justify-self-end"
                            />
                        </div>

                        {/* Molecule state */}
                        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                            <MoleculeAnimation
                                type="ozone"
                                status={status}
                                showLabels={false}
                                className="max-w-[5.5rem] shrink-0"
                            />
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-[0.12em] text-white/45">
                                    Ozone molecule
                                </p>
                                <p className="text-sm text-white/75">
                                    Three oxygen atoms in a bent chain. The
                                    colour follows the health of the layer.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Controls --------------------------------------------- */}
                    <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
                        <SimulationControls
                            ozoneLevel={ozoneLevel}
                            season={season}
                            lastAction={lastAction}
                            isPristine={isPristine}
                            onOzoneChange={handleOzoneChange}
                            onSeasonChange={handleSeasonChange}
                            onAction={handleAction}
                            onReset={handleReset}
                        />
                    </div>
                </div>

                {/* Legend ------------------------------------------------- */}
                <div className="reveal mt-12 grid gap-4 md:grid-cols-3">
                    {LEGEND.map(({ icon: Icon, tone, term, copy }) => (
                        <div
                            key={term}
                            className="glass-panel flex flex-col gap-2 p-5"
                        >
                            <Icon
                                className={cn("size-5", tone)}
                                aria-hidden="true"
                            />
                            <h3 className="text-base font-semibold text-white">
                                {term}
                            </h3>
                            <p className="text-sm leading-relaxed text-white/60">
                                {copy}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OzoneSimulation;

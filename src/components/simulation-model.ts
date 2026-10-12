/**
 * Shared model for the ozone simulation.
 *
 * All state lives in `OzoneSimulation` and flows down to the controls, so the
 * slider, the season picker and the globe can never disagree.
 */

export type Season = "spring" | "summer" | "autumn" | "winter";

export type ActionId = "factories" | "cars" | "planes" | "trees" | "reduce";

export type OzoneStatus = "healthy" | "damaged" | "critical";

export const OZONE_MIN = 0;
export const OZONE_MAX = 10;
export const TEMP_MIN = 0;
export const TEMP_MAX = 50;

export const SEASON_TEMPERATURES: Record<Season, number> = {
    spring: 16,
    summer: 25,
    autumn: 18,
    winter: 9,
};

export const SEASONS: Season[] = ["spring", "summer", "autumn", "winter"];

export interface ActionDefinition {
    id: ActionId;
    label: string;
    kind: "harmful" | "beneficial";
    /** Change applied to the ozone level. */
    ozoneDelta: number;
    /** Change applied to the temperature, in °C. */
    tempDelta: number;
    reaction: string;
    effect: string;
    description: string;
}

export const ACTIONS: Record<ActionId, ActionDefinition> = {
    factories: {
        id: "factories",
        label: "Add factories",
        kind: "harmful",
        ozoneDelta: -2,
        tempDelta: 3,
        reaction: "CCl₂F₂ + UV → CClF₂· + Cl·",
        effect: "Cl· + O₃ → ClO· + O₂",
        description:
            "Factories release CFCs. UV light splits them in the stratosphere, freeing chlorine radicals that destroy ozone catalytically.",
    },
    cars: {
        id: "cars",
        label: "Add cars",
        kind: "harmful",
        ozoneDelta: -1,
        tempDelta: 1,
        reaction: "Fuel + O₂ → CO₂ + NO₂ + heat",
        effect: "NO₂ + O· → NO· + O₂",
        description:
            "Combustion produces nitrogen oxides that consume the free oxygen atoms ozone needs, while CO₂ traps outgoing heat.",
    },
    planes: {
        id: "planes",
        label: "Add planes",
        kind: "harmful",
        ozoneDelta: -3,
        tempDelta: 4,
        reaction: "Jet fuel + O₂ → NO₂ + CO₂ + H₂O",
        effect: "NO· + O₃ → NO₂ + O₂",
        description:
            "Aircraft inject nitrogen oxides directly into the stratosphere — exactly where the ozone layer sits — so the damage is immediate.",
    },
    trees: {
        id: "trees",
        label: "Plant trees",
        kind: "beneficial",
        ozoneDelta: 2,
        tempDelta: -2,
        reaction: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
        effect: "Lower CO₂ → weaker greenhouse forcing",
        description:
            "Photosynthesis draws down CO₂ and releases O₂, cooling the lower atmosphere and feeding natural ozone formation.",
    },
    reduce: {
        id: "reduce",
        label: "Reduce emissions",
        kind: "beneficial",
        ozoneDelta: 1,
        tempDelta: -1,
        reaction: "Fewer CFCs → less stratospheric Cl·",
        effect: "O₂ + UV → 2O· , O· + O₂ → O₃",
        description:
            "With less chlorine present, the Chapman cycle rebuilds ozone faster than it is destroyed. This is what the Montreal Protocol achieved.",
    },
};

export const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

export const getOzoneStatus = (ozoneLevel: number): OzoneStatus => {
    if (ozoneLevel > 7) return "healthy";
    if (ozoneLevel > 3) return "damaged";
    return "critical";
};

export const STATUS_COPY: Record<
    OzoneStatus,
    { label: string; dot: string; text: string; ring: string }
> = {
    healthy: {
        label: "Healthy",
        dot: "bg-safe-400",
        text: "text-safe-300",
        ring: "border-safe-400/30 bg-safe-500/10",
    },
    damaged: {
        label: "Damaged",
        dot: "bg-warn-400",
        text: "text-warn-300",
        ring: "border-warn-400/30 bg-warn-500/10",
    },
    critical: {
        label: "Critical",
        dot: "bg-danger-400",
        text: "text-danger-300",
        ring: "border-danger-400/30 bg-danger-500/10",
    },
};

/** Human-readable read-out for the current simulation state. */
export const describeState = (
    ozoneLevel: number,
    temperature: number
): string => {
    const status = getOzoneStatus(ozoneLevel);

    const base =
        status === "critical"
            ? "Critical — the shield has collapsed and dangerous UV-B is reaching the surface."
            : status === "damaged"
            ? "Warning — the layer is thinning and more UV-B is getting through."
            : "Stable — the layer is absorbing nearly all incoming UV-B radiation.";

    const thermal =
        temperature >= 30
            ? " High temperatures are accelerating depletion."
            : temperature <= 10
            ? " Cold stratospheric air is slowing recovery."
            : "";

    return base + thermal;
};

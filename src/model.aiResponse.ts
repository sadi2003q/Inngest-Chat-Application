// File: src/types/aiResponse.ts

export interface AIResponse {
    heading: string;
    introduction: string;
    tags: string[];

    // media & external
    aiImage?: string;
    aiLink?: {
        href: string;
        label: string;
    };
    aiYoutube?: string;

    definition?: {
        term: string;
        meaning: string;
    };

    description?: string;

    points?: {
        heading: string;
        point: string[];
    };

    steps?: {
        heading: string;
        point: string[];
    };

    warning?: {
        heading: string;
        text: string;
    };

    tips?: {
        heading: string;
        text: string;
    };

    quotes?: {
        from: string;
        text: string;
    };

    code?: string;

    table?: {
        headers: string[];
        rows: string[][];
    };

    summary: string;
    footer?: string;
}



export type Message =
    | { type: "user"; text: string }
    | { type: "ai-text"; text: string }
    | { type: "ai-structured"; data: AIResponse };
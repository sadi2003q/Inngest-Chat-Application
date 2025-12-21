// File: src/types/aiResponse.ts

export interface AIResponse {
    heading: string;
    introduction: string;
    tags: string[];

    definition?: {
        term: string;
        meaning: string;
    };

    description?: string;

    points?: {
        heading: string,
        point: string[];
    }
    steps?: {
        heading: string,
        point: string[];
    }

    warning?: {
        heading: string,
        text: string;
    }
    tips?: {
        heading: string,
        text: string;
    }

    code?: string;

    table?: {
        headers: string[];
        rows: string[][];
    };

    quotes?: {
        from: string;
        text: string;
    }

    summary: string;
    footer: string;
}


export type Message =
    | { type: "user"; text: string }
    | { type: "ai-text"; text: string }
    | { type: "ai-structured"; data: AIResponse };
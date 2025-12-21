// File: src/types/aiResponse.ts

export interface AIResponse {
    heading: string;
    introduction: string;
    tags: string[];

    definition?: {
        term: string;
        meaning: string;
    };

    points?: string[];
    steps?: string[];

    warning?: string;
    tips?: string[];

    code?: string;

    table?: {
        headers: string[];
        rows: string[][];
    };

    summary: string;
    footer: string;
}
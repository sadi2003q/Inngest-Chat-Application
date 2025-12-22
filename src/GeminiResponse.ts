import { GoogleGenAI } from "@google/genai";
import type { AIResponse } from "./model.aiResponse.ts";
import {GEMINI_secret} from "./secret.ts";

const ai = new GoogleGenAI({
    apiKey: GEMINI_secret
});



const SYSTEM_PROMPT = `
You are an AI content generator.

Return your response ONLY as valid JSON.
Do NOT include markdown, comments, or extra text.

Follow this exact TypeScript interface:

{
  "heading": string,
  "introduction": string,
  "tags": string[],

  "definition"?: {
    "term": string,
    "meaning": string
  },

  "description"?: string,

  "points"?: {
    "heading": string,
    "point": string[]
  },

  "steps"?: {
    "heading": string,
    "point": string[]
  },

  "warning"?: {
    "heading": string,
    "text": string
  },

  "tips"?: {
    "heading": string,
    "text": string
  },

  "code"?: string,

  "table"?: {
    "headers": string[],
    "rows": string[][]
  },

  "quotes"?: {
    "from": string,
    "text": string
  },

  "summary": string,
  "footer": string
}

Rules:
- Include ONLY fields relevant to the question
- Omit irrelevant optional fields completely
- All strings must be plain text
- Arrays must never be null
- code field must be raw code as a string (no markdown)
`;

export const aiResponse = async (
    { question }: { question: string }
): Promise<AIResponse> => {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [{
                    text: `${SYSTEM_PROMPT}\n\nQuestion:\n${question}`
                }]
            }
        ],
    });

    const rawText =
        response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
        throw new Error("Empty AI response");
    }

    return JSON.parse(rawText);
};

// const result = await aiResponse({ question: "What is science?" });
// console.log(result);

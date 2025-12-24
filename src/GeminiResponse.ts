import { GoogleGenAI } from "@google/genai";
import type {AIResponse} from "./model.aiResponse.ts";
import {GEMINI_secret} from "./secret.ts";
import {SYSTEM_PROMPT, SUMMARY_PROMPT} from "./utilities.ts";

const ai = new GoogleGenAI({
    apiKey: GEMINI_secret
});





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

    return cleanJunkFromText({text: rawText})
};


const cleanJunkFromText = ({text} : {text: string}) => {
    const cleanedText = text
        .replace(/^\s*```(?:json)?\s*/, '') // remove opening ``` or ```json
        .replace(/\s*```\s*$/, '');        // remove closing ```

    return JSON.parse(cleanedText);
}


export const aiResponseStream = async (
    { question }: { question: string },
    onChunk: (partialText: string) => void
) => {

    const stream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: [{
            role: "user",
            parts: [{text: `${SYSTEM_PROMPT}\n\nQuestion:\n${question}`}]
        }]
    })

    let fullText = "";
    for await (const chunk of stream) {
        const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) continue;

        fullText += text
        onChunk(text)
    }

    return cleanJunkFromText({text: fullText})


}




export const generateSummary = async ({
    conversationSummary,
    question,
    finalText
} : {
    conversationSummary: () => string;
    question: string;
    finalText: string;
}) => {
    const aiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: [{
            role: "user",
            parts: [{
                text: SUMMARY_PROMPT
                    .replace("{{summary}}", conversationSummary())
                    .replace("{{question}}", question)
                    .replace("{{answer}}", finalText),
            }]
        }]
    })
    console.log("Summary Created...")

    return aiResponse.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
}




// For Testing Purpose
//
// const result = await aiResponse({ question: "What is science?" });
// console.log(result);

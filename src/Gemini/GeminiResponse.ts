import { GoogleGenAI } from "@google/genai";
import type {AIResponse} from "../Model/model.aiResponse.ts";
import {GEMINI_secret} from "../secret.ts";
import {SYSTEM_PROMPT, SUMMARY_PROMPT, CONVERSATION_NAME_PROMPT} from "../Others/utilities.ts";

const ai = new GoogleGenAI({
    apiKey: GEMINI_secret
});


/**
 * Generate Response for Question With Gemini
 * @param question : string User Question
 */
export const aiResponse = async ({
   question,
}: {
    question: string;
}): Promise<AIResponse> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `${SYSTEM_PROMPT}\n\nQuestion:\n${question}`,
                        },
                    ],
                },
            ],
        });

        const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;

        const cleaned = cleanJunkFromText({ text: rawText as string });

        // Ensure cleaned is of type AIResponse
        return cleaned as AIResponse;
    } catch (err) {
        if (err instanceof Error) throw new Error(`AI request failed: ${err.message}`);
        else throw new Error("AI request failed: Unknown error");
    }
};

/**
 * Format AI response
 * @param text : string AI Generated answer
 */
const cleanJunkFromText = ({text} : {text: string}) => {
    const cleanedText = text
        .replace(/^\s*```(?:json)?\s*/, '') // remove opening ``` or ```json
        .replace(/\s*```\s*$/, '');        // remove closing ```

    return JSON.parse(cleanedText);
}


/**
 * Generate Streaming Response from Gemini
 * @param question : User Question
 * @param onChunk
 * @param apiKey: string
 */
export const aiResponseStream = async (
    { question, apiKey }: { question: string, apiKey: string },
    onChunk: (partialText: string) => void
) => {

    const client = new GoogleGenAI({
        apiKey: apiKey ?? GEMINI_secret,
    });
    const stream = await client.models.generateContentStream({
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


/**
 * Generate Summary of the Conversation
 * @param conversationSummary : string Current Summary
 * @param question : string Last Question of User
 * @param finalText : string Last Response of Gemini
 */
export const generateSummary = async ({
  conversationSummary,
  question,
  finalText
} : {
    conversationSummary: string;
    question: string;
    finalText: string;
}) => {

    try {
        const aiResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: [{
                role: "user",
                parts: [{
                    text: SUMMARY_PROMPT
                        .replace("{{summary}}", conversationSummary)
                        .replace("{{question}}", question)
                        .replace("{{answer}}", finalText),
                }]
            }]
        })
        console.log("Summary Created...")

        return aiResponse.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
    } catch (e) {
        let message = "";
        if (e instanceof Error) {
            message = e.message;
        }

        throw new Error(message);
    }


}


/**
 * Generate Conversation Name
 * @param conversationSummary : string Current Name of Conversation
 * @constructor
 */
export const ConversationName = async({conversationSummary}: {conversationSummary: string}) => {

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{
                role: "user",
                parts: [{
                    text: CONVERSATION_NAME_PROMPT
                        .replace("_CONVERSATION_SUMMARY_", conversationSummary)
                }]
            }]
        })


        return response.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
    } catch (e) {
        let message = "";
        if (e instanceof Error) {
            message = e.message;
        }

        throw new Error(message);
    }


}



// For Testing Purpose
//
// const result = await aiResponse({ question: "What is science?" });
// console.log(result);
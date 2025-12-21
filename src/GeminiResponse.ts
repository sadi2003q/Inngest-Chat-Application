import 'dotenv/config'
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

const aiResponse = async ({ question }: { question: string }) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: question,
    });

    // ✅ Extract actual AI text
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log(text);
};

aiResponse({
    question: "What is science",
});
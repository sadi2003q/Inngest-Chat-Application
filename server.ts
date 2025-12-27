import express from "express";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cors from "cors";

import { generateSummary } from "./src/Gemini/GeminiResponse";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());



app.post("/api/send-summary", async (req, res) => {

    try {
        const { currentSummary, question, finalAnswer } = req.body.question;

        const summary = await generateSummary({
            conversationSummary: currentSummary,
            question: question,
            finalText: finalAnswer
        });

        return res.json({ success: true, data: summary });

    } catch (error) {
        console.error("Gemini Error:", error);

        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Unknown server error"
        });
    }

});

app.listen(3001, () => {
    console.log("🚀 Backend running at http://localhost:3001");
});
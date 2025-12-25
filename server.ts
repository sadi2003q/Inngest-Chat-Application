import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest } from "./src/INNGEST/client";
import { callGemini } from "./src/INNGEST/Functions/api-handler";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.use(
    "/api/inngest",
    serve({
        client: inngest,
        functions: [callGemini],
    })
);

app.post("/api/send-summary", async (req, res) => {
    try {
        const result = await inngest.send({
            name: "call/gemini",
            data: req.body,
            waitForResponse: true, // ✅ wait for function completion
        });

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: result.error || "Failed to generate summary",
            });
        }

        res.json({ success: true, message: "Summary generated" });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : "Something went wrong",
        });
    }
});

app.listen(3001, () => {
    console.log("🚀 Backend running at http://localhost:3001");
});
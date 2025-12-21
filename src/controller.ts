// File: src/chat_controller.ts

import { aiResponse } from "./GeminiResponse.ts";
import type { AIResponse, Message } from "./model.aiResponse.ts";
import React from "react";

export class ChatController {
    private readonly setMessages: React.Dispatch<React.SetStateAction<Message[]>>;

    constructor({
                    setMessages,
                }: {
        setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    }) {
        this.setMessages = setMessages;
    }

    // Method to send a question and get AI response
    getAnswer = async ({ question }: { question: string }) => {
        if (!question.trim()) return { success: false, error: "Empty question" };

        try {
            // 1️⃣ Add user message immediately
            const userMessage: Message = {
                type: "user",
                text: question,
            };

            this.setMessages((prev) => [...prev, userMessage]);

            // 2️⃣ Call AI (replace aiResponse with your actual API call)
            const response: AIResponse = await aiResponse({ question });

            // 3️⃣ Add AI structured message
            const aiMessage: Message = {
                type: "ai-structured",
                data: response,
            };

            this.setMessages((prev) => [...prev, aiMessage]);

            return {
                success: true,
            };
        } catch (error) {
            console.error("Error fetching AI response:", error);

            // Optionally show an AI error message
            const errorMessage: Message = {
                type: "ai-text",
                text: "Sorry, I couldn't fetch an answer. Please try again.",
            };
            this.setMessages((prev) => [...prev, errorMessage]);

            return {
                success: false,
                error,
            };
        }
    };
}


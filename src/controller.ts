// File: src/chat_controller.ts

import { aiResponse } from "./GeminiResponse.ts";
import type { AIResponse, Message } from "./model.aiResponse.ts";
import React from "react";
import {demoResponse} from "./utilities.ts";


export class ChatController {
    private readonly setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    private readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

    constructor({
        setMessages,
        setIsLoading,
    }: {
        setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    }) {
        this.setMessages = setMessages;
        this.setIsLoading = setIsLoading;
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
            this.setIsLoading(true) // Loading Starts


            // 2️⃣ Call AI (replace aiResponse with your actual API call)
            // const response: AIResponse = await aiResponse({ question });
            await this.wait(2000) // Simulate Ai response waiting time.
            const response = demoResponse; // Demo response for testing


            // 3️⃣ Add AI structured message
            const aiMessage: Message = {
                type: "ai-structured",
                data: response,
            };

            this.setIsLoading(false); // Loading ends
            this.setMessages((prev) => [...prev, aiMessage]);

            return {
                success: true,
            };
        } catch (error) {
            // console.error("Error fetching AI response:", error);
            this.setIsLoading(false);
            // Optionally show an AI error message
            const errorMessage: Message = {
                type: "ai-text",
                text: error.messaage,
            };
            this.setMessages((prev) => [...prev, errorMessage]);

            return {
                success: false,
                error,
            };
        }
    };








    wait = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
}


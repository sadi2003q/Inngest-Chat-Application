// File: src/chat_controller.ts

import { aiResponse, aiResponseStream } from "./GeminiResponse.ts";
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


    getAnswerStream = async ({ question }: { question: string }) => {

        if(!question.trim()) return { success: false, error: {message: "Empty question"} };
        const userQuestion : Message= {
            type: "user",
            text: question,
        }

        this.setMessages((prev) => [...prev, userQuestion]);

        const streamText : Message= {
            type: "ai-stream",
            text: ""
        }

        this.setMessages(prev => [...prev, streamText]);

        try {

            let streamText = "";

            this.setIsLoading(true);
            //Stream Text
            const finalResponse = await aiResponseStream({question: question},
                (chunk) => {
                    streamText+=chunk;
                    this.setMessages(prev =>
                        prev.map(msg =>
                            msg.type=='ai-stream' ? {...msg, text: streamText} : msg
                        )
                    )
                }
             )

            // Removed Stream raw Text with Structured Output
            this.setMessages(prev =>
                prev.filter(m => m.type !== 'ai-stream').concat({
                    type: "ai-structured",
                    data: finalResponse,
                })
            )

            console.log(finalResponse);

        } catch (error) {
            this.setMessages(prev => [...prev, {
                type: 'ai-text',
                text: error.message,
            }])
        } finally {
            this.setIsLoading(false)
        }






    }





    wait = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
}


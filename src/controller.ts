// File: src/chat_controller.ts

import {aiResponse, aiResponseStream, generateSummary} from "./GeminiResponse.ts";
import type {AIResponse, Message} from "./model.aiResponse.ts";
import React from "react";
import {SYSTEM_PROMPT} from "./utilities.ts";


export class ChatController {
    private readonly setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    private readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    private readonly messages: () => Message[]
    private readonly conversationSummary: string;
    private readonly setConversationSummary: React.Dispatch<React.SetStateAction<string>>


    constructor({
        setMessages,
        setIsLoading,
        messages,
        conversationSummary,
        setConversationSummary,
    }: {
        setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        messages: () => Message[],
        conversationSummary: string,
        setConversationSummary: React.Dispatch<React.SetStateAction<string>>,
    }) {
        this.setMessages = setMessages;
        this.setIsLoading = setIsLoading;
        this.setConversationSummary = setConversationSummary;
        this.messages = messages;
        this.conversationSummary = conversationSummary;
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
            const prompt = this.buildContextPrompt(question);
            const response: AIResponse = await aiResponse({ question: prompt });
            // await this.wait(2000) // Simulate Ai response waiting time.


            // 3️⃣ Add AI structured message
            const aiMessage: Message = {
                type: "ai-structured",
                data: response,
            };
            this.setMessages((prev) => [...prev, aiMessage]);

            // 4️⃣ Generate Summary through Inngest
            const inngestResponse = await fetch("http://localhost:3001/api/send-summary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: {
                        currentSummary: this.conversationSummary,
                        question: question,
                        finalAnswer: response,
                    },
                }),
            });

            const summary = await inngestResponse.json();

            console.log('Summary : \n' ,summary.data);


            if(!summary.success) {
                console.log("Something is not working" +
                    " Please handle the error");
                return;
            }

            this.setConversationSummary(summary.data);

        } catch (error) {

            let errorText = "Something went wrong";

            if (error instanceof Error) {
                errorText = error.message;
            }

            const errorMessage: Message = {
                type: "ai-text",
                text: errorText,
            };

            this.setMessages(prev => [...prev, errorMessage]);


        } finally {
            this.setIsLoading(false); // Loading ends
        }

        return { success: false };
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

            const prompt = this.buildContextPrompt(question);

            //Stream Text
            const finalResponse = await aiResponseStream({question: prompt},
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

            // generate Summary
            const summary = await generateSummary({
                conversationSummary: this.conversationSummary,
                question: question,
                finalText: finalResponse

            })

            this.setConversationSummary(summary);



        } catch (error) {

            let errorText = "Something went wrong";

            if (error instanceof Error) {
                errorText = error.message;
            }

            this.setMessages(prev => [...prev, {
                type: 'ai-text',
                text: errorText
            }])
        } finally {
            this.setIsLoading(false)
        }






    }


    wait = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    buildContextPrompt = (question: string) => {
        const recentMessages = this.messages()
            .filter(m => m.type === "user" || m.type === "ai-text")
            .slice(-6)
            .map(m => `${m.type === "user" ? "User" : "AI"}: ${m.text}`)
            .join("\n");

        return `
${SYSTEM_PROMPT}

Conversation Summary:
${this.conversationSummary || "No prior conversation."}

Recent Messages:
${recentMessages}

Current Question:
${question}
`;
    }
}


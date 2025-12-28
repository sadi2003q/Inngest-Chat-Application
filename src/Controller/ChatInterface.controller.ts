// File: src/chat_controller.ts

import {aiResponse, aiResponseStream, ConversationName, generateSummary} from "../Gemini/GeminiResponse.ts";
import type {AIResponse, Message} from "../Model/model.aiResponse.ts";
import React from "react";
import {type ConversationMessage, demoResponse, SYSTEM_PROMPT} from "../Others/utilities.ts";
import {DatabaseOperation} from "../Database/DatabaseOperation.ts";



export class ChatController {
    private readonly setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    private readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    private readonly messages: () => Message[]
    private readonly conversationSummary: string;
    private readonly setConversationSummary: React.Dispatch<React.SetStateAction<string>>
    private readonly setConversationHeading: React.Dispatch<React.SetStateAction<string>>;
    private readonly setErrorMessage: React.Dispatch<React.SetStateAction<null | string>>;

    private server = new DatabaseOperation()

    constructor({
        setMessages,
        setIsLoading,
        messages,
        conversationSummary,
        setConversationSummary,
        setConversationHeading,
        setErrorMessage
    }: {
        setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        messages: () => Message[],
        conversationSummary: string,
        setConversationSummary: React.Dispatch<React.SetStateAction<string>>,
        setConversationHeading: React.Dispatch<React.SetStateAction<string>>,
        setErrorMessage: React.Dispatch<React.SetStateAction<null | string>>;
    }) {
        this.setMessages = setMessages;
        this.setIsLoading = setIsLoading;
        this.setConversationSummary = setConversationSummary;
        this.messages = messages;
        this.conversationSummary = conversationSummary;
        this.setConversationHeading = setConversationHeading;
        this.setErrorMessage = setErrorMessage;
    }

    // --- Generate Answer from Gemini ---
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
            // const prompt = this.buildContextPrompt(question);
            // const response: AIResponse = await aiResponse({ question: prompt });
            // console.log(response);
            this.wait(2000) // Simulate Ai response waiting time.

            await this.addToDatabase({
                id: "LFDQSylp5wUog1kt7tEOG4xTAxx2",
                cid:  "1234",
                message: question,
                count: 0,
                isUser: true
            })


            // 3️⃣ Add AI structured message
            const aiMessage: Message = {
                type: "ai-structured",
                data: demoResponse,
            };
            this.setMessages((prev) => [...prev, aiMessage]);

            // await this.addToDatabase({
            //     id: "LFDQSylp5wUog1kt7tEOG4xTAxx2",
            //     cid: Date.now().toString(),
            //     message: demoResponse,
            //     count: 0,
            //     isUser: false
            // })
            await this.addToDatabase({
                id: "LFDQSylp5wUog1kt7tEOG4xTAxx2",
                cid:  "1234",
                message: JSON.stringify(demoResponse) ,
                count: 0,
                isUser: false
            })

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                console.log(error.message);
                this.handleError(error);
            }
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


            if(this.messages().length > 5) await this.makeConversationName();


            // generate Summary
            const summary = await generateSummary({
                conversationSummary: this.conversationSummary,
                question: question,
                finalText: finalResponse

            })

            this.setConversationSummary(summary);

        } catch (error) {

            if (error instanceof Error)  this.handleError(error);

        } finally {
            this.setIsLoading(false)

        }


    }
    makeConversationName = async () => {
        try {

            const name = await ConversationName({
                conversationSummary: this.conversationSummary,
            })

            this.setConversationHeading(name);

        } catch(error) {
            let errorText = "Something went wrong";
            if(error instanceof Error) {
                errorText = error.message;
            }
            this.setErrorMessage(errorText)
        }
    }



    // --- Database Operation ---
    getAllConversation_text = async ({id, cid}: {id: string, cid: string}) => {
        try {
            const response = await this.server.getAllConversationMessage({
                id: id,
                cID: cid
            })
            this.setMessages(response);
            console.log("Fetched");
        } catch(error) {
            if(error instanceof Error)  this.handleError(error);
        }

    }
    addToDatabase = async ({id, cid, message, count, isUser}: {
        id: string,
        cid: string,
        message: string | AIResponse,
        count?: number,
        isUser:boolean
    }) => {

        const conversationMessage: ConversationMessage = {
            text: message,
            id: count ?? Date.now(), // fallback unique id
            time: new Date(),
            isUser: isUser
        };

        try {
            await this.server.addMessage({
                uid: id,
                cID: cid,
                message: conversationMessage,
            })
            console.log("Saved to Database")
        } catch (error) { if(error instanceof Error)  this.handleError(error); }
    }






    // --- Helper Function ---
    wait = (ms: number) => {
        new Promise((resolve) => setTimeout(resolve, ms)).then();
    }
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
    handleError = (error: Error) => {
        let errorText = "Something went wrong";

        errorText = error.message;

        this.setErrorMessage(errorText)
        this.setMessages(prev => {
            if (prev.length === 0) return prev; // nothing to remove
            const newMessages = [...prev];
            newMessages.pop(); // remove last message
            return [...newMessages]; // optionally add the error message
        });
    }


}


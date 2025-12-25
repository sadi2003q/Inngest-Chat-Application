// Filepath: src/chat_interface.tsx

import { useState } from "react";

import {
    ChatHeader,
    MessageSendButton,
    MessageSendField,
    ChatWindow,
} from "./chat_interface.componant";
import type { Message } from "./model.aiResponse";
import {ChatController} from "./controller.ts";






// ---------------- COMPONENT ----------------
export default function ChatInterface() {

    const [textFieldMessage, setTextFieldMessage] = useState("Make me a Lecture about Starvation in Operation and also tell me the difference between Deadlock and Starvation.");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [conversationSummary, setConversationSummary] = useState<string>("");

    const controller = new ChatController({
        setMessages: setMessages,
        setIsLoading: setIsLoading,
        messages: () => messages,
        conversationSummary: () => conversationSummary,
        setConversationSummary: setConversationSummary,
    });


    const showMessage = async () => {
        if (!textFieldMessage.trim()) return;


        setTextFieldMessage("");

        // Stream AI structured response
        // await controller.getAnswerStream({question: textFieldMessage})

        // Simulate AI response
        await controller.getAnswer({question: textFieldMessage});



    }


    return (
        <div className="w-screen h-screen bg-black text-white flex flex-col items-center justify-center py-3">
            <ChatHeader name={"MD. Adnan Abdullah Sadi"} subtext={"User"} />

            <ChatWindow messages={messages} isLoading={isLoading} />

            <div className="flex items-center justify-center gap-2 w-screen pb-6">
                <MessageSendField
                    textFieldMessage={textFieldMessage}
                    setTextFieldMessage={setTextFieldMessage}
                />

                <MessageSendButton showMessage={showMessage} />
            </div>
        </div>
    );
}

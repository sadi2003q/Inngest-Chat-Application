// Filepath: src/View/ChatInterfacePage.tsx

import {useEffect, useState} from "react";

import {
    ChatHeader,
    MessageSendButton,
    MessageSendField,
    ChatWindow, ErrorToast,
} from "./Components/chat_interface.componant.tsx";
import type { Message } from "../Model/model.aiResponse.ts";
import {ChatController} from "../Controller/ChatInterface.controller.ts";






// ---------------- COMPONENT ----------------
export default function ChatInterface() {

    const [textFieldMessage, setTextFieldMessage] = useState(" what is Starvation" ); // Text Field Messaes
    const [messages, setMessages] = useState<Message[]>([]); // All Message Array
    const [isLoading, setIsLoading] = useState<boolean>(false); // for Animation
    const [conversationSummary, setConversationSummary] = useState<string>(""); // for current conversation Summary
    const [conversationHeading, setConversationHeading] = useState<string>("First Conversation"); // Name of the Heading
    const [errorMessage, setErrorMessage] = useState<null | string>(null); // handling error







    const controller = new ChatController({
        setMessages: setMessages,
        setIsLoading: setIsLoading,
        messages: () => messages,
        conversationSummary: conversationSummary,
        setConversationSummary: setConversationSummary,
        setConversationHeading: setConversationHeading,
        setErrorMessage: setErrorMessage
    });


    useEffect(() => {
        const timer = setTimeout(() => setErrorMessage(null), 0);
        return () => clearTimeout(timer);
    }, []);



    const showMessage = async () => {
        if (!textFieldMessage.trim()) return;


        setTextFieldMessage("");

        // Stream AI structured response
        // await controller.getAnswerStream({question: textFieldMessage})

        // Simulate AI response
        await controller.getAnswer({question: textFieldMessage});



    }


    return (
        <div className="w-screen h-screen text-white flex flex-col items-center justify-center py-3">
            <ChatHeader name={conversationHeading} subtext={"User"} />

            <ChatWindow messages={messages} isLoading={isLoading} />

            {/* 👇 Add this right here */}
            {errorMessage && (
                <ErrorToast
                    duration={4000} // auto-dismiss after 4 seconds
                    onClose={() => setErrorMessage(null)} // reset error state
                    title={"Error"}
                />
            )}

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

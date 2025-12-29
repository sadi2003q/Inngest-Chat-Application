// Filepath: src/View/ChatInterfacePage.tsx

import React, {useEffect, useState} from "react";

import {
    ChatHeader,
    MessageSendButton,
    MessageSendField,
    ChatWindow, ErrorToast,
} from "./Components/chat_interface.componant.tsx";
import type { Message } from "../Model/model.aiResponse.ts";
import {ChatController} from "../Controller/ChatInterface.controller.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import { Pages } from "../Others/utilities.ts";
import {useAuth} from "../AuthContext.tsx";






// ---------------- COMPONENT ----------------
export default function ChatInterface() {

    const [textFieldMessage, setTextFieldMessage] = useState(" what is Starvation" ); // Text Field Messages
    const [messages, setMessages] = useState<Message[]>([]); // All Message Array
    const [isLoading, setIsLoading] = useState<boolean>(false); // for Animation
    const [conversationSummary, setConversationSummary] = useState<string>(""); // for current conversation Summary
    const [conversationHeading, setConversationHeading] = useState<string>("First Conversation"); // Name of the Heading
    const [errorMessage, setErrorMessage] = useState<null | string>(null); // handling error


    // Controller Function
    const controller = new ChatController({
        setMessages: setMessages,
        setIsLoading: setIsLoading,
        messages: () => messages,
        conversationSummary: conversationSummary,
        setConversationSummary: setConversationSummary,
        setConversationHeading: setConversationHeading,
        setErrorMessage: setErrorMessage
    });


    // Navigation Variable
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const cid = searchParams.get("cid"); // string | null
    const { uid } = useAuth();



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
        if(cid && uid) await controller.getAnswer({question: textFieldMessage, id: uid, cid: cid});
    }




    const hasFetched = React.useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        if(!cid) navigate(Pages.Dashboard)

        console.log("CID : ", cid);

        controller.getAllConversation_text({
            id: "LFDQSylp5wUog1kt7tEOG4xTAxx2",
            cid: cid ?? "1234",
        }).then();
    }, []);





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

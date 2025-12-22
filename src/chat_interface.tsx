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

    const [textFieldMessage, setTextFieldMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const controller = new ChatController({setMessages: setMessages});


    const showMessage = () => {
        if (!textFieldMessage.trim()) return;


        setTextFieldMessage("");

        // simulated AI structured response
        controller.getAnswer({question: textFieldMessage}).then(() => {
            console.log('success')
        }).catch(() => {
            console.log('error')
        });
    }


    return (
        <div className="w-screen h-screen bg-black text-white flex flex-col items-center justify-center py-3">
            <ChatHeader name={"MD. Adnan Abdullah Sadi"} subtext={"User"} />

            <ChatWindow messages={messages} />

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

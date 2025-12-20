// Filepath: src/chat_interface.tsx

import {useState} from "react";

import {
    ChatHeader,
    MessageSendButton,
    MessageSendField,
    ChatWindow
} from "./chat_interface.componant.tsx";


export default function ChatInterface() {

    const [textFieldMessage, setTextFieldMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ text: string; isSent: boolean }[]>([]);


    const showMessage = () => {
        if (!textFieldMessage) return;

        // Add user's message
        setMessages((prev) => [...prev, { text: textFieldMessage, isSent: true }]);
        setTextFieldMessage("");

        // Simulate a received reply after 1 second
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { text: "This is a simulated reply!", isSent: false },
            ]);
        }, 1000);
    };

    return (
        <div className={'w-screen h-screen bg-black text-white align-middle flex flex-col items-center justify-center py-3'}>

            <ChatHeader name={"MD. Adnan Abdullah Sadi"} subtext={"User"}/>

            <ChatWindow messages={messages} />


            <div className={'flex items-center justify-center gap-2 w-screen pb-6'}>
                <MessageSendField textFieldMessage={textFieldMessage} setTextFieldMessage={setTextFieldMessage}/>

                <MessageSendButton showMessage={showMessage}/>

            </div>



        </div>
    );


}

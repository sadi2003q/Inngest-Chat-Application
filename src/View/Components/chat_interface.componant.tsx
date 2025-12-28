//FilePath: src/chat_interface.component.tsx


import { MessageCircle, Send, Settings, Trash2 } from "lucide-react"
import React, { useRef, useEffect, useState } from "react";
import {TAG_COLORS} from "../../Others/utilities.ts";
import type {AIResponse, Message} from "../../Model/model.aiResponse.ts";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {oneLight} from "react-syntax-highlighter/dist/cjs/styles/prism";



// Header Component
export const ChatHeader = ({ name, subtext }: { name: string; subtext: string }) => {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-gray-900">{name}</h1>
                <p className="text-sm text-gray-500">{subtext}</p>
            </div>

            <div className="flex items-center gap-2">
                <IconButton icon={<MessageCircle className="w-5 h-5" />} label="New Chat" />
                <IconButton icon={<Settings className="w-5 h-5" />} label="Settings" />
                <IconButton icon={<Trash2 className="w-5 h-5" />} label="Clear" variant="danger" />
            </div>
        </div>
    );
};

// Icon Button Component
const IconButton = ({ icon, label, variant = "default" }: { icon: React.ReactNode; label: string; variant?: "default" | "danger" }) => {
    const baseClasses = "p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95";
    const variantClasses = variant === "danger"
        ? "text-rose-600 hover:bg-rose-50"
        : "text-gray-600 hover:bg-gray-100";

    return (
        <button title={label} className={`${baseClasses} ${variantClasses}`}>
            {icon}
        </button>
    );
};

// Message Input Field
export const MessageSendField = ({
     textFieldMessage,
     setTextFieldMessage,
}: {
    textFieldMessage: string;
    setTextFieldMessage: (text: string) => void;
}) => {
    return (
        <div className="flex-1 max-w-3xl">
      <textarea
          placeholder="Type your message..."
          value={textFieldMessage}
          onChange={(e) => setTextFieldMessage(e.target.value)}
          rows={1}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
          style={{ minHeight: "52px", maxHeight: "150px" }}
      />
        </div>
    );
};

// Send Button
export const MessageSendButton = ({ showMessage }: { showMessage?: () => void }) => {
    return (
        <button
            onClick={showMessage}
            className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
        >
            <Send className="w-5 h-5" />
        </button>
    );
};

// User Message Bubble
const MessageBubble = ({ text }: { text: string }) => {
    return (
        <div className="flex justify-end w-full mb-4">
            <div className="max-w-md px-4 py-3 rounded-2xl rounded-br-md bg-blue-600 text-white shadow-sm">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
            </div>
        </div>
    );
};

// AI Message
const ReceivedMessage = ({ text }: { text: string }) => {
    return (
        <div className="flex justify-start w-full mb-4">
            <div className="max-w-3xl px-4 py-3 rounded-2xl bg-gray-50 text-gray-900 shadow-sm">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
            </div>
        </div>
    );
};

// Typing Indicator
export const TypingIndicator = () => {
    return (
        <div className="flex justify-start mb-4">
            <div className="bg-gray-50 rounded-2xl px-4 py-3 flex gap-1 shadow-sm">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
        </div>
    );
};

// Chat Window
export const ChatWindow = ({ messages, isLoading }: { messages: Message[]; isLoading: boolean }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 w-full max-w-4xl px-6 py-4 overflow-y-auto">
            {messages.map((msg, index) => {
                if (msg.type === "user") return <MessageBubble key={index} text={msg.text || ""} />;
                if (msg.type === "ai-stream" || msg.type === "ai-text") return <ReceivedMessage key={index} text={msg.text || ""} />;
                if (msg.type === "ai-structured") return <AIMessageRenderer key={index} data={msg.data!} />;
                return null;
            })}

            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
        </div>
    );
};

// AI Components
const AIHeading = ({ text }: { text: string }) => (
    <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-blue-500 pb-2">{text}</h2>
);

const AIIntroduction = ({ text }: { text: string }) => (
    <p className="text-gray-700 leading-relaxed mb-4">{text}</p>
);

const AITags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
            <span key={index} className={`px-3 py-1 text-xs font-medium rounded-full border ${TAG_COLORS[index % TAG_COLORS.length]}`}>
        {tag}
      </span>
        ))}
    </div>
);

const AICodeBlock = ({ code, language = "java" }: { code: string; language?: string }) => (
    <div className="my-6 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
            <span className="text-xs font-medium text-gray-600 uppercase">Code</span>
        </div>
        <SyntaxHighlighter language={language} style={oneLight} customStyle={{ margin: 0, fontSize: "0.85rem" }}>
            {code}
        </SyntaxHighlighter>
    </div>
);

const AIQuote = ({ data }: { data: { from: string; text: string } }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 my-6 bg-blue-50 py-3 rounded-r-lg">
        <p className="italic text-gray-700 text-base">"{data.text}"</p>
        <cite className="text-gray-500 block mt-2 text-sm">— {data.from}</cite>
    </blockquote>
);

const AIDefinition = ({ term, meaning }: { term: string; meaning: string }) => (
    <div className="my-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-1">{term}</h4>
        <p className="text-gray-700 leading-relaxed">{meaning}</p>
    </div>
);

const AIPoints = ({ data }: { data: { heading: string; point: string[] } }) => (
    <div className="my-6 p-5 bg-green-50 rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-3">{data.heading}</h3>
        <ul className="space-y-2">
            {data.point.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <span>{p}</span>
                </li>
            ))}
        </ul>
    </div>
);

const AISteps = ({ data }: { data: { heading: string; point: string[] } }) => (
    <div className="my-6 p-5 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">{data.heading}</h3>
        <div className="space-y-4">
            {data.point.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-semibold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                </div>
            ))}
        </div>
    </div>
);

const AIWarning = ({ data }: { data: { heading: string; text: string } }) => (
    <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl my-4">
        <div className="font-semibold text-rose-900 flex items-center gap-2 mb-1">
            ⚠️ {data.heading}
        </div>
        <p className="text-rose-700">{data.text}</p>
    </div>
);

const AITips = ({ data }: { data: { heading: string; text: string } }) => (
    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl my-4">
        <h4 className="text-amber-900 font-semibold mb-1">💡 {data.heading}</h4>
        <p className="text-amber-800">{data.text}</p>
    </div>
);

const AISummary = ({ text }: { text: string }) => (
    <div className="mt-6 p-4 bg-gray-100 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-gray-600" />
            <strong className="text-sm uppercase tracking-wide text-gray-600">Summary</strong>
        </div>
        <p className="text-gray-700 leading-relaxed">{text}</p>
    </div>
);

const AIMessageRenderer = ({ data }: { data: AIResponse }) => {
    return (
        <div className="my-4 space-y-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            {data.heading && <AIHeading text={data.heading} />}
            {data.introduction && <AIIntroduction text={data.introduction} />}
            {data.tags && <AITags tags={data.tags} />}
            {data.quotes && <AIQuote data={data.quotes} />}
            {data.definition && <AIDefinition term={data.definition.term} meaning={data.definition.meaning} />}
            {data.points && <AIPoints data={data.points} />}
            {data.steps && <AISteps data={data.steps} />}
            {data.code && <AICodeBlock code={data.code} />}
            {data.warning && <AIWarning data={data.warning} />}
            {data.tips && <AITips data={data.tips} />}
            {data.summary && <AISummary text={data.summary} />}
        </div>
    );
};

// Error Toast
export const ErrorToast = ({ title, duration = 5000, onClose }: { title: string; duration?: number; onClose?: () => void }) => {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!visible) return;

        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, ((duration - elapsed) / duration) * 100);
            setProgress(remaining);
            if (remaining === 0) {
                setVisible(false);
                onClose?.();
            }
        }, 30);

        return () => clearInterval(interval);
    }, [duration, onClose, visible]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm animate-in slide-in-from-bottom-4">
            <div className="bg-white rounded-xl border border-rose-200 shadow-lg overflow-hidden">
                <div className="absolute bottom-0 left-0 h-1 bg-rose-500 transition-all" style={{ width: `${progress}%` }} />
                <div className="flex items-start gap-4 p-4">
                    <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">Error</h3>
                        <p className="text-sm text-gray-600 mt-1">{title}</p>
                    </div>
                    <button onClick={() => { setVisible(false); onClose?.(); }} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
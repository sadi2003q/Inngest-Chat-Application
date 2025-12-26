//FilePath: src/chat_interface.component.tsx


import { MessageCircle, Settings, Trash2 } from "lucide-react"
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import React, { useRef, useEffect, useState } from "react";
import {TAG_COLORS} from "../../Others/utilities.ts";
import type {AIResponse, Message} from "../../Model/model.aiResponse.ts";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const ChatHeader = ({
                               name,
                               subtext,
                           }: {
    name: string
    subtext: string
}) => {
    return (
        <div
            className="
        w-full max-w-4xl
        mx-auto
        min-h-[72px]
        bg-gradient-to-r from-gray-900 to-gray-800
        rounded-2xl sm:rounded-3xl
        flex flex-row
        items-center justify-between
        gap-4
        px-4 sm:px-6 py-3
        text-white shadow-lg
      "
        >
            {/* Left: Bot Identity */}
            <div className="flex flex-col flex-1 min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold tracking-wide truncate">
                    {name}
                </h1>
                <p className="text-xs sm:text-sm text-white/60 truncate">
                    {subtext}
                </p>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <IIconButton label="New Chat">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </IIconButton>

                <IIconButton label="Settings">
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                </IIconButton>

                <IIconButton danger label="Clear Chat">
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </IIconButton>
            </div>
        </div>
    )
}

/* Reusable animated button */
function IIconButton({
                         children,
                         label,
                         danger = false,
                     }: {
    children: React.ReactNode
    label: string
    danger?: boolean
}) {
    return (
        <button
            title={label}
            className={`
        relative group
        w-9 h-9 sm:w-11 sm:h-11
        rounded-lg sm:rounded-xl
        flex items-center justify-center
        transition-all duration-300
        ${
                danger
                    ? "bg-red-500/10 hover:bg-red-500/20"
                    : "bg-white/10 hover:bg-white/20"
            }
        hover:scale-110 active:scale-95
      `}
        >
            {/* Glow */}
            <span
                className={`
          absolute inset-0 rounded-lg sm:rounded-xl
          opacity-0 blur-lg group-hover:opacity-100 transition
          ${danger ? "bg-red-500/30" : "bg-white/30"}
        `}
            />

            <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
        </button>
    )
}


export const MessageSendField = ({textFieldMessage, setTextFieldMessage}:{
    textFieldMessage: string
    setTextFieldMessage: (textFieldMessage: string) => void
}) => {
    return (
        <div className="w-screen sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-2.5/5 ">
            <TextField
                id="filled-textarea"
                label="Message"
                placeholder="Type your message..."
                multiline
                maxRows={5}
                variant="filled"
                value={textFieldMessage}
                onChange={(e) => setTextFieldMessage(e.target.value)}
                fullWidth
                sx={{

                    width: "100%",

                    backgroundColor: "#1f1f1f",
                    borderRadius: "12px",

                    // input text
                    "& .MuiInputBase-input": {
                        color: "#ffffff",
                    },

                    // label
                    "& .MuiInputLabel-root": {
                        color: "#9ca3af",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#22c55e",
                    },

                    // underline
                    "& .MuiFilledInput-underline:before": {
                        borderBottomColor: "#4b5563",
                    },
                    "& .MuiFilledInput-underline:hover:before": {
                        borderBottomColor: "#22c55e",
                    },
                    "& .MuiFilledInput-underline:after": {
                        borderBottomColor: "#22c55e",
                    },

                    // remove default filled background on hover/focus
                    "& .MuiFilledInput-root": {
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        backgroundColor: "#1f1f1f",
                    },
                    "& .MuiFilledInput-root:hover": {
                        backgroundColor: "#262626",
                    },
                    "& .MuiFilledInput-root.Mui-focused": {
                        backgroundColor: "#1f1f1f",
                    },
                }}
            />
        </div>

    );
}

export const MessageSendButton = ({showMessage}:{
    showMessage?: () => void
}) => {
    return (
        <IconButton
            aria-label="Send"
            onClick={showMessage}
            sx={{
                width: 48,
                height: 48,
                borderRadius: "14px",

                color: "#ffffff",
                backgroundColor: "#22c55e",

                transition: "all 0.25s ease",

                "&:hover": {
                    backgroundColor: "#16a34a",
                    transform: "scale(1.1)",
                    // boxShadow: "0 0 18px rgba(34, 197, 94, 0.6)",
                },

                "&:active": {
                    transform: "scale(0.95)",
                },

                "& svg": {
                    fontSize: 22,
                },
            }}
        >
            <ArrowOutwardIcon />
        </IconButton>
    );
}


const ReceivedMessage = ({ text }: { text: string }) => {
    return (
        <div className="flex justify-start w-full my-2">
            <div
                className="
                    max-w-3xl
                    text-white
                    text-sm sm:text-base
                    leading-relaxed
                "
                style={{ whiteSpace: "pre-wrap" }}
            >
                {text}
            </div>
        </div>
    );
};

const MessageBubble = ({ text }: { text: string }) => {
    return (
        <div className="flex justify-end w-full my-1">
            <div
                className="
                    max-w-xs sm:max-w-md
                    px-4 py-2
                    rounded-2xl
                    bg-green-500
                    text-white
                    rounded-br-none
                    break-words
                "
                style={{ whiteSpace: "pre-wrap" }}
            >
                {text}
            </div>
        </div>
    );
};


export const ChatWindow = ({
        messages,
        isLoading
    }: {
    messages: Message[];
    isLoading: boolean;
    }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 w-full max-w-4xl px-4 py-2 overflow-y-auto">
            {messages.map((msg, index) => {
                if (msg.type === "user") {
                    return <MessageBubble key={index} text={msg.text} />;
                }

                if (msg.type === "ai-stream") {
                    return <ReceivedMessage key={index} text={msg.text} />;
                }

                if (msg.type === "ai-text") {
                    return <ReceivedMessage key={index} text={msg.text} />;
                }

                if (msg.type === "ai-structured") {
                    return <AIMessageRenderer key={index} data={msg.data} />;
                }



                return null;
            })}

            {isLoading && (
                <div className="flex justify-start mb-2">
                    <TypingIndicator />
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    );
};


export const TypingIndicator = () => {
    return (
        <div className="flex items-center gap-2 max-w-xs">
            <div className="bg-gray-800 rounded-2xl px-4 py-2 flex gap-1">
                <span className="dot animate-bounce [animation-delay:0ms]" />
                <span className="dot animate-bounce [animation-delay:150ms]" />
                <span className="dot animate-bounce [animation-delay:300ms]" />
            </div>
        </div>
    );
};






const AIMessageRenderer = ({ data }: { data: AIResponse }) => {
    return (
        <div className="my-4 space-y-3">


            <AIHeading text={data.heading} />
            <AIIntroduction text={data.introduction} />
            <AITags tags={data.tags} />

            {data.quotes && <AIQuote data={data.quotes} />}


            {data.definition && (
                <AIDefinition
                    term={data.definition.term}
                    meaning={data.definition.meaning}
                />
            )}

            {data.points && <AIPoints data={data.points} />}

            {data.steps && <AISteps data={data.steps} />}

            {data.code && <AICodeBlock code={data.code} />}

            {data.aiYoutube && (
                <AIYouTube
                    embedId={data.aiYoutube.split('v=')[1]}
                />
            )}

            {data.warning && <AIWarning data={data.warning} />}

            {data.table && (
                <AITable headers={data.table.headers} rows={data.table.rows} />
            )}

            {data.tips && <AITips data={data.tips} />}


            {data.aiLink && (
                <AILink
                    label={data.aiLink.label}
                    href={data.aiLink.href}
                />
            )}
            <AISummary text={data.summary} />
            {data.footer && <AIFooter text={data.footer} />}
        </div>
    );
};



interface ErrorToastProps {
    title: string;
    description: string;
    duration?: number;
    onClose?: () => void;
}

export const ErrorToast = ({ title, duration = 5000, onClose }: ErrorToastProps) => {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!visible) return;

        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, (duration - elapsed) / duration * 100);
            setProgress(remaining);

            if (remaining === 0) {
                setVisible(false);
                onClose?.();
            }
        }, 30);

        const timer = setTimeout(() => {
            setVisible(false);
            onClose?.();
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [duration, onClose, visible]);

    if (!visible) return null;

    const handleClose = () => {
        setVisible(false);
        onClose?.();
    };

    return (
        <div
            role="alert"
            className="fixed bottom-6 right-6 z-50 w-full max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300"
        >
            <div className="relative overflow-hidden rounded-xl bg-gray-950/95 backdrop-blur-lg border border-rose-500/20 shadow-2xl">
                {/* Progress bar */}
                <div
                    className="absolute bottom-0 left-0 h-1 bg-rose-500 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                />

                <div className="flex items-start gap-4 p-5">
                    {/* Error Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                        <svg
                            className="w-6 h-6 text-rose-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white">Error</h3>
                        <p className="mt-1 text-sm text-gray-300 leading-relaxed break-words">{title}</p>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-200 transition-colors"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};


















 const AIHeading = ({ text }: { text: string }) => (
    <h1 className="text-2xl underline decoration-amber-100 underline-offset-4 font-bold text-white my-4">
        {text}
    </h1>
);

 const AIIntroduction = ({ text }: { text: string }) => (
    <p className="text-white/90 leading-relaxed my-2">
        {text}
    </p>
);

const AICodeBlock = ({
                                code,
                                language = "java",
                            }: {
    code: string;
    language?: string;
}) => (
    <div className="my-6 rounded-2xl border border-white/10 bg-black/60 overflow-hidden">
        <h2 className={'underline decoration-purple-500 underline-offset-4 text-xl font-bold'}>Code...</h2>

        <div className="flex items-center justify-between px-4 py-2 bg-white/5">
      <span className="text-xs uppercase tracking-wide text-white/60">
        {language}
      </span>
        </div>

        <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
                margin: 0,
                background: "transparent",
                fontSize: "0.85rem",
            }}
            codeTagProps={{
                style: {
                    fontFamily: "JetBrains Mono, monospace",
                },
            }}
        >
            {code}
        </SyntaxHighlighter>
    </div>
);



//  const AIImage = ({ src, alt }: { src: string; alt?: string }) => (
//     <img
//         src={src}
//         alt={alt}
//         referrerPolicy="no-referrer" // Adds a layer of bypass for some sites
//         className="rounded-xl my-4 max-w-full"
//     />
// );


 const AIYouTube = ({ embedId }: { embedId: string }) => (
    <div className="aspect-video my-4">
        <h2 className={'underline decoration-yellow-400 underline-offset-4 text-xl font-bold'}>Watch for More Information</h2>
        <iframe
            className="w-full h-full rounded-xl"
            src={`https://www.youtube.com/embed/${embedId}`}
            allowFullScreen
        />
    </div>
);


export const AILink = ({ label, href }: { label: string; href: string }) => (
    <a
        href={href}
        target="_blank"
        className="text-green-400 underline my-2 inline-block"
    >
        {label}
    </a>
);


export const AIPoints = ({
                             data,
                         }: {
    data: { heading: string; point: string[] };
}) => (
    <div className="my-6 rounded-2xl bg-white/5 border border-white/10 p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {data.heading}
        </h3>

        <ul className="space-y-3 text-white/90">
            {data.point.map((p, i) => {
                const content = renderPointText(p);
                if (!content) return null;

                return (
                    <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        {content}
                    </li>
                );
            })}
        </ul>
    </div>
);


 const AISteps = ({
    data,
}: {
    data: { heading: string; point: string[] };
}) => (
    <div className="my-6 rounded-2xl bg-white/5 border border-white/10 p-5">
        <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            {data.heading}
        </h3>

        <div className="space-y-4">
            {data.point.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-semibold shrink-0">
                        {i + 1}
                    </div>

                    <p className="text-white/90 leading-relaxed">
                        {step}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

 const AITips = ({ data }: { data: { heading: string; text: string } }) => (
    <div className="bg-green-500/10 p-4 rounded-lg my-4 border border-green-500/20">
        <h4 className="text-green-400 font-bold mb-1">{data.heading}</h4>
        <p className="text-green-300/90 italic">{data.text}</p>
    </div>
);

 const AIWarning = ({ data }: { data: { heading: string; text: string } }) => (
    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg my-4">
        <div className="font-bold flex items-center gap-2 mb-1">
            ⚠️ {data.heading}
        </div>
        <p className="text-red-300/80">{data.text}</p>
    </div>
);

 const AIQuote = ({ data }: { data: { from: string; text: string } }) => (
    <blockquote className="border-l-4 border-green-500 pl-4 my-6">
        <p className="italic text-white/80 text-lg">"{data.text}"</p>
        <cite className="text-white/50 block mt-2 text-sm">— {data.from}</cite>
    </blockquote>
);



 const AIDefinition = ({
                                 term,
                                 meaning,
                             }: {
    term: string;
    meaning: string;
}) => (
    <div className="my-5 rounded-xl bg-white/5 border border-white/10 p-4">
        <div className="flex items-start gap-2 mb-1">
            <span className="w-2 h-2 mt-2 rounded-full bg-cyan-400 shrink-0" />
            <h4 className="text-white font-semibold">
                {term}
            </h4>
        </div>

        <p className="text-white/90 leading-relaxed ml-4">
            {meaning}
        </p>
    </div>
);


const AITags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-wrap gap-2 my-3 cursor-pointer">
        {tags.map((tag, index) => (
            <span
                key={index}
                className={`
                    px-2.5 py-1
                    text-xs font-medium
                    rounded-md
                    border
                    ${TAG_COLORS[index % TAG_COLORS.length]}
                `}
            >
                {tag}
            </span>
        ))}
    </div>
);



const AITable = ({
    headers,
    rows,
}: {
headers: string[];
rows: string[][];
}) => (
<table className="w-full text-white my-4 border border-white/10">
<thead>
<tr>
{headers.map((h, i) => (
<th key={i} className="border px-3 py-2">
{h}
</th>
))}
</tr>
</thead>
<tbody>
{rows.map((row, i) => (
<tr key={i}>
{row.map((cell, j) => (
<td key={j} className="border px-3 py-2">
{cell}
</td>
))}
</tr>
))}
</tbody>
</table>
);


const AISummary = ({ text }: { text: string }) => (
    <div className="mt-8 rounded-xl bg-white/5 border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-2 text-white">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <strong className="text-sm uppercase tracking-wide text-white/80">
                Summary
            </strong>
        </div>

        <p className="text-white/90 leading-relaxed">
            {text}
        </p>
    </div>
);

const AIFooter = ({ text }: { text: string }) => (
    <div className="mt-6 text-xs text-white/40 flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-white/30" />
        <span>{text}</span>
    </div>
);



const renderPointText = (text: string) => {
    // Ignore empty lines
    if (!text.trim()) return null;

    // Match **Something**
    const match = text.match(/^\*\*(.+?)\*\*(.*)$/);

    if (!match) {
        // Normal point
        return <p className="leading-relaxed">{text}</p>;
    }

    const [, boldText, restText] = match;

    return (
        <p className="leading-relaxed">
            <span className="font-semibold text-base text-white">
                {boldText}
            </span>
            {restText && (
                <span className="text-white/90">
                    {restText}
                </span>
            )}
        </p>
    );
};
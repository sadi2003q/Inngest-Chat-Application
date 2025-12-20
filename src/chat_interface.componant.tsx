//FilePath: src/chat_interface.component.tsx


import { MessageCircle, Settings, Trash2 } from "lucide-react"
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useRef, useEffect } from "react";


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

const MessageBubble = ({
                                  text,
                                  isSent = true, // true = user sent, false = received
                              }: {
    text: string;
    isSent?: boolean;
}) => {
    return (
        <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} w-full my-1`}>
            <div
                className={`
                    max-w-xs sm:max-w-md px-4 py-2 rounded-2xl break-words
                    ${isSent ? 'bg-green-500 text-white rounded-br-none' : 'bg-gray-700 text-white rounded-bl-none'}
                    
                `}
                style={{ whiteSpace: 'pre-wrap' }}
            >
                {text}
            </div>
        </div>
    );
};


export const ChatWindow = ({
                               messages,
                           }: {
    messages: { text: string; isSent: boolean }[];
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 w-full max-w-4xl px-4 py-2 overflow-y-auto">


        {messages.map((msg, index) => (
                <MessageBubble key={index} text={msg.text} isSent={msg.isSent} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

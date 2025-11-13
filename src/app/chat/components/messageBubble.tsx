import { Message } from "@/types/chat";

interface MessageBubbleProps {
    message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.sender === "user";
    const isError = message.isError;

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-3xl rounded-2xl px-4 py-3 font-light backdrop-blur-xl shadow-sm border 
                ${isUser
                    ? "bg-white/20 text-white border-white/20"
                    : isError
                        ? "bg-red-500/10 text-red-300 border-red-300/30"
                        : "bg-white/10 text-white border-white/20"
                }`}
            >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <div
                    className={`text-[11px] mt-2 ${isUser ? "text-white/60" : "text-white/50"
                        }`}
                >
                    {message.timestamp.toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
};
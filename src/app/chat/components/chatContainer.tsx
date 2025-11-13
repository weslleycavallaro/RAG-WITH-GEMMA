import { Message } from "@/types/chat";
import { useEffect, useRef } from "react";
import { MessageBubble } from "./messageBubble";
import { TypingIndicator } from "./typingIndicator";

interface ChatContainerProps {
    messages: Message[];
    isTyping: boolean;
    currentResponse: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
    messages,
    isTyping,
    currentResponse,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, currentResponse]);

    return (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 backdrop-blur-sm font-light text-white">
            {messages.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-xl font-light text-white mb-2">
                        Olá! Como posso ajudá-lo?
                    </h3>
                    <p className="text-white/60 font-extralight">
                        Faça uma pergunta sobre os documentos que você enviou
                    </p>
                </div>
            )}

            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}

            {(isTyping || currentResponse) && (
                <div className="flex justify-start">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 max-w-3xl shadow-sm">
                        {currentResponse ? (
                            <p className="text-white whitespace-pre-wrap font-light">
                                {currentResponse}
                            </p>
                        ) : (
                            <TypingIndicator />
                        )}
                    </div>
                </div>
            )}

            <div ref={scrollRef} />
        </div>
    );
};
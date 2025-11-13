import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    onSendMessage,
    disabled = false,
}) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage("");
        }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-none px-4 py-4">
            <div className="flex gap-3 items-end max-w-5xl mx-auto">
                <div className="flex-1">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={
                            disabled
                                ? "Aguarde a resposta..."
                                : "Digite sua pergunta..."
                        }
                        disabled={disabled}
                        rows={1}
                        className="w-full resize-none rounded-2xl border border-white/20 bg-white/10 text-white placeholder-white/50 px-4 py-3 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent disabled:opacity-40 disabled:cursor-not-allowed font-light"
                        style={{
                            minHeight: "3rem",
                            maxHeight: "8rem",
                        }}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = "auto";
                            target.style.height =
                                Math.min(target.scrollHeight, 128) + "px";
                        }}
                    />
                </div>

                <button
                    onClick={handleSend}
                    disabled={!message.trim() || disabled}
                    className="bg-white/10 text-white p-3 rounded-2xl border border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 backdrop-blur-lg"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                    </svg>
                </button>
            </div>

            <div className="mt-2 text-xs text-white/50 text-center font-light">
                Faça perguntas sobre os documentos enviados
            </div>
        </div>
    );
};
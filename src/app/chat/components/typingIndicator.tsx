export const TypingIndicator = () => {
    return (
        <div className="flex items-center space-x-2 px-3 py-2">
            <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
            </div>
            <span className="text-white/70 text-sm font-light">IA está digitando...</span>
        </div>
    );
};
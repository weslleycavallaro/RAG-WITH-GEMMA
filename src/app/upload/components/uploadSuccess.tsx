interface UploadSuccessProps {
    result: {
        documentId: string;
        chunksCount: number;
    };
    onStartChat: () => void;
    onUploadAnother: () => void;
}

export const UploadSuccess: React.FC<UploadSuccessProps> = ({
    result,
    onStartChat,
    onUploadAnother,
}) => {
    return (
        <div className="text-center space-y-6">

            <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Upload Realizado com Sucesso!
                </h2>
                <p className="text-white">
                    Seu documento foi processado e dividido em{' '}
                    <strong>{result.chunksCount}</strong> partes para melhor indexação.
                </p>
            </div>

            <div className="flex gap-3 justify-center">
                <button
                    onClick={onStartChat}
                        className="flex-1 border border-white/40 text-white rounded-2xl font-light text-lg hover:bg-white/10 transition-all backdrop-blur-sm py-3 px-6"
                >
                    Começar a Conversar
                </button>

                <button
                    onClick={onUploadAnother}
                        className="px-6 py-3 border  border-white/40 text-white rounded-2xl font-light text-lg hover:bg-white/10 transition-all backdrop-blur-none"
                >
                    Enviar Outro Documento
                </button>
            </div>
        </div>

    )
}
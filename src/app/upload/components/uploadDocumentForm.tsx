import { uploadDocument } from '@/services/api';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadDocumentFormProps {
    onSuccess: (result: any) => void;
    onError: (error: string) => void;
    isUploading: boolean;
    setIsUploading: (loading: boolean) => void;
}

export const UploadDocumentForm: React.FC<UploadDocumentFormProps> = ({
    onSuccess,
    onError,
    isUploading,
    setIsUploading,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
        maxFiles: 1,
    });

    const handleSubmit = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        try {
            const result = await uploadDocument(selectedFile);
            onSuccess(result.data);
        } catch (error: any) {
            onError(error.response?.data?.message || 'Erro ao fazer upload do documento');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive
                    ? 'border-blue-400 bg-blue-50'
                    : selectedFile
                        ? 'border-white/40 hover:border-green-400 '
                        : 'border-white/40 hover:border-blue-400'
                    }`}
            >
                <input {...getInputProps()} />

                {selectedFile ? (
                    <div className="space-y-3">
                        <div className="text-6xl">📄</div>
                        <div>
                            <p className="text-lg font-semibold text-white">
                                Arquivo selecionado:
                            </p>
                            <p className="text-white">{selectedFile.name}</p>
                            <p className="text-sm text-white">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="text-6xl">📁</div>
                        <div>
                            <p className="text-lg font-semibold text-white">
                                {isDragActive
                                    ? 'Solte o arquivo aqui...'
                                    : 'Arraste um arquivo ou clique para selecionar'}
                            </p>
                            <p className="text-white">
                                Suportados: PDF, DOC, DOCX (máx. 10MB)
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {selectedFile && (
                <div className="flex gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={isUploading}
                        className="flex-1 border border-white/40 text-white rounded-2xl font-light text-lg hover:bg-white/10 transition-all backdrop-blur-sm py-3 px-6"
                    >
                        {isUploading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processando...
                            </span>
                        ) : (
                            'Fazer Upload'
                        )}
                    </button>

                    <button
                        onClick={() => setSelectedFile(null)}
                        className="px-6 py-3 border  border-white/40 text-white rounded-2xl font-light text-lg hover:bg-white/10 transition-all backdrop-blur-none"
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
};
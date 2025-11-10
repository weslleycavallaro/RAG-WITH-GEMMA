'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadDocumentForm } from './components/uploadDocumentForm';
import { UploadSuccess } from './components/uploadSuccess';

interface UploadResult {
  documentId: string;
  chunksCount: number;
}

const UploadPage = () => {
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUploadSuccess = (result: UploadResult) => {
    setUploadResult(result);
    setError(null);
  };

  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage);
    setUploadResult(null);
  };

  const handleStartChat = () => {
    router.push('/chat');
  };

  const handleUploadAnother = () => {
    setUploadResult(null);
    setError(null);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-20"
      style={{
        backgroundImage: "url('/images/image.png')",
        fontFamily:
          "SF Pro Display, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div className="max-w-2xl w-full text-center text-white">

        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight drop-shadow-sm">
            Upload de Documentos
          </h1>
          <p className="text-lg md:text-xl mt-4 font-extralight tracking-wide text-white/80">
            Envie seus documentos PDF ou Word para criar uma base de conhecimento
          </p>
        </div>

        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10">
          {error && (
            <div className="mb-8 p-4 backdrop-blur-sm bg-red-500/10 border border-red-400/30 rounded-2xl text-left">
              <div className="text-red-300 text-sm font-light">
                <strong className="font-medium text-red-200">Erro:</strong> {error}
              </div>
            </div>
          )}

          {uploadResult ? (
            <UploadSuccess
              result={uploadResult}
              onStartChat={handleStartChat}
              onUploadAnother={handleUploadAnother}
            />
          ) : (
            <UploadDocumentForm
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
            />
          )}
        </div>

        <p className="mt-10 text-white/50 text-sm font-extralight tracking-wide">
          Seus dados permanecem locais e seguros. <br />
        </p>
      </div>
    </div>
  );
};

export default UploadPage;
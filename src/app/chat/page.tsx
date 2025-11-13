'use client'

import { Message } from '@/types/chat';
import { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { ChatContainer } from './components/chatContainer';
import { ChatInput } from './components/chatInput';

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const { socket, isConnected } = useSocket();
  const [currentProvider, setCurrentProvider] = useState('gemma');

  useEffect(() => {
    if (!socket) return;

    socket.on('messageToken', (data: { token: string; timestamp: Date; sessionId: string; provider?: string }) => {
      console.log('Received token:', data.token, 'from', data.provider);
      setCurrentResponse(prev => prev + data.token);
      if (data.provider) {
        setCurrentProvider(data.provider);
      }
    });

    socket.on('messageComplete', (data: { message?: string; timestamp: Date; sessionId: string; provider?: string }) => {
      console.log('Message complete:', data);

      const finalMessage = currentResponse || data.message || '';

      if (finalMessage) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            content: finalMessage,
            sender: 'bot',
            timestamp: new Date(),
            provider: data.provider || currentProvider,
          }
        ]);
      }

      setCurrentResponse('');
      setIsTyping(false);
    });

    socket.on('botTyping', (typing: boolean) => {
      console.log('Bot typing:', typing);
      setIsTyping(typing);
      if (typing) {
        setCurrentResponse('');
      }
    });

    socket.on('error', (data: { message: string }) => {
      console.error('Socket error:', data);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: data.message,
          sender: 'bot',
          timestamp: new Date(),
          isError: true,
        }
      ]);
      setIsTyping(false);
      setCurrentResponse('');
    });

    return () => {
      socket.off('messageToken');
      socket.off('messageComplete');
      socket.off('botTyping');
      socket.off('error');
    };
  }, [socket, currentResponse, currentProvider]);

  const sendMessage = (content: string) => {
    if (!socket || !isConnected) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentResponse('');

    socket.emit('sendMessage', {
      message: content,
      sessionId: socket.id,
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage: "url('/images/image.png')",
        fontFamily:
          "SF Pro Display, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >

      <header className="w-full max-w-5xl mb-8 backdrop-blur-sm border border-white/40 rounded-2xl shadow-md p-4 flex items-center justify-between text-white">
        <h1 className="text-2xl md:text-3xl font-light tracking-tight">
          Chat com Gemma 3
        </h1>
        <div className="flex items-center gap-2 text-sm">
          <div
            className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'
              }`}
          ></div>
          <span className="text-white/70">
            {isConnected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>
      </header>

      <div className="flex-1 w-full max-w-5xl flex flex-col backdrop-blur-sm  border border-white/40 rounded-3xl shadow-2xl overflow-hidden">
        <ChatContainer
          messages={messages}
          isTyping={isTyping}
          currentResponse={currentResponse}
        />

        <div className="border-t border-white/20">
          <ChatInput
            onSendMessage={sendMessage}
            disabled={!isConnected || isTyping}
          />
        </div>
      </div>

      <p className="mt-8 text-white/50 text-sm font-extralight tracking-wide">
        Powered by Gemma 3
      </p>
    </div>
  );
};

export default ChatPage;
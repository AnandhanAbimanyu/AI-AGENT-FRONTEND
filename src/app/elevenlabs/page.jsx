'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';
import ChatInput from '@/components/elevenlabs/ChatInput';
import ChatMessages from '@/components/elevenlabs/ChatMessages';

export default function OpenAIPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(null);

const handleSend = async (message) => {
  setLoading(true);
  setLoadingType('audio'); // since only audio is supported

  try {
    // Show user message
    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        content: message,
        mediaType: 'text',
      },
    ]);

    const response = await fetch('http://localhost:3002/elevenlabsai/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
    });

    // ✅ Get audio blob and convert to playable URL
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);

    // Add audio message
    setMessages(prev => [
      ...prev,
      {
        type: 'ai',
        content: audioUrl,
        mediaType: 'audio',
      },
    ]);
  } catch (error) {
    console.error('Error:', error);
    setMessages(prev => [
      ...prev,
      {
        type: 'ai',
        content: 'Sorry, there was an error processing your request.',
        mediaType: 'text',
      },
    ]);
  }

  setLoading(false);
  setLoadingType(null);
};

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">ElevenLabs AI</h1>
        <div className="bg-white rounded-lg shadow-xl p-6">
          <ChatMessages
            messages={messages} 
            loading={loading}
            loadingType={loadingType}
          />
          <ChatInput onSend={handleSend} disabled={loading} />
        </div>
      </div>
    </Layout>
  );
}

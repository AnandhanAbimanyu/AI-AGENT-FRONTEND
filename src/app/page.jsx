'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import ChatInput from '@/components/openAi/ChatInput';
import ChatMessages from '@/components/openAi/ChatMessages';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (message, type) => {
    setLoading(true);
    try {
      let response;
      switch(type) {
        case 'text':
          response = await fetch('http://localhost:3002/openai/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
          });
          break;
        case 'image':
          response = await fetch('http://localhost:3002/openai/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: message })
          });
          break;
        case 'audio':
          response = await fetch('http://localhost:3002/openai/api/generate-audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: message })
          });
          break;
      }
      
      const data = await response.json();
      setMessages(prev => [...prev, {
        type: 'user',
        content: message
      }, {
        type: 'ai',
        content: data.response || data.imageUrl || data.audioUrl,
        mediaType: type
      }]);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">AI Chat Assistant</h1>
        <div className="bg-white rounded-lg shadow-xl p-6">
          <ChatMessages messages={messages} />
          <ChatInput onSend={handleSend} disabled={loading} />
        </div>
      </div>
    </Layout>
  );
}

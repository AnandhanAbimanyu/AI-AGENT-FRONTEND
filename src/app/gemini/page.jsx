'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';
import ChatInput from '@/components/gemini/ChatInput';
import ChatMessages from '@/components/gemini/ChatMessages';

export default function OpenAIPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(null);

const handleSend = async (message, type) => {
  
  setLoading(true);
  setLoadingType(type);

  try {
    let endpoint;
    switch (type) {
      case 'image':
        endpoint = '/geminiai/api/generate-image';
        break;
      case 'audio':
        endpoint = '/geminiai/api/generate-audio';
        break;
      case 'ppt':
        endpoint = '/geminiai/api/generate-ppt';
        break;
      case 'pdf':
        endpoint = '/geminiai/api/generate-pdf';
        break;
      case 'doc':
        endpoint = '/geminiai/api/generate-doc';
        break;
      case 'excel':
        endpoint = '/geminiai/api/generate-excel';
        break;
      default:
        endpoint = '/geminiai/api/chat';
    }

    // Add user message immediately
    setMessages(prev => [...prev, {
      type: 'user',
      content: message,
      mediaType: 'text'
    }]);

    const response = await fetch(`http://localhost:3002${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });

    const data = await response.json();

    if (type === 'text') {
      const aiMessage = data.generatedText || 'Sorry, I could not generate a response.';
      setMessages(prev => [...prev, {
        type: 'ai',
        content: aiMessage,
        mediaType: 'text'
      }]);
    } else if (type === 'audio') {
      setMessages(prev => [...prev,
        {
          type: 'ai',
          content: data.response,
          mediaType: 'text'
        },
        {
          type: 'ai',
          content: data.audioUrl,
          mediaType: 'audio'
        }
      ]);
    } else if (type === 'image') {
      setMessages(prev => [...prev,
        {
          type: 'ai',
          content: data.imageUrl,
          mediaType: 'image'
        }
      ]);
    } else {
      // Handle document types (ppt, pdf, doc, excel)
      setMessages(prev => [...prev,
        {
          type: 'ai',
          preview: data.preview,
          downloadUrl: data.documentUrl,
          mediaType: type
        }
      ]);
    }
  } catch (error) {
    console.error('Error:', error);
    setMessages(prev => [...prev, {
      type: 'ai',
      content: 'Sorry, there was an error processing your request.',
      mediaType: 'text'
    }]);
  }

  setLoading(false);
  setLoadingType(null);
};

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gemini AI</h1>
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

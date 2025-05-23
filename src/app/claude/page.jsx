'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';
import ChatInput from '@/components/claude/ChatInput';
import ChatMessages from '@/components/claude/ChatMessages';
import API from "@/utils/API";

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
        endpoint = '/claudeai/api/generate-image';
        break;
      case 'audio':
        endpoint = '/claudeai/api/generate-audio';
        break;
      case 'ppt':
        endpoint = '/claudeai/api/generate-ppt';
        break;
      case 'pdf':
        endpoint = '/claudeai/api/generate-pdf';
        break;
      case 'doc':
        endpoint = '/claudeai/api/generate-doc';
        break;
      case 'excel':
        endpoint = '/claudeai/api/generate-excel';
        break;
      default:
        endpoint = '/claudeai/api/chat';
    }

    // Add user message immediately
    setMessages(prev => [...prev, {
      type: 'user',
      content: message,
      mediaType: 'text'
    }]);

    const response = await fetch(`${API.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });

    const data = await response.json();
    console.log("data",data);
    
    if (type === 'text') {
      const aiMessage = data.response || 'Sorry, I could not generate a response.';
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
        <h1 className="text-4xl font-bold mb-8">Claude AI</h1>
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

'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';
import ChatInput from '@/components/skyreels/ChatInput';
import ChatMessages from '@/components/skyreels/ChatMessages';
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
          endpoint = '/skyreels/api/generate-image';
          break;
        case 'video':
          endpoint = '/skyreels/api/generate-video';
          break;
        case 'audio':
          endpoint = '/skyreels/api/generate-audio';
          break;
        case 'ppt':
          endpoint = '/skyreels/api/generate-ppt';
          break;
        case 'pdf':
          endpoint = '/skyreels/api/generate-pdf';
          break;
        case 'doc':
          endpoint = '/skyreels/api/generate-doc';
          break;
        case 'excel':
          endpoint = '/skyreels/api/generate-excel';
          break;
        default:
          endpoint = '/skyreels/api/chat';
      }

      // Add user message
      setMessages(prev => [...prev, {
        type: 'user',
        content: message,
        mediaType: 'text'
      }]);

      const response = await fetch(`${API.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message })
      });

      const data = await response.json();

      if (type === 'text') {
        const aiMessage = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
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
      } else if (type === 'video') {
        const videoUrl = data?.data?.output || 'Video URL not available';
        setMessages(prev => [...prev,
            {
            type: 'ai',
            content: videoUrl,
            mediaType: 'video'
            }
       ]);
      } else {
        // Other document types
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
        <h1 className="text-4xl font-bold mb-8">Skyreels AI</h1>
        <div className="bg-white rounded-lg shadow-xl p-6">
             {/* In progress... */}
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

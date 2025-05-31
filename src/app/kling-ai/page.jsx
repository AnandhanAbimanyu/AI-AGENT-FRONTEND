//kling-ai/page.jsx
'use client';
import axios from 'axios';
import Layout from '@/components/Layout';
import { useState, useRef, useEffect } from 'react';
import ChatInput from '@/components/klingai/ChatInput';
import ChatMessages from '@/components/klingai/ChatMessages';
import API from "@/utils/API";

export default function OpenAIPage() {
  const wakeLockRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(null);
  const [progress, setProgress] = useState(0);

  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      }
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
  };

  const releaseWakeLock = async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
  };

  useEffect(() => {
    // Re-acquire wake lock if tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && loading) {
        requestWakeLock();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      releaseWakeLock();
    };
  }, [loading]);

const handleSend = async (message, type) => {
  setLoading(true);
  setLoadingType(type);
  await requestWakeLock(); // Request wake lock when loading starts
  //  startSimulatedProgress(); // Start fake progress before API call
   setProgress(1);
  try {
    let endpoint;
    switch (type) {
      case 'textToImage':
        endpoint = '/klingai/api/text-to-image';
        break;
      case 'textToVideo':
        endpoint = '/klingai/api/text-to-video';
        break;
      case 'imageToVideo':
        endpoint = '/klingai/api/image-to-video';
        break;
      default:
        endpoint = '/klingai/api/chat';
    }

    // Add user message immediately
    setMessages(prev => [...prev, {
      type: 'user',
      content: message,
      mediaType: 'text'
    }]);

    // const response = await fetch(`${API.BASE_URL}${endpoint}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ prompt: message }),
    // });

    // const data = await response.json();
    const response = await axios.post(
  `${API.BASE_URL}${endpoint}`,
  { prompt: message },
  {
    headers: {
      'Content-Type': 'application/json',
    },
      }
    );
    const data = response.data;
    setProgress(100);
   if (type === 'textToVideo') {
    if (data.task_status === 'succeed') {
        const videoUrl = data?.task_result?.videos?.[0]?.url;
        if (videoUrl) {
          setMessages(prev => [
            ...prev,
            {
              type: 'ai',
              content: videoUrl,
              mediaType: 'video'
            }
          ]);
        } else {
          setMessages(prev => [
            ...prev,
            {
              type: 'ai',
              content: 'Sorry, no video was returned.',
              mediaType: 'text'
            }
          ]);
        }
      } else if (data.task_status === 'pending') {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: 'The video is being processed. Please wait...',
          mediaType: 'text'
        }]);
      }
    } else if (type === 'textToImage'){
      // Handle document types (ppt, pdf, doc, excel)
      setMessages(prev => [...prev,
        {
          type: 'ai',
          preview: data.preview,
          downloadUrl: data.documentUrl,
          mediaType: 'image'
        }
      ]);
    } else if (type === 'imageToVideo'){
      // Handle document types (ppt, pdf, doc, excel)
      setMessages(prev => [...prev,
        {
          type: 'ai',
          preview: data.preview,
          downloadUrl: data.documentUrl,
          mediaType: 'video'
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
    setProgress(0);
  }

  setLoading(false);
  setLoadingType(null);
  await releaseWakeLock();
};

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Kling AI</h1>
        <div className="bg-white rounded-lg shadow-xl p-6">
          <ChatMessages 
            messages={messages} 
            loading={loading}
            loadingType={loadingType}
            progress={progress}
          />
          <ChatInput onSend={handleSend} disabled={loading} />
        </div>
      </div>
    </Layout>
  );
}

'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';
import ChatInput from '@/components/openAi/ChatInput';
import ChatMessages from '@/components/openAi/ChatMessages';

export default function OpenAIPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(null);

//   const handleSend = async (message, type) => {
//     setLoading(true);
//     setLoadingType(type);
    
//     try {
//       let endpoint;
//       switch(type) {
//         case 'image':
//           endpoint = '/openai/api/generate-image';
//           break;
//         case 'audio':
//           endpoint = '/openai/api/generate-audio';
//           break;
//         case 'ppt':
//           endpoint = '/openai/api/generate-ppt';
//           break;
//         case 'pdf':
//           endpoint = '/openai/api/generate-pdf';
//           break;
//         case 'doc':
//           endpoint = '/openai/api/generate-doc';
//           break;
//         case 'excel':
//           endpoint = '/openai/api/generate-excel';
//           break;
//         default:
//           endpoint = '/openai/api/chat';
//       }

//       // Add user message immediately
//       setMessages(prev => [...prev, {
//         type: 'user',
//         content: message,
//         mediaType: 'text'
//       }]);

//       if (type === 'text') {
//         // Add placeholder for streaming text
//         setMessages(prev => [...prev, {
//           type: 'ai',
//           content: '',
//           mediaType: 'text',
//           isStreaming: true
//         }]);

//         const response = await fetch(`http://localhost:3002${endpoint}`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ text: message })
//         });

//         const reader = response.body.getReader();
//         const decoder = new TextDecoder('utf-8');
//         let accumulatedText = '';
//         let partialLine = '';

//         while (true) {
//             const { value, done } = await reader.read();
//             if (done) break;

//             const chunk = decoder.decode(value, { stream: true });
//             partialLine += chunk;

//             const lines = partialLine.split('\n\n');

//             for (let i = 0; i < lines.length - 1; i++) {
//             const line = lines[i].trim();
//             if (line.startsWith('data: ')) {
//                 const content = line.slice(6);
//                 if (content === '[DONE]') continue;
//                 accumulatedText += content;

//                 setMessages(prev => prev.map(msg =>
//                 msg.isStreaming ? { ...msg, content: accumulatedText } : msg
//                 ));
//             }
//             }

//             partialLine = lines[lines.length - 1];
//         }

//         setMessages(prev => prev.map(msg => 
//           msg.isStreaming ? { ...msg, isStreaming: false } : msg
//         ));

//       } else {
//         const response = await fetch(`http://localhost:3002${endpoint}`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ text: message })
//         });
        
//         const data = await response.json();
        
//         if (type === 'audio') {
//           setMessages(prev => [...prev, 
//             {
//               type: 'ai',
//               content: data.response,
//               mediaType: 'text'
//             },
//             {
//               type: 'ai',
//               content: data.audioUrl,
//               mediaType: 'audio'
//             }
//           ]);
//         } else if (type === 'image') {
//           setMessages(prev => [...prev,
//             {
//               type: 'ai',
//               content: data.imageUrl,
//               mediaType: 'image'
//             }
//           ]);
//         } else {
//           // Handle document types (ppt, pdf, doc, excel)
//           setMessages(prev => [...prev,
//             {
//               type: 'ai',
//               preview: data.preview,
//               downloadUrl: data.documentUrl,
//               mediaType: type
//             }
//           ]);
//         }
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => [...prev, {
//         type: 'ai',
//         content: 'Sorry, there was an error processing your request.',
//         mediaType: 'text'
//       }]);
//     }
//     setLoading(false);
//     setLoadingType(null);
//   };

  const handleSend = async (message, type) => {
    setLoading(true);
    setLoadingType(type);
    
    try {
      let endpoint;
      switch(type) {
        case 'image':
          endpoint = '/openai/api/generate-image';
          break;
        case 'audio':
          endpoint = '/openai/api/generate-audio';
          break;
        case 'ppt':
          endpoint = '/openai/api/generate-ppt';
          break;
        case 'pdf':
          endpoint = '/openai/api/generate-pdf';
          break;
        case 'doc':
          endpoint = '/openai/api/generate-doc';
          break;
        case 'excel':
          endpoint = '/openai/api/generate-excel';
          break;
        default:
          endpoint = '/openai/api/chat';
      }

      // Add user message immediately
      setMessages(prev => [...prev, {
        type: 'user',
        content: message,
        mediaType: 'text'
      }]);

      if (type === 'text') {
        const response = await fetch(`http://localhost:3002${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: message })
        });

        const data = await response.json();

        // Assuming response format: { choices: [{ message: { content: "..." } }] }
        const aiText = data.choices?.[0]?.message?.content || 'No response received.';

        setMessages(prev => [...prev, {
            type: 'ai',
            content: aiText,
            mediaType: 'text'
        }]);

      } else {
        const response = await fetch(`http://localhost:3002${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: message })
        });
        
        const data = await response.json();
        
        if (type === 'audio') {
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
        <h1 className="text-4xl font-bold mb-8">OpenAI Integration</h1>
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

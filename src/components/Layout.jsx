import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { title: 'OpenAI API', path: '/openai', description: 'Text, Image, and Audio Generation' },
    { title: 'Grok (X AI)', path: '/grok', description: 'X\'s AI Assistant' },
    { title: 'Claude (Anthropic)', path: '/claude', description: 'Advanced Language Model' },
    { title: 'ElevenLabs AI', path: '/elevenlabs', description: 'Voice Generation AI' },
    { title: 'Gemini AI', path: '/gemini', description: 'Google\'s Multimodal AI' },
    { title: 'Deepseek', path: '/deepseek', description: 'AI Research Assistant' },
    { title: 'King AI', path: '/king-ai', description: 'Video Generation AI' },
    { title: 'Redraft AI', path: '/redraft', description: 'Image Generation Specialist' },
    { title: 'Midjourney AI', path: '/midjourney', description: 'Creative Image Generation' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`bg-white shadow-lg ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out`}>
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 w-full text-left flex items-center"
          >
            {isSidebarOpen ? '← Collapse' : '→'}
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className=' cursor-pointer'
            >
              <div className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 cursor-pointer ${
                pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
              }`}>
                <div className={`${!isSidebarOpen ? 'hidden' : ''}`}>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </div>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

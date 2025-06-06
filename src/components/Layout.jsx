import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const aiMenuItems = [
    { title: 'OpenAI API', path: '/openai', description: 'Text, Image, and Audio Generation' },
    { title: 'Grok (X AI)', path: '/grok', description: "X's AI Assistant" },
    { title: 'Claude (Anthropic)', path: '/claude', description: 'Advanced Language Model' },
    { title: 'ElevenLabs AI', path: '/elevenlabs', description: 'Voice Generation AI' },
    { title: 'Gemini AI', path: '/gemini', description: "Google's Multimodal AI" },
    { title: 'Deepseek (In Progress)', path: '/deepseek', description: 'AI Research Assistant' },
    { title: 'Kling AI (In Progress)', path: '/kling-ai', description: 'Video Generation AI' },
    { title: 'Recraft AI (In Progress)', path: '/recraft', description: 'Image Generation Specialist' },
    { title: 'Midjourney AI (In Progress)', path: '/midjourney', description: 'Creative Image Generation' },
    { title: 'Skyreels AI (In Progress)', path: '/skyreels', description: 'Creative video Generation' },
  ];

  const socialMediaSignInItems = [
    { title: 'Google Sign In', path: '/social-signin/google', description: 'Sign in with Google' },
    { title: 'Facebook Sign In', path: '/social-signin/facebook', description: 'Sign in with Facebook' },
    { title: 'Twitter Sign In', path: '/social-signin/twitter', description: 'Sign in with Twitter' },
    { title: 'LinkedIn Sign In', path: '/social-signin/linkedin', description: 'Sign in with LinkedIn' },
    { title: 'GitHub Sign In', path: '/social-signin/github', description: 'Sign in with GitHub' },
    { title: 'Instagram Sign In', path: '/social-signin/instagram', description: 'Sign in with Instagram' },
    { title: 'Discord Sign In', path: '/social-signin/discord', description: 'Sign in with Discord' },
    { title: 'Microsoft Sign In', path: '/social-signin/microsoft', description: 'Sign in with Microsoft' },
    { title: 'Apple Sign In', path: '/social-signin/apple', description: 'Sign in with Apple' },
  ];

  const topNavItems = [
    { title: 'Agents', path: '/openai' },
    { title: 'Social Media Sign In', path: '/social-signin' },
    { title: 'Social Media Connect', path: '/social-connect' },
  ];

  // Determine which menu items to show based on the current path
  const getCurrentMenuItems = () => {
    if (pathname.startsWith('/social-signin')) {
      return socialMediaSignInItems;
    }
    return aiMenuItems;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-800">AI Agent Platform</span>
            </div>
            <nav className="flex space-x-4">
              {topNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-md font-medium ${
                    pathname === item.path || pathname.startsWith(item.path + '/')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
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
            {getCurrentMenuItems().map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className='cursor-pointer'
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
    </div>
  );
}

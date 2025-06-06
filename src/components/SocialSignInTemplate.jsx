'use client';

import { useState } from 'react';

export default function SocialSignInTemplate({ platform, icon, color }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    // TODO: Implement actual sign-in logic
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${color}`}>
            {icon}
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-8">Sign in with {platform}</h1>
        
        <div className="space-y-6">
          <div className="text-center text-gray-600 mb-8">
            Connect your {platform} account to access all features
          </div>

          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            } ${color}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </div>
            ) : (
              `Continue with ${platform}`
            )}
          </button>

          <div className="text-center text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
} 

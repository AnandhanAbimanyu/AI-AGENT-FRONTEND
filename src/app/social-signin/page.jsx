'use client';

import { FaGoogle, FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaDiscord, FaMicrosoft, FaApple } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

const providers = [
  { name: 'Google', icon: <FaGoogle className="text-red-500" />, provider: 'google', color: 'bg-red-100' },
  { name: 'Facebook', icon: <FaFacebook className="text-blue-600" />, provider: 'facebook', color: 'bg-blue-100' },
  { name: 'Twitter', icon: <FaTwitter className="text-blue-400" />, provider: 'twitter', color: 'bg-blue-50' },
  { name: 'LinkedIn', icon: <FaLinkedin className="text-blue-700" />, provider: 'linkedin', color: 'bg-blue-50' },
  { name: 'GitHub', icon: <FaGithub className="text-gray-800" />, provider: 'github', color: 'bg-gray-100' },
  { name: 'Instagram', icon: <FaInstagram className="text-pink-500" />, provider: 'instagram', color: 'bg-pink-100' },
  { name: 'Discord', icon: <FaDiscord className="text-indigo-500" />, provider: 'discord', color: 'bg-indigo-100' },
  { name: 'Microsoft', icon: <FaMicrosoft className="text-green-600" />, provider: 'microsoft', color: 'bg-green-100' },
  { name: 'Apple', icon: <FaApple className="text-black" />, provider: 'apple', color: 'bg-gray-200' },
];

export default function SocialSignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Sign in with Social Media</h2>
        <div className="grid grid-cols-1 gap-4">
          {providers.map(({ name, icon, provider, color }) => (
            <button
              key={provider}
              onClick={() => signIn(provider, { callbackUrl: '/dashboard' })}
              className={`flex items-center px-4 py-3 rounded-lg shadow hover:shadow-md transition bg-white border border-gray-200 hover:bg-gray-50`}
            >
              <span className={`w-10 h-10 flex items-center justify-center rounded-full mr-4 ${color}`}>
                {icon}
              </span>
              <span className="font-medium text-gray-800">Sign in with {name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

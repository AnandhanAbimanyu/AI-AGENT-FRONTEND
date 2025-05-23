import React from 'react';

export default function AIControls() {
  return (
    <div className="flex flex-wrap gap-2 my-4 p-4 bg-gray-50 rounded-lg">
      <div className="text-sm font-medium text-gray-700 w-full mb-2">
        Available AI Models:
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
          Text Generation (GPT-4)
        </button>
        <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200">
          Image Generation (DALL-E)
        </button>
        <button className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200">
          Audio Generation (TTS)
        </button>
      </div>
    </div>
  );
}

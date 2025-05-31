//components/klingai/ChatInput .jsx
import { useState } from 'react';

export default function ChatInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('textToVideo');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message, type);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          type="button"
          onClick={() => setType('textToVideo')}
          className={`px-3 py-1 rounded ${
            type === 'textToVideo' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Text to Video
        </button>
         <button
          type="button"
          onClick={() => setType('imageToVideo')}
          className={`px-3 py-1 rounded ${
            type === 'imageToVideo' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Image to Video
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Enter your ${type} prompt...`}
          className="flex-1 p-2 border rounded"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Send
        </button>
      </div>
    </form>
  );
}

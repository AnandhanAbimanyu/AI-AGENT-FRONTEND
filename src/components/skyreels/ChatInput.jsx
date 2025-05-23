import { useState } from 'react';

export default function ChatInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('video');

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
          onClick={() => setType('video')}
          className={`px-3 py-1 rounded ${
            type === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Video
        </button>
        {/* <button
          type="button"
          onClick={() => setType('text')}
          className={`px-3 py-1 rounded ${
            type === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Text
        </button>
        <button
          type="button"
          onClick={() => setType('image')}
          className={`px-3 py-1 rounded ${
            type === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Image
        </button>
        <button
          type="button"
          onClick={() => setType('audio')}
          className={`px-3 py-1 rounded ${
            type === 'audio' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Audio
        </button>
        <button
          type="button"
          onClick={() => setType('ppt')}
          className={`px-3 py-1 rounded ${
            type === 'ppt' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          PowerPoint
        </button>
        <button
          type="button"
          onClick={() => setType('pdf')}
          className={`px-3 py-1 rounded ${
            type === 'pdf' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          PDF
        </button>
        <button
          type="button"
          onClick={() => setType('doc')}
          className={`px-3 py-1 rounded ${
            type === 'doc' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Word Doc
        </button>
        <button
          type="button"
          onClick={() => setType('excel')}
          className={`px-3 py-1 rounded ${
            type === 'excel' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Excel
        </button> */}
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

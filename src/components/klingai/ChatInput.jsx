import { useState } from 'react';

export default function ChatInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('textToVideo');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'textToVideo' && message.trim()) {
      onSend(message, type);
      setMessage('');
    }

    if (type === 'imageToVideo' && message.trim() && imageFile) {
      // You could wrap both in an object if needed
      onSend({ prompt: message, file: imageFile }, type);
      setMessage('');
      setImageFile(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setMessage('');
    setImageFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          type="button"
          onClick={() => handleTypeChange('textToVideo')}
          className={`px-3 py-1 rounded ${
            type === 'textToVideo' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Text to Video
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('imageToVideo')}
          className={`px-3 py-1 rounded ${
            type === 'imageToVideo' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Image to Video
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {/* Prompt input for both types */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            type === 'imageToVideo'
              ? 'Enter your image-to-video prompt...'
              : 'Enter your text prompt...'
          }
          className="p-2 border rounded"
          disabled={disabled}
        />

        {/* File input only for imageToVideo */}
        {type === 'imageToVideo' && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border rounded"
            disabled={disabled}
          />
        )}

        <button
          type="submit"
          disabled={
            disabled ||
            (type === 'textToVideo' && !message.trim()) ||
            (type === 'imageToVideo' && (!message.trim() || !imageFile))
          }
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Send
        </button>
      </div>
    </form>
  );
}

import Markdown from "react-markdown";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
export default function ChatMessages({ messages, loading, loadingType }) {
     const formatMessageContent = (content) => {
    // Split content into words and join with proper spacing
    return content
      .split(/\s+/)
      .filter(word => word.length > 0)
      .join(' ');
  };
  console.log("messages",messages);
  
  return (
    <div className="space-y-4 mb-4 h-[600px] overflow-y-auto">
       {messages.length === 0 && !loading && (
        <div className="flex justify-center items-center h-full">
          <div className="text-center">
            <img
              src="https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif" // Replace with any other image/gif if desired
              alt="Start chatting"
              className="mx-auto mb-4 h-80 object-contain rounded-lg"
            />
            <p className="text-gray-500">Start a conversation to get a response.</p>
          </div>
        </div>
      )}
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.type === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {message.mediaType === 'image' ? (
              <img src={message.content} alt="AI Generated" className="rounded" />
            ) : message.mediaType === 'audio' ? (
              <div className="audio-player">
                <audio controls preload="auto" className="w-full">
                  <source src={message.content} type="audio/mpeg" />
                  <source src={message.content} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <a
                  href={message.content}
                  download="generated-audio.mp3"
                  className="text-sm text-blue-500 hover:text-blue-700 mt-2 block"
                >
                  Download Audio
                </a>
              </div>
            ) : ['ppt', 'pdf', 'doc', 'excel'].includes(message.mediaType) ? (
              <div className="document-content">
                <div className="bg-white p-4 rounded shadow">
                  <div dangerouslySetInnerHTML={{ __html: message.preview }} />
                </div>
                <a 
                href={`http://localhost:3002/uploads/${message.downloadUrl.split('/').pop()}`}
                download={`document.${message.mediaType}`}
                className="text-sm text-blue-500 hover:text-blue-700 mt-2 block"
                target="_blank"
                rel="noopener noreferrer"
                >
                Download {message.mediaType.toUpperCase()}
                </a>

              </div>
            ) : (
                <>{message.isStreaming ? (
                <pre className="whitespace-pre-wrap">{message.content}</pre>
                ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                </ReactMarkdown>
                )}
                </>
            )}
          </div>
        </div>
      ))}
      
      {loading && !messages.some(m => m.isStreaming) && (
        <div className="flex justify-start">
          <div className="max-w-[70%] rounded-lg p-3 bg-gray-200">
            {loadingType === 'image' ? (
              <div className="animate-pulse flex space-x-4">
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
              </div>
            ) : loadingType === 'audio' ? (
              <div className="animate-pulse flex space-x-4">
                <div className="h-12 w-full bg-gray-300 rounded"></div>
              </div>
            ) : ['ppt', 'pdf', 'doc', 'excel'].includes(loadingType) ? (
              <div className="animate-pulse flex flex-col space-y-2">
                <div className="h-8 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            ) : (
              <div className="animate-pulse flex space-x-4">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

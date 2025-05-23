import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessages({ messages, loading, loadingType }) {
  const formatMessageContent = (content) =>
    content
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .join(" ");

  return (
    <div className="space-y-4 mb-4 h-[600px] overflow-y-auto p-2">
      {messages.length === 0 && !loading && (
        <div className="flex justify-center items-center h-full">
          <div className="text-center">
            <img
              src="https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif" // Replace with any other image/gif if desired
              alt="Start chatting"
              className="mx-auto mb-4 h-80 object-contain rounded-lg"
            />
            <p className="text-gray-500">
              Start a conversation to get a response.
            </p>
          </div>
        </div>
      )}

      {messages.map((msg, idx) => (
        <div key={idx} className="mb-4">
          {msg.mediaType === "text" && <p>{msg.content}</p>}
          {msg.mediaType === "image" && (
            <img src={msg.content} alt="Generated" className="rounded-md" />
          )}
          {msg.mediaType === "audio" && <audio controls src={msg.content} />}
          {msg.mediaType === "video" && (
            <video controls width="100%" className="rounded-lg shadow-md">
              <source src={msg.content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {/* Add other file types if needed */}
        </div>
      ))}

      {/* Loader when waiting for response */}
      {loading && !messages.some((m) => m.isStreaming) && (
        <div className="flex justify-start">
          <div className="max-w-[70%] rounded-lg p-3 bg-gray-200">
            {loadingType === "image" ? (
              <div className="animate-pulse flex space-x-4">
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
              </div>
            ) : loadingType === "audio" ? (
              <div className="animate-pulse flex space-x-4">
                <div className="h-12 w-full bg-gray-300 rounded"></div>
              </div>
            ) : ["ppt", "pdf", "doc", "excel"].includes(loadingType) ? (
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

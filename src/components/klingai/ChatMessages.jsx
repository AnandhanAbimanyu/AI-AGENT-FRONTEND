import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessages({
  messages,
  loading,
  loadingType,
  progress,
}) {
  const formatMessageContent = (content) =>
    content
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .join(" ");

useEffect(()=>{
console.log("progress",progress);

},[progress])
  return (
    <div className="space-y-4 mb-4 h-[600px] overflow-y-auto p-2">
      {messages.length === 0 && !loading && (
        <div className="flex justify-center items-center h-full">
          <div className="text-center">
            <img
              src="https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif"
              alt="Start chatting"
              className="mx-auto mb-4 h-80 object-contain rounded-lg"
            />
            <p className="text-gray-500">
              Start a conversation to get a response.
            </p>
          </div>
        </div>
      )}

      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.type === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.type === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {/* Media handling */}
            {message.mediaType === "image" ? (
              <img
                src={message.content}
                alt="AI Generated"
                className="rounded"
              />
            ) : message.mediaType === "video" ? (
              <video
                controls
                className="rounded max-w-full"
                src={message.content}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                {message.isStreaming ? (
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

      {/* Loader when waiting for response */}
      {/* <div className="flex justify-start">
        <div className="max-w-[70%] rounded-lg p-3 bg-gray-200">
          <figure className="w-full max-w-sm">
            <div className="relative w-full h-6 rounded-full bg-gray-300 overflow-hidden">
              <div
                className="bg-[#1263A3] h-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>

              <div className="absolute inset-0 flex items-center justify-center text-green-500 text-sm font-bold">
                {progress === 100 ? "Complete" : `${progress}%`}
              </div>
            </div>
          </figure>
          <div className="animate-pulse flex space-x-4 h-48">
            <div className="w-full aspect-video bg-gray-300 rounded justify-center items-center flex">
              {" "}
              Video genration is progress...please wait....
            </div>
          </div>
        </div>
      </div> */}
      {loading && !messages.some((m) => m.isStreaming) && (
        <div className="flex justify-start">
          <div className="max-w-[70%] rounded-lg p-3 bg-gray-200">
            {loadingType === "textToImage" ? (
              <div className="animate-pulse flex space-x-4">
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
              </div>
            ) : loadingType === "audio" ? (
              <div className="animate-pulse flex space-x-4">
                <div className="h-12 w-full bg-gray-300 rounded"></div>
              </div>
            ) : loadingType === "textToVideo" ? (
              <>
                {/* <figure className="w-full max-w-sm">
                  <div className="relative w-full h-6 rounded-full bg-gray-300 overflow-hidden">
                    <div
                      className="bg-[#1263A3] h-full transition-all duration-300 ease-in-out"
                      style={{ width: `${progress}%` }}
                    ></div>

                    <div className="absolute inset-0 flex items-center justify-center text-green-500 text-sm font-bold">
                      {progress === 100 ? "Complete" : `${progress}%`}
                    </div>
                  </div>
                </figure> */}
                <div className="animate-pulse flex space-x-4 h-48">
                  <div className="w-full aspect-video bg-gray-300 rounded justify-center items-center flex">
                    {" "}
                    Video genration is progress...please wait....<br/>
                    Don't reload the page or close the tab.
                  </div>
                </div>
              </>
            ) : loadingType === "imageToVideo" ? (
              <div className="animate-pulse flex space-x-4">
                <div className="w-full aspect-video bg-gray-300 rounded"></div>
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

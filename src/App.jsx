import React, { useState, useRef, useEffect } from 'react';

const FigmaEmbedMessaging = () => {
  const [messages, setMessages] = useState([]);
  const iframeRef = useRef(null);

  const figmaEmbedUrl =
    'https://embed.figma.com/proto/pdKpMrVMX40A4EA49YZmHj?node-id=3217-16226&t&embed-host=Usabilty-app-User&client-id=6knLu1M0cUGYDmjdT8qHAW';

  useEffect(() => {
    // Listen for messages from Figma embed
    const handleMessage = (event) => {
      // Security check - make sure message is from Figma
      if (
        event.origin !== 'https://www.figma.com' &&
        event.origin !== 'https://embed.figma.com'
      ) {
        return;
      }

      console.log('Received message from Figma:', event.data);

      // Add received message to the list
      setMessages((prev) => [
        ...prev,
        {
          type: 'received',
          data: event.data,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Figma Prototype with Message Logging
          </h1>
          <p className="text-gray-600">
            Monitor messages received from Figma prototype interactions
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Figma Embed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Figma Prototype</h2>
              <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  ref={iframeRef}
                  src={figmaEmbedUrl}
                  width="100%"
                  height="600"
                  className="border-0"
                  allowFullScreen
                  title="Figma prototype"
                />
              </div>
            </div>
          </div>

          {/* Message Logging Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Message Log</h2>
                <button
                  onClick={clearMessages}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  Clear
                </button>
              </div>

              {/* Message History */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">
                      <svg
                        className="w-12 h-12 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.93 8.93 0 01-4.906-1.502c-.664-.35-1.423-.508-2.094-.508-1.106 0-2 .895-2 2 0 0 0 0 0 0v1a2 2 0 002 2h6v-4a8 8 0 0016-8z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">
                      No messages received yet
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Interact with the prototype to see messages
                    </p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-medium text-blue-700 text-sm">
                            Message #{index + 1}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs">
                          {msg.timestamp}
                        </span>
                      </div>

                      <div className="bg-white rounded p-3 border">
                        <pre className="whitespace-pre-wrap text-gray-700 text-xs overflow-x-auto">
                          {JSON.stringify(msg.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Count */}
              {messages.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Total messages received:{' '}
                    <span className="font-semibold text-blue-600">
                      {messages.length}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigmaEmbedMessaging;

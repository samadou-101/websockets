import { useRef, useState, useEffect, ChangeEvent } from "react";
import { Send, Menu, MoreVertical } from "lucide-react";

const ChatContainer = () => {
  const [message, setMessage] = useState<string>(""); // The message being typed by the user
  const [messages, setMessages] = useState<{ text: string; own: boolean }[]>(
    [],
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const connection = useRef<WebSocket | null>(null);

  // Function to send the message
  const sendMessage = () => {
    if (connection.current && message.trim()) {
      // Send the message over the WebSocket
      connection.current.send(message);

      // Update state to add the new sent message (own message)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, own: true },
      ]);
      setMessage(""); // Clear the message input after sending
    }
  };

  // WebSocket connection setup
  useEffect(() => {
    // Initialize WebSocket connection
    connection.current = new WebSocket("ws://localhost:3000");

    // When the connection opens, log it
    connection.current.onopen = () => {
      console.log("Connected to the server");
    };

    // When a message is received from the server, update the state
    connection.current.onmessage = (event: MessageEvent) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: event.data, own: false },
      ]);
      console.log("Received from server:", event.data);
    };

    // Cleanup WebSocket when the component is unmounted
    return () => {
      if (connection.current) {
        connection.current.close();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Type for the change event on the input field
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white p-4 shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <Menu size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div>
                <h1 className="font-semibold text-gray-800">Team Chat</h1>
                <p className="text-sm text-gray-500">3 members • Active now</p>
              </div>
            </div>
          </div>
          <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="mx-auto w-full max-w-4xl flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`${
                msg.own ? "ml-auto bg-red-300" : "mr-auto bg-blue-300"
              } w-fit p-2`}
            >
              {msg.text}
            </div>
          );
        })}
      </div>

      {/* Input Box */}
      <div className="border-t bg-white p-4">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <input
            type="text"
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 p-3 placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none"
          />
          <button
            className="flex items-center justify-center rounded-full bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700"
            onClick={sendMessage}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;

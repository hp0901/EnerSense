import { useState, useEffect } from "react";
import { Zap, X } from "lucide-react";
import { sendChatbotMessage } from "../services/operations/chatbotApi";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userMsg, setUserMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // 👋 Show welcome hint for few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async () => {
    if (!userMsg.trim() || loading) return;

    const currentMsg = userMsg;

    // Clear input immediately
    setUserMsg("");
    setLoading(true);

    // Add user message first
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: currentMsg },
    ]);

    try {
      const reply = await sendChatbotMessage(currentMsg);

      // Add bot reply
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply },
      ]);
    } catch (error) {
      // Error fallback message
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, I couldn’t respond right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 💬 Welcome Hint */}
      {!isOpen && showHint && (
        <div className="fixed bottom-20 right-6 z-50 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm">
          Hey 👋 Need help with electricity usage?
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white rotate-45" />
        </div>
      )}

      {/* ⚡ Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl transition-transform active:scale-95"
        >
          <Zap size={26} />
        </button>
      )}

      {/* 💬 Chat Window */}
      {isOpen && (
        <div
          className="
            fixed bottom-5 right-5 z-50
            w-[90vw] sm:w-80
            h-[70vh] sm:h-[450px]
            bg-white rounded-2xl shadow-xl
            flex flex-col overflow-hidden
          "
        >
          {/* Header */}
          <div className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2">
              <Zap size={18} /> EnerSense Assistant
            </span>
            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm break-words ${
                  msg.sender === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "mr-auto bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="mr-auto bg-gray-200 px-3 py-2 rounded-lg text-sm animate-pulse">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2">
            <input
              type="text"
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about electricity usage..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

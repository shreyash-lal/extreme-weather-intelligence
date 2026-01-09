import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AIChatbot = ({ show, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi 👋 I am your AI Disaster Assistant. Ask me anything about weather, safety, or emergencies.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await window.puter.ai.chat(input, {
        model: "gemini-3-flash-preview",
      });

      const aiText =
        response?.message?.content || "Sorry, I couldn't understand that.";

      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "AI service unavailable right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            x: window.innerWidth >= 768 ? -300 : 0,
            y: window.innerWidth < 768 ? 200 : 0,
          }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{
            opacity: 0,
            x: window.innerWidth >= 768 ? -300 : 0,
            y: window.innerWidth < 768 ? 200 : 0,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="
            fixed z-50 bg-white shadow-2xl rounded-2xl
            w-[92vw] max-w-[420px]
            bottom-4 left-1/2 -translate-x-1/2
            md:bottom-4 md:left-4 md:translate-x-0
            flex flex-col h-[70vh] max-h-[520px]
          "
        >
          {/* HEADER */}
          <div className="flex justify-between items-center px-4 py-3 bg-green-600 text-white rounded-t-2xl">
            <h3 className="font-semibold">Nova AI</h3>
            <button
              onClick={onClose}
              className="text-xl hover:scale-110 transition"
            >
              ✕
            </button>
          </div>

          {/* CHAT BODY */}
          <div
            className="
              flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50
              scrollbar-thin scrollbar-thumb-gray-300
            "
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] break-words whitespace-pre-wrap px-3 py-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-green-600 text-white"
                    : "mr-auto bg-white text-gray-800 shadow"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-gray-400">AI is typing...</div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="flex items-center border-t px-3 py-2 bg-white rounded-b-2xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              className="
                flex-1 px-3 py-2 text-sm border rounded-md outline-none
                focus:ring-2 focus:ring-green-500
              "
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatbot;

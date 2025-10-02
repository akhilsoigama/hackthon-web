import { useState, FormEvent } from "react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { messagesAtom, Message } from "../atoms/chatBotAtom";
import { useAtom } from "jotai";
import api from "../lib/apiInstance";

const ChatbotPage = () => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [loading,setloader] = useState(false);
  const [input, setInput] = useState("");

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]); // Optimistic update
    setInput("");
    setloader(true);

    try {
      const res = await api.post("/chatbot", {
        messages: [
          ...messages.map((m) => ({ role: m.sender, content: m.text })),
          { role: "user", content: input },
        ],
      });

      const botMessageRaw = res.data.choices?.[0]?.message;

      if (botMessageRaw?.role === "assistant") {
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: botMessageRaw.content,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("No assistant message returned");
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, sender: "bot", text: "Something went wrong!" },
      ]);
    } finally {
      setloader(false);
    }
  };

  return (
    <motion.div
      className="bg-gray-50 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-screen w-full bg-white rounded-lg shadow-md flex flex-col h-[83vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Header */}
        <motion.div
          className="px-6 py-4 border-b bg-blue-600 text-white rounded-t-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-xl font-bold flex items-center">
            <FaRobot className="mr-2" /> Chatbot Assistant
          </h1>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.3,
                  delay: index === messages.length - 1 ? 0 : 0,
                }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <FaRobot className="mt-1 text-gray-500 flex-shrink-0" />
                  )}
                  <span>{msg.text}</span>
                  {msg.sender === "user" && (
                    <FaUser className="mt-1 text-white flex-shrink-0" />
                  )}
                </div>
              </motion.div>
            ))}
            {/* Loader / Typing indicator */}
            {loading && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center space-x-2 max-w-xs px-4 py-2 rounded-lg shadow text-sm bg-gray-200 text-gray-800 rounded-bl-none">
                  <FaRobot className="mt-1 text-gray-500 flex-shrink-0 animate-pulse" />
                  <span>Typing...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            type="submit"
            className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane className="mr-2" /> Send
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ChatbotPage;

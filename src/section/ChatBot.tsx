import { useState, FormEvent, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaTimes, FaExpand, FaCompress } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { messagesAtom, Message } from "../atoms/chatBotAtom";
import { useAtom } from "jotai";
import api from "../utils/axios";

const ChatbotPage = () => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [loading, setloader] = useState(false);
  const [input, setInput] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [suggestedQuestions] = useState([
    "How can I improve my grades?",
    "What's the deadline for assignments?",
    "How do I submit my homework?",
    "Can you explain this topic?",
  ]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e?: FormEvent, suggestedText?: string) => {
    if (e) e.preventDefault();
    
    const messageText = suggestedText || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setloader(true);

    try {
      const res = await api.post("/chatbot", {
        messages: [
          ...messages.map((m) => ({ role: m.sender, content: m.text })),
          { role: "user", content: messageText },
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
        { 
          id: Date.now() + 2, 
          sender: "bot", 
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment." 
        },
      ]);
    } finally {
      setloader(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div
      className={`bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 ${
        isFullscreen ? "fixed inset-0 z-50" : "min-h-screen"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={` rounded-2xl shadow-2xl flex flex-col backdrop-blur-sm bg-white/95 ${
          isFullscreen ? "w-full h-full" : "w-full max-w-4xl h-[85vh]"
        }`}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Enhanced Header */}
        <motion.div
          className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <motion.div
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaRobot className="text-2xl" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">Study Assistant</h1>
                <p className="text-blue-100 text-sm">Always here to help with your studies</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </motion.button>
              <motion.button
                onClick={clearChat}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Messages Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/50"
        >
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <FaRobot className="text-4xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome to Study Assistant! 👋
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                I'm here to help you with your studies, assignments, and any questions you might have about your courses.
              </p>
              
              {/* Suggested Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSend(undefined, question)}
                    className="p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                        <FaPaperPlane className="text-blue-600 text-xs" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{question}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

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
                  delay: index === messages.length - 1 ? 0.1 : 0,
                }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`flex items-start space-x-3 max-w-[85%] md:max-w-[70%] ${
                  msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.sender === "user" 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600" 
                      : "bg-gradient-to-r from-gray-500 to-gray-600"
                  }`}>
                    {msg.sender === "user" ? (
                      <FaUser className="text-white text-xs" />
                    ) : (
                      <FaRobot className="text-white text-xs" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <motion.div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className={`prose prose-sm max-w-none ${
                      msg.sender === "user" ? "prose-invert" : ""
                    }`}>
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0 leading-relaxed">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-2 list-disc list-inside space-y-1">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-2 list-decimal list-inside space-y-1">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="leading-relaxed">{children}</li>
                          ),
                          code: ({ children }) => (
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto text-sm my-2">
                              {children}
                            </pre>
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {loading && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3 max-w-[70%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-600">
                    <FaRobot className="text-white text-xs" />
                  </div>
                  <motion.div
                    className="px-4 py-3 rounded-2xl shadow-sm bg-white border border-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Input Area */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-gray-200 bg-white rounded-b-2xl"
        >
          <div className="flex flex-col space-y-3">
            {/* Quick Actions */}
            {messages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 2).map((question, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => handleSend(undefined, question)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors duration-200 border border-blue-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            )}
            
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about your studies..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ⏎
                </div>
              </div>
              <motion.button
                disabled={loading || !input.trim()}
                type="submit"
                className={`flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  loading || !input.trim()
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                }`}
                whileHover={!(loading || !input.trim()) ? { scale: 1.05 } : {}}
                whileTap={!(loading || !input.trim()) ? { scale: 0.95 } : {}}
              >
                {loading ? (
                  <ImSpinner2 className="animate-spin text-xl" />
                ) : (
                  <FaPaperPlane className="text-lg" />
                )}
              </motion.button>
            </div>
            
            {/* Helper Text */}
            <p className="text-xs text-gray-500 text-center">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ChatbotPage;
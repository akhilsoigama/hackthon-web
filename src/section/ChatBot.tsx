import { useState, FormEvent } from 'react';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'bot', text: 'Hello! I am your assistant who is still in development phase :)' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulated bot reply
    setTimeout(() => {
      const botReply: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: "i am just a prototype model!",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
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
                transition={{ duration: 0.3, delay: index === messages.length - 1 ? 0 : 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.sender === 'bot' && <FaRobot className="mt-1 text-gray-500 flex-shrink-0" />}
                  <span>{msg.text}</span>
                  {msg.sender === 'user' && <FaUser className="mt-1 text-white flex-shrink-0" />}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t flex items-center space-x-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
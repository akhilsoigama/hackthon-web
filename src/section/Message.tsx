import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Messages = () => {
  useEffect(() => {
    console.log('Messages page loaded');
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <motion.header
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-sm text-gray-500 mt-1">Check your messages</p>
      </motion.header>

      <motion.section
        className="p-4 bg-white rounded-lg border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-gray-600">This is the Messages page. Add a messaging interface here.</p>
      </motion.section>
    </div>
  );
};

export default Messages;
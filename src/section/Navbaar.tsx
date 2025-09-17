import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Navbaar = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-white">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 p-2 md:p-4 w-full min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Navbaar;
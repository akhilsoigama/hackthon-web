import { useState, useEffect, useRef} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink} from 'react-router-dom';

interface Notification {
  id: number;
  text: string;
  time: string;
  read: boolean;
}

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfile = (): void => setIsProfileOpen(!isProfileOpen);
  const toggleSearch = (): void => setIsSearchOpen(!isSearchOpen);
  const toggleNotificationPanel = (): void => setShowNotificationPanel(!showNotificationPanel);

  const notifications: Notification[] = [
    { id: 1, text: 'New mathematics lesson available', time: '10 mins ago', read: false },
    { id: 2, text: 'Your assignment was graded', time: '2 hours ago', read: false },
    { id: 3, text: 'Live session starting soon', time: '5 hours ago', read: true },
  ];

  const unreadCount: number = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-2 rounded-lg mr-2 sm:mr-3 shadow-md">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14L21 9L12 4L3 9L12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14L18.159 10.578C18.7016 11.946 19 13.441 19 15C19 18.866 15.866 22 12 22C8.134 22 5 18.866 5 15C5 13.441 5.298 11.946 5.841 10.578" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
              Digital Nabha Shiksha
            </h1>
            <p className="text-xs text-blue-200 hidden sm:block">Empowering Education</p>
          </div>
        </motion.div>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isSearchOpen ? (
              <motion.div
                className="flex items-center bg-white rounded-full shadow-lg pl-3 pr-2 py-1 w-40 sm:w-64 md:w-80"
                initial={{ width: 40 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  placeholder="Search lessons..."
                  className="w-full bg-transparent border-none text-gray-800 focus:outline-none focus:ring-0 text-sm"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={toggleSearch}
                  className="ml-2 p-1 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ) : (
              <motion.button
                onClick={toggleSearch}
                className="p-2 rounded-full bg-blue-800 hover:bg-blue-900 transition-colors shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
            )}
          </motion.div>

          <motion.div
            className="relative"
            ref={notificationRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={toggleNotificationPanel}
              className="p-2 rounded-full relative bg-blue-800 hover:bg-blue-900 transition-colors shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 10-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.053-.595 1.436L2 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-xs rounded-full"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>
            <AnimatePresence>
              {showNotificationPanel && (
                <motion.div
                  className="absolute right-0 mt-3 w-64 sm:w-80 bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                    <h3 className="font-semibold">Notifications</h3>
                    <p className="text-xs text-blue-200">{unreadCount} unread</p>
                  </div>
                  <div className="max-h-64 sm:max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 sm:p-4 border-b border-gray-100 hover:bg-blue-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
                        <p className="text-xs sm:text-sm">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-gray-50 text-center">
                    <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Mark all as read
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="relative"
            ref={profileRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={toggleProfile}
              className="flex items-center space-x-2 sm:space-x-3 focus:outline-none p-2 rounded-xl hover:bg-blue-800 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                  alt="User"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="font-medium text-sm sm:text-base">Alex Johnson</p>
                <p className="text-xs text-blue-200">Student</p>
              </div>
              <motion.div
                animate={{ rotate: isProfileOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  className="absolute right-0 mt-3 w-48 sm:w-56 bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden py-2"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-sm sm:text-base">Alex Johnson</p>
                    <p className="text-xs text-gray-500">alex.j@example.com</p>
                  </div>
                  <NavLink
                    to="/profile"
                    className="flex items-center px-4 py-2 sm:py-3 hover:bg-blue-50 transition-colors text-sm sm:text-base"
                    onClick={toggleProfile}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="flex items-center px-4 py-2 sm:py-3 hover:bg-blue-50 transition-colors text-sm sm:text-base"
                    onClick={toggleProfile}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </NavLink>
                  <div className="border-t border-gray-100 my-2"></div>
                  <NavLink
                    to="/logout"
                    className="flex items-center px-4 py-2 sm:py-3 hover:bg-red-50 text-red-600 transition-colors text-sm sm:text-base"
                    onClick={toggleProfile}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </NavLink>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
export default Header;
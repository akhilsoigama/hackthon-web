import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  FiBookOpen,
  FiSearch,
  FiX,
  FiBell,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiWifiOff,
  FiGlobe
} from 'react-icons/fi';

interface Notification {
  id: number;
  text: string;
  time: string;
  read: boolean;
}

interface HeaderProps {
  toggleMobileSidebar: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const Header = ({ toggleMobileSidebar }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
  const [showLanguagePanel, setShowLanguagePanel] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
  ];

  useEffect(() => {
    const loadData = async () => {
      if (isOnline) {
        try {
          // Simulated API fetch (replace with your API endpoint)
          const fetchedProfile: UserProfile = {
            name: 'Alex Johnson',
            email: 'alex.j@example.com',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
          };
          const fetchedNotifications: Notification[] = [
            { id: 1, text: 'New mathematics lesson available', time: '10 mins ago', read: false },
            { id: 2, text: 'Your assignment was graded', time: '2 hours ago', read: false },
            { id: 3, text: 'Live session starting soon', time: '5 hours ago', read: true },
          ];
          setUserProfile(fetchedProfile);
          setNotifications(fetchedNotifications);
          localStorage.setItem('userProfile', JSON.stringify(fetchedProfile));
          localStorage.setItem('notifications', JSON.stringify(fetchedNotifications));
        } catch (error) {
          console.error('Failed to fetch data:', error);
          const cachedProfile = localStorage.getItem('userProfile');
          const cachedNotifications = localStorage.getItem('notifications');
          if (cachedProfile) {
            setUserProfile(JSON.parse(cachedProfile));
          }
          if (cachedNotifications) {
            setNotifications(JSON.parse(cachedNotifications));
          }
        }
      } else {
        const cachedProfile = localStorage.getItem('userProfile');
        const cachedNotifications = localStorage.getItem('notifications');
        if (cachedProfile) {
          setUserProfile(JSON.parse(cachedProfile));
        }
        if (cachedNotifications) {
          setNotifications(JSON.parse(cachedNotifications));
        }
      }
    };
    loadData();
  }, [isOnline]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationPanel(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguagePanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfile = (): void => setIsProfileOpen(!isProfileOpen);
  const toggleSearch = (): void => setIsSearchOpen(!isSearchOpen);
  const toggleNotificationPanel = (): void => setShowNotificationPanel(!showNotificationPanel);
  const toggleLanguagePanel = (): void => setShowLanguagePanel(!showLanguagePanel);

  const handleLanguageChange = (code: string): void => {
    setCurrentLanguage(code);
    setShowLanguagePanel(false);
    // Here you would typically update the application language
  };

  const unreadCount: number = notifications.filter(n => !n.read).length;
  const currentLanguageObj = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <header className="bg-white text-gray-800 p-2 sm:p-4 sticky top-0 z-30 shadow-md border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={toggleMobileSidebar}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm border border-gray-300 lg:hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMenu className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gray-600" />
          </motion.button>
          <div className="p-1 rounded-lg mr-1 sm:mr-3 shadow-sm border border-gray-200">
            <FiBookOpen className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl md:text-2xl font-bold text-blue-700">
              EduHub
            </h1>
            <p className="text-[10px] text-gray-500 hidden xs:block">Empowering Education</p>
          </div>
        </motion.div>

        <div className="flex items-center space-x-1 sm:space-x-3 md:space-x-4">
          {/* Search Button */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isSearchOpen ? (
              <motion.div
                className="flex items-center bg-gray-100 rounded-full shadow-sm pl-2 pr-1.5 py-1 w-28 xs:w-40 sm:w-48 md:w-64 lg:w-80 border border-gray-300"
                initial={{ width: 32 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  placeholder={isOnline ? 'Search lessons...' : 'Search cached lessons...'}
                  className="w-full bg-transparent border-none text-gray-800 focus:outline-none focus:ring-0 text-xs sm:text-sm"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={toggleSearch}
                  className="ml-1 p-1 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <FiX className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                onClick={toggleSearch}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm border border-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSearch className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gray-600" />
              </motion.button>
            )}
          </motion.div>

          {/* Language Selector */}
          <motion.div
            className="relative"
            ref={languageRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.button
              onClick={toggleLanguagePanel}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm border border-gray-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGlobe className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gray-600" />
            </motion.button>
            <AnimatePresence>
              {showLanguagePanel && (
                <motion.div
                  className="absolute right-0 mt-2 w-36 sm:w-40 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 z-40"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 sm:p-3 border-b border-gray-200 bg-gray-50">
                    <h3 className="font-semibold text-xs sm:text-sm">Select Language</h3>
                  </div>
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors flex items-center ${currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : ''}`}
                        onClick={() => handleLanguageChange(language.code)}
                      >
                        <span className="mr-2">{language.nativeName}</span>
                        <span className="text-[10px] sm:text-xs text-gray-500">({language.name})</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Notifications */}
          <motion.div
            className="relative"
            ref={notificationRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <motion.button
              onClick={toggleNotificationPanel}
              className="p-1 rounded-full relative bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm border border-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiBell className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gray-600" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 bg-red-500 text-white text-[9px] xs:text-xs rounded-full"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>
            <AnimatePresence>
              {showNotificationPanel && (
                <motion.div
                  className="absolute right-0 mt-2 w-56 xs:w-64 sm:w-72 md:w-80 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 z-40"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 sm:p-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="font-semibold text-xs sm:text-base">Notifications</h3>
                    <p className="text-[10px] sm:text-xs text-gray-500">{unreadCount} unread</p>
                  </div>
                  <div className="max-h-40 sm:max-h-64 md:max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-2 sm:p-3 md:p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <p className="text-xs sm:text-sm">{notification.text}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 sm:p-3 md:p-4 text-center text-xs sm:text-sm text-gray-500">
                        No notifications available
                      </div>
                    )}
                  </div>
                  <div className="p-2 sm:p-3 bg-gray-50 text-center">
                    <button
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
                      disabled={!isOnline}
                      onClick={() => {
                        if (isOnline) {
                          const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
                          setNotifications(updatedNotifications);
                          localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
                        }
                      }}
                    >
                      Mark all as read
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* User Profile */}
          <motion.div
            className="relative"
            ref={profileRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <motion.button
              onClick={toggleProfile}
              className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 focus:outline-none p-1 rounded-lg md:rounded-xl hover:bg-gray-100 transition-colors border border-gray-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative">
                <img
                  src={userProfile?.avatar || 'https://via.placeholder.com/100'}
                  alt="User"
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border-2 border-white shadow-sm"
                />
                <span
                  className={`absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-white ${
                    isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                ></span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="font-medium text-xs sm:text-sm md:text-base">
                  {userProfile?.name || 'Guest'}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">{isOnline ? 'Super Admin' : 'Offline'}</p>
              </div>
              <motion.div
                animate={{ rotate: isProfileOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-gray-600" />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-40 xs:w-48 sm:w-52 md:w-56 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden py-1.5 sm:py-2 border border-gray-200 z-40"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-3 py-2 sm:px-4 sm:py-3 border-b border-gray-100">
                    <p className="font-semibold text-xs sm:text-sm md:text-base">
                      {userProfile?.name || 'Guest'}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      {userProfile?.email || 'No email available'}
                    </p>
                    {!isOnline && (
                      <p className="text-[10px] sm:text-xs text-red-500 flex items-center">
                        <FiWifiOff className="w-3 h-3 mr-1" />
                        Offline
                      </p>
                    )}
                  </div>
                  <NavLink
                    to="/profile"
                    className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base"
                    onClick={toggleProfile}
                  >
                    <FiUser className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-500" />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base"
                    onClick={toggleProfile}
                  >
                    <FiSettings className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-500" />
                    Settings
                  </NavLink>
                  <div className="border-t border-gray-100 my-1 sm:my-2"></div>
                  <NavLink
                    to="/logout"
                    className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-red-50 text-red-600 transition-colors text-xs sm:text-sm md:text-base"
                    onClick={toggleProfile}
                  >
                    <FiLogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
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
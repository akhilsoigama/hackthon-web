import { AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import { modules } from "../routers/ModulePath";
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';

interface SidebarProps {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

const Sidebar = ({ isMobileOpen, toggleMobileSidebar }: SidebarProps) => {
  const [expandedLink, setExpandedLink] = useState<string | null>(null);
  const [expandedSubLink, setExpandedSubLink] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleSidebar = (): void => {
    setIsSidebarExpanded(prev => !prev);
    if (isSidebarExpanded) {
      setExpandedLink(null);
      setExpandedSubLink(null);
    }
  };

  const toggleLink = (to: string): void => {
    if (expandedLink === to) {
      setExpandedLink(null);
    } else {
      setExpandedLink(to);
    }
    setExpandedSubLink(null);
  };

  const toggleSubLink = (to: string): void => {
    if (expandedSubLink === to) {
      setExpandedSubLink(null);
    } else {
      setExpandedSubLink(to);
    }
  };

  const handleLinkClick = () => {
    if (isMobile) {
      toggleMobileSidebar();
    }
  };

  return (
    <>
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-md bg-gray-100/30 bg-opacity-40 z-50 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      <motion.aside
        className={`h-screen fixed lg:sticky backdrop-blur-md top-0 flex flex-col transition-all duration-300 ease-in-out overflow-y-auto scrollbar-hide ${!isMobile?'overflow-hidden':'overflow-x-auto'} shadow-lg z-50
          ${isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}
        style={{ 
          width: isSidebarExpanded ? (window.innerWidth >= 1024 ? '18rem' : '16rem') : 
                 (window.innerWidth >= 640 ? '5rem' : '4rem') 
        }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <AnimatePresence>
            {isSidebarExpanded && (
              <motion.h2
                className="text-xl font-bold text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Dashboard
              </motion.h2>
            )}
          </AnimatePresence>
          
          {/* Close button for mobile */}
          {isMobile && (
            <button
              onClick={toggleMobileSidebar}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors lg:hidden"
            >
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          {/* Toggle sidebar button for desktop */}
          {!isMobile && (
            <motion.button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden lg:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isSidebarExpanded ? (
                <FiX className="w-5 h-5 text-gray-600" />
              ) : (
                <FiMenu className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-4">
          {modules.map((module: any, moduleIndex: any) => (
            <motion.div
              key={module.moduleName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: moduleIndex * 0.2, duration: 0.5 }}
            >
              <AnimatePresence>
                {isSidebarExpanded && (
                  <motion.h3
                    className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {module.moduleName}
                  </motion.h3>
                )}
              </AnimatePresence>
              {module.links.map((link: any, linkIndex: any) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (moduleIndex * 0.2) + (linkIndex * 0.1), duration: 0.5 }}
                >
                  {link.subLinks ? (
                    <button
                      onClick={() => toggleLink(link.to)}
                      className={`flex items-center p-3 rounded-lg transition-all duration-300 group w-full ${
                        expandedLink === link.to ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex-shrink-0 ">{link.icon}</div>
                      <AnimatePresence>
                        {isSidebarExpanded && (
                          <motion.span
                            className="ml-3 font-medium text-gray-900 flex-1 text-left"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {link.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {link.subLinks && isSidebarExpanded && (
                        <motion.div
                          className="ml-auto text-gray-600"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: expandedLink === link.to ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaChevronDown className="w-4 h-4" />
                        </motion.div>
                      )}
                      {!isSidebarExpanded && (
                        <div className="absolute left-14 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                          {link.label}
                        </div>
                      )}
                    </button>
                  ) : (
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg transition-all duration-300 group ${
                          isActive ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100 text-gray-700'
                        }`
                      }
                      onClick={handleLinkClick}
                    >
                      <div className="flex-shrink-0">{link.icon}</div>
                      <AnimatePresence>
                        {isSidebarExpanded && (
                          <motion.span
                            className="ml-3 font-medium text-gray-900 flex-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {link.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {!isSidebarExpanded && (
                        <div className="absolute left-14 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                          {link.label}
                        </div>
                      )}
                    </NavLink>
                  )}
                  {link.subLinks && expandedLink === link.to && isSidebarExpanded && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-6 space-y-1"
                      >
                        {link.subLinks.map((subLink: any) => (
                          <div key={subLink.label}>
                            {subLink.subLinks ? (
                              <button
                                onClick={() => toggleSubLink(subLink.to)}
                                className={`flex items-center p-2 pl-6 rounded-lg transition-all duration-300 w-full ${
                                  expandedSubLink === subLink.to ? 'bg-blue-50 text-blue-900' : 'hover:bg-gray-50 text-gray-600'
                                }`}
                              >
                                <div className="flex-shrink-0">{subLink.icon}</div>
                                <span className="ml-3 font-medium">{subLink.label}</span>
                                {subLink.subLinks && (
                                  <div className="ml-auto text-gray-600">
                                    {expandedSubLink === subLink.to ? (
                                      <FaChevronDown className="w-4 h-4" />
                                    ) : (
                                      <FaChevronRight className="w-4 h-4" />
                                    )}
                                  </div>
                                )}
                              </button>
                            ) : (
                              <NavLink
                                to={subLink.to}
                                className={({ isActive }) =>
                                  `flex items-center p-2 pl-6 rounded-lg transition-all duration-300 ${
                                    isActive ? 'bg-blue-50 text-blue-900' : 'hover:bg-gray-50 text-gray-600'
                                  }`
                                }
                                onClick={handleLinkClick}
                              >
                                <div className="flex-shrink-0">{subLink.icon}</div>
                                <span className="ml-3 font-medium">{subLink.label}</span>
                              </NavLink>
                            )}
                            {subLink.subLinks && expandedSubLink === subLink.to && (
                              <AnimatePresence>
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="ml-8 space-y-1"
                                >
                                  {subLink.subLinks.map((nestedSubLink: any) => (
                                    <NavLink
                                      key={nestedSubLink.label}
                                      to={nestedSubLink.to}
                                      className={({ isActive }) =>
                                        `flex items-center p-2 pl-6 rounded-lg transition-all duration-300 ${
                                          isActive ? 'bg-blue-50 text-blue-900' : 'hover:bg-gray-50 text-gray-600'
                                        }`
                                      }
                                      onClick={handleLinkClick}
                                    >
                                      <div className="flex-shrink-0">{nestedSubLink.icon}</div>
                                      <span className="ml-3 font-medium">{nestedSubLink.label}</span>
                                    </NavLink>
                                  ))}
                                </motion.div>
                              </AnimatePresence>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </nav>
        
        <motion.div
          className="p-4 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
              alt="User"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300"
            />
            <AnimatePresence>
              {isSidebarExpanded && (
                <motion.div
                  className="ml-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                  <p className="text-xs text-gray-500">Student</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
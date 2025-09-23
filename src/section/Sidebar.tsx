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
          className="fixed inset-0 backdrop-blur-md  bg-opacity-40 z-50 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      <motion.aside
        className={`h-screen fixed lg:sticky  top-0 flex flex-col transition-all duration-300 ease-in-out overflow-y-auto scrollbar-hide ${!isMobile ? 'overflow-hidden' : 'overflow-x-auto'} shadow-lg z-50
          ${isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}
        style={{
          width: isSidebarExpanded ? (window.innerWidth >= 1024 ? '18rem' : '16rem') :
            (window.innerWidth >= 640 ? '5rem' : '4rem')
        }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between ">
          <AnimatePresence>
            {isSidebarExpanded && (
              <motion.h2
                className="text-xl font-semibold text-gray-800 tracking-tight"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                aria-label="Dashboard title"
              >
                Dashboard
              </motion.h2>
            )}
          </AnimatePresence>

          {/* Mobile toggle button */}
          {isMobile && (
            <button
              onClick={toggleMobileSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors lg:hidden"
              aria-label="Close mobile sidebar"
              title="Close sidebar"
            >
              <FiX className="w-6 h-6 text-gray-600" />
            </button>
          )}

          {/* Desktop toggle button */}
          {!isMobile && (
            <motion.button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors hidden lg:block"
              whileHover={{ scale: 1.1, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
              title={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarExpanded ? (
                <FiX className="w-6 h-6 text-gray-600" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-600" />
              )}
            </motion.button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {modules.map((module: any, moduleIndex: any) => (
            <motion.div
              key={module.moduleName}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: moduleIndex * 0.15, duration: 0.4 }}
              className="group/module"
            >
              <AnimatePresence>
                {isSidebarExpanded && (
                  <motion.h3
                    className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {module.moduleName}
                  </motion.h3>
                )}
              </AnimatePresence>

              <div className="space-y-1">
                {module.links.map((link: any, linkIndex: any) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (moduleIndex * 0.15) + (linkIndex * 0.08),
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="relative"
                  >
                    {link.subLinks ? (
                      <div className="relative">
                        <button
                          onClick={() => toggleLink(link.to)}
                          className={`flex items-center p-3 rounded-xl transition-all duration-300 group w-full relative overflow-hidden ${expandedLink === link.to
                              ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm shadow-blue-100'
                              : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900 hover:shadow-sm'
                            } ${!isSidebarExpanded ? 'justify-center px-3' : ''
                            }`}
                        >
                          {/* Active indicator */}
                          {expandedLink === link.to && (
                            <motion.div
                              className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full"
                              layoutId="activeIndicator"
                            />
                          )}

                          <div className={`flex-shrink-0 transition-transform duration-300 ${expandedLink === link.to ? 'text-blue-500 scale-110' : 'text-gray-400'
                            } ${!isSidebarExpanded ? 'mx-auto' : ''}`}>
                            {link.icon}
                          </div>

                          <AnimatePresence>
                            {isSidebarExpanded && (
                              <motion.span
                                className="ml-3 font-medium flex-1 text-left"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {link.label}
                              </motion.span>
                            )}
                          </AnimatePresence>

                          {link.subLinks && isSidebarExpanded && (
                            <motion.div
                              className="ml-2 text-gray-400 transition-all duration-300"
                              animate={{ rotate: expandedLink === link.to ? 180 : 0 }}
                              transition={{ duration: 0.3, type: "spring" }}
                            >
                              <FaChevronDown className="w-3 h-3" />
                            </motion.div>
                          )}

                          {/* Tooltip for collapsed sidebar */}
                          {!isSidebarExpanded && (
                            <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 shadow-lg whitespace-nowrap">
                              <div className="font-medium">{link.label}</div>
                              {link.subLinks && (
                                <div className="text-xs text-gray-300 mt-1">
                                  {link.subLinks.length} items
                                </div>
                              )}
                            </div>
                          )}
                        </button>

                        {/* Sublinks dropdown */}
                        {link.subLinks && expandedLink === link.to && isSidebarExpanded && (
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0, height: 0, y: -10 }}
                              animate={{ opacity: 1, height: 'auto', y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -10 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-2"
                            >
                              {link.subLinks.map((subLink: any) => (
                                <div key={subLink.label} className="relative">
                                  {subLink.subLinks ? (
                                    <button
                                      onClick={() => toggleSubLink(subLink.to)}
                                      className={`flex items-center p-2 pl-4 rounded-lg transition-all duration-300 w-full group/sublink ${expandedSubLink === subLink.to
                                          ? 'bg-blue-25 text-blue-600'
                                          : 'hover:bg-gray-50 text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                      <div className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-md transition-colors ${expandedSubLink === subLink.to
                                          ? 'bg-blue-100 text-blue-600'
                                          : 'bg-gray-100 text-gray-400 group-hover/sublink:bg-gray-200'
                                        }`}>
                                        {subLink.icon || <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                      </div>

                                      <span className="ml-3 font-medium text-sm">{subLink.label}</span>

                                      {subLink.subLinks && (
                                        <motion.div
                                          className="ml-auto text-gray-400 transition-transform"
                                          animate={{ rotate: expandedSubLink === subLink.to ? 90 : 0 }}
                                        >
                                          <FaChevronRight className="w-2.5 h-2.5" />
                                        </motion.div>
                                      )}
                                    </button>
                                  ) : (
                                    <NavLink
                                      to={subLink.to}
                                      className={({ isActive }) =>
                                        `flex items-center p-2 pl-4 rounded-lg transition-all duration-300 group/sublink ${isActive
                                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                                          : 'hover:bg-gray-50 text-gray-500 hover:text-gray-700'
                                        }`
                                      }
                                      onClick={handleLinkClick}
                                    >
                                      <div className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-md transition-colors ${subLink.icon ? '' : 'bg-gray-100 group-hover/sublink:bg-gray-200'
                                        }`}>
                                        {subLink.icon || <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                      </div>

                                      <span className="ml-3 font-medium text-sm">{subLink.label}</span>
                                    </NavLink>
                                  )}

                                  {/* Nested sublinks */}
                                  {subLink.subLinks && expandedSubLink === subLink.to && (
                                    <AnimatePresence>
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-2"
                                      >
                                        {subLink.subLinks.map((nestedSubLink: any) => (
                                          <NavLink
                                            key={nestedSubLink.label}
                                            to={nestedSubLink.to}
                                            className={({ isActive }) =>
                                              `flex items-center p-2 pl-4 rounded-lg transition-all duration-300 text-sm group/nested ${isActive
                                                ? 'bg-blue-25 text-blue-600 font-medium'
                                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-25'
                                              }`
                                            }
                                            onClick={handleLinkClick}
                                          >
                                            <div className="flex-shrink-0 w-3 h-3 flex items-center justify-center">
                                              <div className="w-1 h-1 rounded-full bg-current opacity-60" />
                                            </div>
                                            <span className="ml-3">{nestedSubLink.label}</span>
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
                      </div>
                    ) : (
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          `flex items-center p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                            ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm shadow-blue-100'
                            : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900 hover:shadow-sm'
                          } ${!isSidebarExpanded ? 'justify-center px-3' : ''
                          }`
                        }
                        onClick={handleLinkClick}
                      >


                        <div className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${!isSidebarExpanded ? 'mx-auto' : ''
                          }`}>
                          {link.icon}
                        </div>

                        <AnimatePresence>
                          {isSidebarExpanded && (
                            <motion.span
                              className="ml-3 font-medium flex-1"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {link.label}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {!isSidebarExpanded && (
                          <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 shadow-lg whitespace-nowrap">
                            {link.label}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </motion.div>
                ))}
              </div>
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
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import { modules } from "../routers/ModulePath";
import { SidebarHeader, SidebarNav } from "../layouts/sidebar-section";


interface SidebarProps {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

const Sidebar = ({ isMobileOpen, toggleMobileSidebar }: SidebarProps) => {
  const [expandedLink, setExpandedLink] = useState<string | null>(null);
  const [expandedSubLink, setExpandedSubLink] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    // Auto-expand parent links based on the current route
    const currentPath = location.pathname;
    for (const module of modules) {
      for (const link of module.links) {
        if (link.subLinks && link.subLinks.some((sub: any) => currentPath.startsWith(sub.to))) {
          setExpandedLink(link.to);
          return;
        }
      }
    }
  }, [location.pathname]);

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
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-100 bg-opacity-75 z-50 lg:hidden"
            onClick={toggleMobileSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`h-screen fixed lg:sticky top-0 flex flex-col transition-all duration-300 overflow-y-auto scrollbar-hide ${!isMobile ? 'overflow-hidden' : 'overflow-x-auto'} shadow-lg z-50
          ${isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}
        style={{
          width: isSidebarExpanded ? (window.innerWidth >= 1024 ? '18rem' : '16rem') :
            (window.innerWidth >= 640 ? '5rem' : '4rem')
        }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SidebarHeader
          isSidebarExpanded={isSidebarExpanded}
          isMobile={isMobile}
          toggleMobileSidebar={toggleMobileSidebar}
          toggleSidebar={toggleSidebar}
        />

        <SidebarNav
          modules={modules}
          isSidebarExpanded={isSidebarExpanded}
          expandedLink={expandedLink}
          expandedSubLink={expandedSubLink}
          toggleLink={toggleLink}
          toggleSubLink={toggleSubLink}
          handleLinkClick={handleLinkClick}
          currentPath={location.pathname}
        />

      </motion.aside>
    </>
  );
};

export default Sidebar;
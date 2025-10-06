// components/Sidebar/ModuleSection.tsx
import { AnimatePresence } from "framer-motion";
import { motion } from 'framer-motion';
import NavigationLink from './nevigation-link';

interface ModuleSectionProps {
  module: any;
  moduleIndex: number;
  isSidebarExpanded: boolean;
  expandedLink: string | null;
  expandedSubLink: string | null;
  toggleLink: (to: string) => void;
  toggleSubLink: (to: string) => void;
  handleLinkClick: () => void;
  currentPath: string;
}

const ModuleSection = ({
  module,
  moduleIndex,
  isSidebarExpanded,
  expandedLink,
  expandedSubLink,
  toggleLink,
  toggleSubLink,
  handleLinkClick,
  currentPath
}: ModuleSectionProps) => {
  return (
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
          <NavigationLink
            key={link.label}
            link={link}
            moduleIndex={moduleIndex}
            linkIndex={linkIndex}
            isSidebarExpanded={isSidebarExpanded}
            expandedLink={expandedLink}
            expandedSubLink={expandedSubLink}
            toggleLink={toggleLink}
            toggleSubLink={toggleSubLink}
            handleLinkClick={handleLinkClick}
            currentPath={currentPath}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ModuleSection;
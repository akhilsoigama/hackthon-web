import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
  FiWifiOff,
} from "react-icons/fi";
import { toast } from "sonner";
import { endpoints } from "../../utils/axios";

interface UserProfileProps {
  userProfile: any;
  isOnline: boolean;
}

const UserProfile = ({ userProfile, isOnline }: UserProfileProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleProfile = (): void => setIsProfileOpen(!isProfileOpen);

  async function logoutHandler() {
    try {
      Cookies.remove("token");
      toast.success("Logout Successful");
      navigate(endpoints.auth.logout);
    } catch (err) {
      toast.error('${err}');
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
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
          <span className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-gray-500 text-white flex items-center justify-center font-semibold text-sm sm:text-base md:text-lg shadow-sm">
            {userProfile?.fullName.charAt(0).toUpperCase() || "@"}
          </span>
          <span
            className={`absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-white ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
        </div>
        <div className="text-left hidden sm:block">
          <p className="font-medium text-xs sm:text-sm md:text-base">
            {userProfile?.fullName || "Guest"}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500">
            {userProfile?.authType || "Guest"}
          </p>
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
                {userProfile?.fullName || "Guest"}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500">
                {userProfile?.email || "No email available"}
              </p>
              {!isOnline && (
                <p className="text-[10px] sm:text-xs text-red-500 flex items-center">
                  <FiWifiOff className="w-3 h-3 mr-1" />
                  Offline
                </p>
              )}
            </div>

            <NavLink
              to="#"
              className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base"
              onClick={toggleProfile}
            >
              <FiUser className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-500" />
              Profile
            </NavLink>

            <NavLink
              to="#"
              className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base"
              onClick={toggleProfile}
            >
              <FiSettings className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-500" />
              Settings
            </NavLink>

            <div className="border-t border-gray-100 my-1 sm:my-2"></div>

            <div
              className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-red-50 text-red-600 transition-colors text-xs sm:text-sm md:text-base"
              onClick={logoutHandler}
            >
              <FiLogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Logout
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserProfile;

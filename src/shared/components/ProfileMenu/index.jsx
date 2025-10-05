import { useState, useRef, useEffect } from "react";
import {FaUser, FaBox, FaTimesCircle, FaStar, FaSignOutAlt, FaUserCog,} from "react-icons/fa";
import useAuthStore from "../../../features/auth/store";
import { logoutHelper } from "../../../features/auth/utilities/auth";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    logoutHelper('/login'); 
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-6 h-6 lg:w-7 lg:h-7 flex items-center justify-center rounded-full bg-[#DB4444] shadow cursor-pointer"
        >
          <FaUser className="text-white text-xs lg:text-md" />
        </button>

      {open && (
  <div
    className="absolute right-0 mt-3 w-56 flex flex-col 
    rounded-2xl bg-gradient-to-br from-purple-800/30 via-purple-900/30 to-black/40
    backdrop-blur-md shadow-xl border border-purple-500/20 
    overflow-hidden animate-fadeIn"
  >
    <a
      href="#"
      className="flex items-center px-4 py-3 font-poppins font-sm text-[14px] text-white hover:bg-purple-700/30"
    >
      <FaUserCog className="mr-3" /> Manage My Account
    </a>
    <a
      href="#"
      className="flex items-center px-4 py-3 font-poppins font-sm text-[14px] text-white hover:bg-purple-700/30"
    >
      <FaBox className="mr-3" /> My Order
    </a>
    <a
      href="#"
      className="flex items-center px-4 py-3  font-poppins font-sm text-[14px] text-white hover:bg-purple-700/30"
    >
      <FaTimesCircle className="mr-3" /> My Cancellations
    </a>
    <a
      href="#"
      className="flex items-center px-4 py-3 text-white hover:bg-purple-700/30"
    >
      <FaStar className="mr-3" /> My Reviews
    </a>
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-3 text-white hover:bg-purple-700/30 w-full text-left"
    >
      <FaSignOutAlt className="mr-3" /> Logout
    </button>
  </div>
)}
    </div>
  );
}

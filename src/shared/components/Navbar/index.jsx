import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserWishlist } from "../../../features/whislist/hooks/useUserWishlist";
import { useUserCart } from "../../../features/cart/hooks/useUserCart";
import useAuthStore from "../../../features/auth/store";
import ProfileMenu from "../../../features/home/components/ProfileMenu";
import SearchModal from "../SearchModal";
import arrowIcon from "../../../assets/home-assets/arrow1.svg";
import searchIcon from "../../../assets/home-assets/seach.svg";
import wishlistIcon from "../../../assets/home-assets/WishlistIcon.svg";
import cartIcon from "../../../assets/home-assets/CartIcon.svg";

const Navbar = ({ hideIcons = false, hideUserIcon = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const location = useLocation();
  
  
  // Wishlist store
  const { getWishlistCount } = useUserWishlist();
  const wishlistCount = getWishlistCount();
  
  // Cart store
  const { getTotalItems } = useUserCart();
  const cartCount = getTotalItems();
  
  // Auth store
  const { isAuthenticated, user } = useAuthStore();
  
  // Console log for auth status
  if (isAuthenticated) {
  }



  // Listen for keyboard shortcut to open search
  useEffect(() => {
    const handleOpenSearch = () => {
      setIsSearchModalOpen(true);
    };

    document.addEventListener('openSearchModal', handleOpenSearch);
    return () => document.removeEventListener('openSearchModal', handleOpenSearch);
  }, []);

  return (
    <>
      {/* شريط الإعلان العلوي */}
      <motion.div 
        className="bg-black text-white w-full flex items-center sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
  <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-10 sm:h-12">
      
      {/* النص + زر Shop Now */}
      <div className="flex items-center gap-2 sm:gap-4 truncate">
        <span className="text-[10px] sm:text-xs md:text-sm lg:text-[14px] font-poppins font-normal whitespace-nowrap truncate">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>
        <Link
          to="/products"
          className="text-[10px] sm:text-xs md:text-sm font-poppins font-semibold underline hover:text-gray-300 transition-colors whitespace-nowrap"
        >
          Shop Now
        </Link>
      </div>

      {/* اختيار اللغة */}
      <div className="flex items-center">
        <p className="bg-black text-white text-[10px] sm:text-xs md:text-sm font-poppins border-none outline-none cursor-pointer">
          English
        </p>
        <img
          src={arrowIcon}
          alt="Arrow"
          className="ml-1 sm:ml-2 h-2 w-3"
        />
      </div>
    </div>
  </div>
</motion.div>

<motion.nav 
  className="border-b sticky top-10 z-40 bg-white"
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
>
  <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 overflow-x-visible">
    
    {/* شعار الموقع */}
    <motion.div 
      className="flex items-center"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
    >
      <Link to="/" className="flex-shrink-0">
        <motion.h1 
          className="text-2xl font-bold font-inter text-black"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Exclusive
        </motion.h1>
      </Link>
    </motion.div>

    {/* روابط النافبار */}
    <motion.div 
      className="hidden lg:flex items-center space-x-6"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
    >
      <Link
        to="/"
        className={`px-3 py-2 text-sm font-poppins font-medium transition-colors ${
          location.pathname === "/" 
            ? "text-black border-b-2 border-black" 
            : "text-gray-700 hover:text-black"
        }`}
      >
        Home
      </Link>
      <Link
        to="/contact"
        className={`px-3 py-2 text-sm font-poppins font-medium transition-colors ${
          location.pathname === "/contact" 
            ? "text-black border-b-2 border-black" 
            : "text-gray-700 hover:text-black"
        }`}
      >
        Contact
      </Link>
      <Link
        to="/about"
        className={`px-3 py-2 text-sm font-poppins font-medium transition-colors ${
          location.pathname === "/about" 
            ? "text-black border-b-2 border-black" 
            : "text-gray-700 hover:text-black"
        }`}
      >
        About
      </Link>
      <Link
        to="/signup"
        className={`px-3 py-2 text-sm font-poppins font-medium transition-colors ${
          location.pathname === "/signup" 
            ? "text-black border-b-2 border-black" 
            : "text-gray-700 hover:text-black"
        }`}
      >
        Sign Up
      </Link>
    </motion.div>

    {/* البحث + الأيقونات */}
    <motion.div 
      className="flex items-center space-x-3 sm:space-x-5 flex-shrink-0"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
    >
      
      {/* مربع البحث */}
      <div className="relative flex-1 max-w-[180px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[350px]">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchModalOpen(true)}
          className="w-full px-3 py-2 pr-8 pl-8 text-xs sm:text-sm bg-[#F5F5F5] font-poppins border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
        />
        {/* Keyboard shortcut indicator */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <kbd className="inline-flex items-center px-1 py-0.5 text-xs font-mono text-gray-500 bg-gray-200 border border-gray-300 rounded">
            /
          </kbd>
        </div>
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="absolute inset-y-0 right-0 pr-2 flex items-center hover:bg-gray-100 rounded-r-md transition-colors"
        >
          <img
            src={searchIcon}
            alt="Search"
            className="h-3 w-3 sm:h-4 sm:w-4"
          />
        </button>
      </div>

      {/* أيقونات */}
      {!hideIcons && (
        <motion.div 
          className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/wishlist" className="relative">
              <img src={wishlistIcon} alt="Wishlist" className="h-5 w-5 sm:h-6 sm:w-6" />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span 
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/cart" className="relative">
              <img src={cartIcon} alt="Cart" className="h-5 w-5 sm:h-6 sm:w-6" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
          {!hideUserIcon && <ProfileMenu />}
        </motion.div>
      )}
    </motion.div>

      {/* زر الهامبرغر فقط للشاشات الصغيرة */}
      <motion.div 
        className="flex md:flex lg:hidden items-center flex-shrink-0"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
      >
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

    </div>
  
</motion.nav>

<SearchModal 
  isOpen={isSearchModalOpen} 
  onClose={() => setIsSearchModalOpen(false)} 
/>
    </>
  );
};

export default Navbar;

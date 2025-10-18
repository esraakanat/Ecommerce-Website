import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserWishlist } from "../../../features/whislist/hooks/useUserWishlist";
import { useUserCart } from "../../../features/cart/hooks/useUserCart";
import ProfileMenu from "../ProfileMenu";
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
  
  const { getWishlistCount } = useUserWishlist();
  const wishlistCount = getWishlistCount();

  const { getTotalItems } = useUserCart();
  const cartCount = getTotalItems();
  
 
  useEffect(() => {
    const handleOpenSearch = () => {
      setIsSearchModalOpen(true);
    };

    document.addEventListener('openSearchModal', handleOpenSearch);
    return () => document.removeEventListener('openSearchModal', handleOpenSearch);
  }, []);

  return (
    <>
    
      <motion.div 
        className="bg-black text-white w-full flex items-center sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      
      >
  <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-10 sm:h-12">
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 truncate">
        <span className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-poppins font-normal whitespace-nowrap truncate">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>
        <Link
          to="/products"
          className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-poppins font-semibold underline hover:text-gray-300 transition-colors whitespace-nowrap"
        >
          Shop Now
        </Link>
      </div>

      <div className="flex items-center">
        <p className="bg-black text-white text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-poppins border-none outline-none cursor-pointer">
          English
        </p>
        <img
          src={arrowIcon}
          alt="Arrow"
          className="ml-0.5 sm:ml-1 md:ml-2 h-1.5 w-2 sm:h-2 sm:w-3"
        />
      </div>
    </div>
  </div>
</motion.div>

<motion.nav 
  className="border-b sticky top-10 z-40 bg-white relative"
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
>
  <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 overflow-x-visible">
  
    <motion.div 
      className="flex items-center"
      initial={{ x: 50, opacity: 0 }}
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

    <motion.div 
      className="hidden lg:flex items-center space-x-6"
      initial={{ x: -50, opacity: 0 }}
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

    <motion.div 
      className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
    >
    
      <div className="relative max-w-[120px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[250px]">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchModalOpen(true)}
          className="w-full px-2 py-1.5 pr-6 pl-6 text-xs sm:text-sm bg-[#F5F5F5] font-poppins border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
        />
       
        <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2 pointer-events-none flex items-center justify-center">
          <kbd className="flex items-center justify-center w-4 h-4 text-[10px] font-mono text-gray-500 bg-gray-200 border border-gray-300 rounded">
            /
          </kbd>
        </div>
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="absolute inset-y-0 right-0 pr-1.5 flex items-center hover:bg-gray-100 rounded-r-md transition-colors"
        >
          <img
            src={searchIcon}
            alt="Search"
            className="h-3 w-3 sm:h-4 sm:w-4"
          />
        </button>
      </div>

      {!hideIcons && (
        <motion.div 
          className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
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
              <img src={wishlistIcon} alt="Wishlist" className="h-4 w-4 sm:h-5 sm:w-5" />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span 
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] sm:text-[10px] rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center"
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
              <img src={cartIcon} alt="Cart" className="h-4 w-4 sm:h-5 sm:w-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] sm:text-[10px] rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center"
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

      <motion.div 
        className="flex md:flex lg:hidden items-center flex-shrink-0"
        initial={{ x: -50, opacity: 0 }}
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
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.div>

   
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-poppins font-medium transition-colors rounded-md ${
                location.pathname === "/" 
                  ? "text-black bg-gray-100" 
                  : "text-gray-700 hover:text-black hover:bg-gray-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-poppins font-medium transition-colors rounded-md ${
                location.pathname === "/contact" 
                  ? "text-black bg-gray-100" 
                  : "text-gray-700 hover:text-black hover:bg-gray-50"
              }`}
            >
              Contact
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-poppins font-medium transition-colors rounded-md ${
                location.pathname === "/about" 
                  ? "text-black bg-gray-100" 
                  : "text-gray-700 hover:text-black hover:bg-gray-50"
              }`}
            >
              About
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-poppins font-medium transition-colors rounded-md ${
                location.pathname === "/signup" 
                  ? "text-black bg-gray-100" 
                  : "text-gray-700 hover:text-black hover:bg-gray-50"
              }`}
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

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

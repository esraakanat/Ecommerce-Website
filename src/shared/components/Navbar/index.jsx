import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useUserWishlist } from "../../../features/whislist/hooks/useUserWishlist";
import { useUserCart } from "../../../features/cart/hooks/useUserCart";
import useAuthStore from "../../../features/auth/store";
import ProfileMenu from "../../../features/home/components/ProfileMenu";
import SearchModal from "../SearchModal";

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
    console.log('المستخدم مسجل:', user.name);
  } else {
    console.log('المستخدم غير مسجل');
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
      <div className="bg-black text-white w-full flex items-center sticky top-0 z-50">
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
          src="/src/assets/home assets/arrow1.svg"
          alt="Arrow"
          className="ml-1 sm:ml-2 h-2 w-3"
        />
      </div>
    </div>
  </div>
</div>
      {/* النافبار الرئيسي */}
      <nav className="border-b sticky top-10 z-40 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* شعار الموقع */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold font-inter text-black">
                  Exclusive
                </h1>
              </Link>
            </div>

            {/* روابط النافبار - تظهر فقط على الشاشات المتوسطة فما فوق */}
            <div className="hidden md:flex items-center space-x-8">
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
            </div>

            {/* البحث + الأيقونات (تصغر مع الشاشة) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* مربع البحث - يتقلص حجمه على الشاشات الصغيرة */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchModalOpen(true)}
                  className="w-28 sm:w-48 md:w-64 px-2 sm:px-3 md:px-4 py-1 sm:py-2 pr-8 text-xs sm:text-sm bg-[#F5F5F5] font-poppins border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                />
                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center hover:bg-gray-100 rounded-r-md transition-colors"
                >
                  <img
                    src="/src/assets/home assets/seach.svg"
                    alt="Search"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                  />
                </button>
              </div>

              {/* أيقونات */}
              {!hideIcons && (
                <>
                  <Link to="/wishlist" className="p-1 sm:p-2 text-gray-600 hover:text-black relative">
                    <img
                      src="/src/assets/home assets/WishlistIcon.svg"
                      alt="Wishlist"
                      className="h-5 w-5 sm:h-6 sm:w-6"
                    />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link to="/cart" className="p-1 sm:p-2 text-gray-600 hover:text-black relative">
                    <img
                      src="/src/assets/home assets/CartIcon.svg"
                      alt="Cart"
                      className="h-5 w-5 sm:h-6 sm:w-6"
                    />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  {!hideUserIcon && (
                    <ProfileMenu />
                  )}
                </>
              )}

              {/* زر الهامبرغر للشاشات الصغيرة */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-800"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* قائمة الموبايل للروابط فقط */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-black"
            >
              Home
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-black"
            >
              Contact
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-black"
            >
              About
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-black"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;

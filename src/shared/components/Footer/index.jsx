import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black via-black to-gray-800 text-white mt-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Column 1: Exclusive */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold font-inter bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Exclusive
              </h3>

            </div>
            <div>
              <h4 className="text-xl font-semibold font-poppins mb-2">Subscribe</h4>
              <p className="text-sm text-gray-300 font-poppins mb-4">Get 10% off your first order</p>
              <div className="relative group ">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-white bg-black backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent rounded-lg transition-all duration-300"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 group-hover:scale-110">
                  <img src="/src/assets/home assets/arrow.svg" alt="send" className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-poppins mb-4">Support</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  
                  <p className="text-sm text-gray-300 font-poppins">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                </div>
                <div className="flex items-center gap-3">
                  
                  <p className="text-sm text-gray-300 font-poppins">exclusive@gmail.com</p>
                </div>
                <div className="flex items-center gap-3">
                 
                  <p className="text-sm text-gray-300 font-poppins">+88015-88888-9999</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Account */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-poppins mb-4">Account</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors font-poppins flex items-center gap-2 group">
                   
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors font-poppins flex items-center gap-2 group">
                    
                    Login / Register
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors font-poppins flex items-center gap-2 group">
                   
                    Cart
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors font-poppins flex items-center gap-2 group">
                 
                    Wishlist
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors font-poppins flex items-center gap-2 group">
                  
                    Shop
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Quick Link */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-poppins mb-4">Quick Link</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors font-poppins flex items-center gap-2 group">
                    
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors font-poppins flex items-center gap-2 group">
                   
                    Terms Of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors font-poppins flex items-center gap-2 group">
                    
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors font-poppins flex items-center gap-2 group">
                   
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 5: Download App */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-poppins mb-4">Download App</h3>
              <p className="text-sm text-gray-300 font-poppins mb-6">Save $3 with App New User Only</p>
              <div className="flex items-start space-x-4">
                {/* QR Code */}
                <div className="w-20 h-20 bg-white rounded-lg p-1 shadow-lg">
                  <img src="/src/assets/home assets/qr.png" alt="QR Code" className="w-full h-full object-cover rounded" />
                </div>
                
                {/* App Store Badges */}
                <div className="space-y-3">
                  <div className="transform hover:scale-105 transition-transform">
                    <img src="/src/assets/home assets/google play.png" alt="Google Play" className="w-24 h-auto" />
                  </div>
                  <div className="transform hover:scale-105 transition-transform">
                    <img src="/src/assets/home assets/appstore.png" alt="App Store" className="w-24 h-auto" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="pt-6">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-red-500 transition-all duration-300 transform hover:scale-110">
                  <img src="/src/assets/home assets/facebook.svg" alt="Facebook" className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-black  rounded-full flex items-center justify-center hover:bg-red-500 transition-all duration-300 transform hover:scale-110">
                  <img src="/src/assets/home assets/tiwtter.svg" alt="Twitter" className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-black  rounded-full flex items-center justify-center hover:bg-red-500 transition-all duration-300 transform hover:scale-110">
                  <img src="/src/assets/home assets/instagram.svg" alt="Instagram" className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-black  rounded-full flex items-center justify-center hover:bg-red-500 transition-all duration-300 transform hover:scale-110">
                  <img src="/src/assets/home assets/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="relative mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        
        </div>

        {/* Copyright */}
        <div className="text-center">
         
       
          <p className="text-gray-500 text-sm font-poppins">
            © Copyright Rimel 2022. All right reserved
          </p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;

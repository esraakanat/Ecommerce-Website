import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
const NotFoundPage = () => {
  return (
    <>
     <Navbar  />
     <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="px-8 py-8">
        <p className="text-gray-900 text-sm">
          <Link to="/" className="text-gray-500 transition-colors">Home</Link> / 404 Error
        </p>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="text-center">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl space-x-4 semibold font-inter text-black mb-8">
          404 Not Found
        </h1>

        {/* Sub-text */}
        <p className="text-gray-800 text-sm font-poppins mb-8 text-center">
          Your visited page not found. You may go home page.
        </p>

        {/* Button */}
        <Link to="/" className="bg-[#DB4444] text-white px-8 py-3 rounded-md font-poppins text-[12px] hover:bg-red-600 transition-colors inline-block">
          Back to home page
        </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default NotFoundPage;


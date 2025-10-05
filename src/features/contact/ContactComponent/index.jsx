// Contact.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };
  return (
    <div className="min-h-screen bg-white relative">

      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Message sent successfully!</span>
        </div>
      )}
   
      <div className=" ml-8 lg:ml-48 py-8  ">
        <p className="text-gray-900 text-sm">
          <Link to="/" className="text-gray-500 transition-colors">Home</Link> /contact
        </p>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
         
          <div className="lg:col-span-1 rounded-lg border border-gray-200 bg-white p-7 shadow-sm">
            <div>
              <div className="mb-4 flex items-center">
                <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#DB4444]">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium font-poppins text-gray-800">Call To Us</h3>
              </div>
              <p className="mb-2 text-[12px] font-meduim font-poppins  text-black">
                We are available 24/7, 7 days a week.
              </p>
              <p className="text-base text-[14px] font-poppins  text-gray-900">Phone: +8801611112222</p>
            </div>

            <div className="my-6 border-t border-gray-200" />
            <div>
              <div className="mb-4 flex items-center">
                <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#DB4444]">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium font-poppins text-gray-800">Write To US</h3>
              </div>
              <p className="mb-3 text-[12px] font-poppins  text-black">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-[12px] font-poppins  text-black">Emails: customer@exclusive.com</p>
              <p className="text-[12px] font-poppins  text-black">Emails: support@exclusive.com</p>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-lg border border-gray-200 bg-white p-7 shadow-sm">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name *"
                  required
                  className="h-12 w-full rounded-md border-0 bg-[#F5F5F5] px-4 text-[14px] font-poppins text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#DB4444] focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email *"
                  required
                  className="h-12 w-full rounded-md border-0 bg-[#F5F5F5] px-4 text-[14px] font-poppins text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#DB4444] focus:outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone *"
                  required
                  className="h-12 w-full rounded-md border-0 bg-[#F5F5F5] px-4 text-[14px] font-poppins text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#DB4444] focus:outline-none"
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={8}
                placeholder="Your Message"
                className="w-full resize-none rounded-md border-0 bg-[#F5F5F5] px-4 py-3 text-[14px] font-poppins text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#DB4444] focus:outline-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-[#DB4444] px-7 py-3 text-[12px] font-poppins font-sm text-white hover:bg-red-700 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

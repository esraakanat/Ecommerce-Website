import React from 'react';

const ProductShowcase = () => {
  return (
    <div className="px-8 py-8 max-w-7xl mx-auto">
       {/* Featured Section */}
  <div className="flex flex-col gap-2 mb-6">
    {/* المربع والكلمة في صف واحد */}
    <div className="flex items-center gap-2">
      <div className="w-3 h-7 rounded-sm bg-[#DB4444]"></div>
      <span className="text-[#DB4444] text-sm font-medium font-inter">Featured</span>
    </div>

    {/* New Arrival تحتهم */}
    <p className="text-black text-2xl font-semibold font-inter mb-4">New Arrival</p>
  
  
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-auto md:h-[400px]">
        {/* PlayStation 5 Section - Left Large */}
        <div className="relative bg-black rounded-sm overflow-hidden group cursor-pointer flex flex-col md:flex-row">
          {/* Text Content - Left Side */}
          <div className="w-full md:w-[50%] p-4 md:p-5 h-auto md:h-full flex flex-col justify-center md:justify-end text-center md:text-left">
            <h2 className="text-[#FAFAFA] text-xl md:text-2xl font-semibold font-inter mb-2">PlayStation 5</h2>
            <p className="text-[#FAFAFA] text-xs md:text-xs mb-3 max-w-full md:max-w-xs">
              Black and White version of the PS5<br />coming out on sale.
            </p>
            <button className="text-white text-sm font-medium underline underline-offset-4 w-fit mx-auto md:mx-0 hover:text-gray-300 transition-colors">
              Shop Now
            </button>
          </div>
          
          {/* Image - Right Side */}
          <div className="w-full md:w-[50%] h-48 md:h-full flex items-center justify-center">
            <img 
              src="/src/assets/home assets/ps5.png" 
              alt="PlayStation 5" 
              className="w-full h-full object-contain md:object-cover opacity-80"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3 md:gap-4 h-full">
          {/* Women's Collections - Top */}
          <div className="relative bg-black rounded-sm overflow-hidden flex-1 group cursor-pointer flex flex-col sm:flex-row">
            {/* Text Content */}
            <div className="w-full sm:w-[60%] p-4 md:p-5 h-auto sm:h-full flex flex-col justify-center text-center sm:text-left">
              <h2 className="text-[#FAFAFA] text-lg md:text-2xl font-semibold font-inter mb-2">Women's Collections</h2>
              <p className="text-[#FAFAFA] text-xs mb-3 max-w-full sm:max-w-xs">
                Featured women collections that<br />give you another vibe.
              </p>
              <button className="text-white text-sm font-medium underline underline-offset-4 w-fit mx-auto sm:mx-0 hover:text-gray-300 transition-colors">
                Shop Now
              </button>
            </div>
            
            {/* Image */}
            <div className="w-full sm:w-[40%] h-32 sm:h-full flex items-center justify-center">
              <img 
                src="/src/assets/home assets/woman.png" 
                alt="Women's Collections" 
                className="w-full h-full object-contain sm:object-cover opacity-70"
              />
            </div>
          </div>

   {/* Bottom Row - Speakers & Perfume */}
<div className="flex flex-row gap-3 w-full flex-wrap">
  {/* Speakers */}
  <div className="relative bg-black rounded-sm overflow-hidden group cursor-pointer flex-1 min-w-[48%] flex flex-col md:flex-row">
    {/* Text Content */}
    <div className="w-full md:w-[50%] p-3 md:p-4 h-auto flex flex-col justify-end text-center md:text-left">
      <h3 className="text-[#FAFAFA] text-base md:text-lg font-semibold font-inter mb-1">Speakers</h3>
      <p className="text-[#FAFAFA] text-[10px] md:text-[10px] mb-2">
        Amazon wireless speakers
      </p>
      <button className="text-white text-xs font-medium underline underline-offset-2 w-fit mx-auto md:mx-0 hover:text-gray-300 transition-colors">
        Shop Now
      </button>
    </div>
    
    {/* Image */}
    <div className="w-full md:w-[50%] h-24 md:h-full flex items-center justify-center">
      <img 
        src="/src/assets/home assets/3.png" 
        alt="Speakers" 
        className="w-full h-full object-contain md:object-cover opacity-70"
      />
    </div>
  </div>

  {/* Perfume */}
  <div className="relative bg-black rounded-sm overflow-hidden group cursor-pointer flex-1 min-w-[48%] flex flex-col md:flex-row">
    {/* Text Content */}
    <div className="w-full md:w-[50%] p-3 md:p-4 h-auto flex flex-col justify-end text-center md:text-left">
      <h3 className="text-[#FAFAFA] text-base md:text-lg font-semibold font-inter mb-1">Perfume</h3>
      <p className="text-[#FAFAFA] text-[10px] md:text-[10px] mb-2">
        GUCCI INTENSE OUD EDP
      </p>
      <button className="text-white text-xs font-medium underline underline-offset-2 w-fit mx-auto md:mx-0 hover:text-gray-300 transition-colors">
        Shop Now
      </button>
    </div>
    
    {/* Image */}
    <div className="w-full md:w-[50%] h-24 md:h-full flex items-center justify-center">
      <img 
        src="/src/assets/home assets/perfum.png" 
        alt="Perfume" 
        className="w-full h-full object-contain md:object-cover opacity-70"
      />
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ProductShowcase;

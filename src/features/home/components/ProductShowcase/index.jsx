import React from 'react';
import ps5Image from '../../../../assets/home-assets/ps5.png';
import womanImage from '../../../../assets/home-assets/woman.png';
import product3Image from '../../../../assets/home-assets/3.png';
import perfumeImage from '../../../../assets/home-assets/perfum.png';
const ProductShowcase = () => {
  return (
    <div className="px-8 py-8 max-w-8xl mx-auto">
       {/* Featured Section */}
  <div className="flex flex-col gap-2 mb-6 ">
    {/* المربع والكلمة في صف واحد */}
    <div className="flex items-center gap-2 md:ml-10 xl:ml-12 ">
      <div className="w-4 h-7 rounded-sm bg-[#DB4444]"></div>
      <span className="text-[#DB4444] text-sm font-medium font-inter">Featured</span>
    </div>

    {/* New Arrival تحتهم */}
    <p className="text-black text-2xl font-semibold font-inter mb-4 md:ml-10 xl:ml-12">New Arrival</p>
  
  
        

        <div className=" md:w-[750px] lg:w-[950px] xl:w-[1350px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[400px] ">
        {/* PlayStation 5 Section - Left Large */}
        <div className="relative bg-black rounded-sm overflow-hidden group cursor-pointer flex flex-col md:flex-row">
          {/* Text Content - Left Side */}
          <div className="w-full md:w-[50%] p-4 md:p-5 h-auto md:h-full flex flex-col justify-center md:justify-end text-center md:text-left">
            <h2 className="text-[#FAFAFA] text-xl md:text-2xl font-semibold font-inter mb-2  drop-shadow-lg">PlayStation 5</h2>
            <p className="text-[#FAFAFA] text-xs md:text-xs mb-3 max-w-full md:max-w-xs  drop-shadow-lg">
              Black and White version of the PS5 coming out on sale.
            </p>
            <button className="text-white text-sm font-medium underline underline-offset-4 w-fit mx-auto md:mx-0 hover:text-gray-300 transition-colors">
              Shop Now
            </button>
          </div>
          
          {/* Image - Right Side */}
          <div className="w-full md:w-[80%] mt-4 h-48 md:h-full flex items-center justify-center">
            <img 
              src={ps5Image} 
              alt="PlayStation 5" 
              className="w-auto h-auto object-contain lg:mr-48 lg:mt-12"
              style={{
                maxHeight: '120%',
                maxWidth: '120%'
                
              }}
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
            <div className="w-full sm:w-[40%] h-32 sm:h-full flex items-center justify-center mr-12 mb-8 bg-black relative overflow-hidden">
              <img 
                src={womanImage} 
                alt="Women's Collections" 
                className="w-full h-full object-contain sm:object-cover"
                style={{
                  filter: 'brightness(0.8) contrast(1.2)',
                  backgroundColor: '#000000'
                }}
              />
            </div>
          </div>

   {/* Bottom Row - Speakers & Perfume */}
<div className="flex flex-row gap-3 w-full flex-wrap">
  {/* Speakers */}
  <div className="relative bg-black rounded-sm overflow-hidden group cursor-pointer flex-1 min-w-[48%] flex items-center justify-center">
    {/* Background Gradient */}
    <div 
      className="absolute inset-0 w-full h-full"
      style={{
        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)'
      }}
    ></div>
    
    {/* Image - Background */}
    <div className="w-full h-full flex items-center justify-center p-4 relative z-10">
      <img 
        src={product3Image}
        alt="Speakers" 
        className="w-auto h-auto object-contain"
        style={{
          maxHeight: '80%',
          maxWidth: '80%'
        }}
      />
    </div>
    
    {/* Text Overlay - On top of image */}
    <div className="absolute inset-0 flex flex-col justify-start items-start p-3 md:p-4 lg:mt-36 md:mt-12 mt-24 z-20">
      <h3 className="text-[#FAFAFA] text-base md:text-lg font-semibold font-inter mb-1 drop-shadow-lg">Speakers</h3>
      <p className="text-[#FAFAFA] text-[10px] md:text-[10px] mb-2 drop-shadow-lg">
        Amazon wireless speakers
      </p>
      <button className="text-white text-xs font-medium underline underline-offset-2 w-fit hover:text-gray-300 transition-colors drop-shadow-lg">
        Shop Now
      </button>
    </div>
  </div>

  <div className="relative bg-black rounded-sm overflow-hidden group cursor-pointer flex-1 min-w-[48%] flex items-center justify-center">
    {/* Background Gradient */}
    <div 
      className="absolute inset-0 w-full h-full"
      style={{
        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%,rgba(96, 92, 92, 0.33) 100%)'
      }}
    ></div>
    
    {/* Image - Background */}
    <div className="w-full h-full flex items-center justify-center p-4 relative z-10">
      <img 
        src={perfumeImage}
        alt="Perfume" 
        className="w-auto h-auto object-contain"
        style={{
          maxHeight: '80%',
          maxWidth: '80%'
        }}
      />
    </div>
    
     {/* Text Overlay - On top of image */}
     <div className="absolute inset-0 flex flex-col justify-start items-start p-3 md:p-4 lg:mt-36 md:mt-16 mt-24 z-20">
      
         <h3 className="text-[#FAFAFA] text-base md:text-lg font-semibold font-inter mb-1  ">Perfume</h3>
         <p className="text-[#FAFAFA] text-[10px] md:text-[10px] mb-2 ">
         GUCCI INTENSE OUD EDP
         </p>
         <button className="text-white text-xs font-medium underline underline-offset-2 w-fit hover:text-gray-300 transition-colors">
           Shop Now
         </button>
       
     </div>
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

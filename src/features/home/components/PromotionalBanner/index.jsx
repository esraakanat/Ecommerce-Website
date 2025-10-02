import React from 'react';
import jblImage from '../../../../assets/home-assets/jbl.png';

const MusicBanner = () => {
  return (
    <div className="px-8 py-8 max-w-7xl mx-auto">
      <div className="relative bg-black rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between px-6 md:px-12 py-10 md:py-16 gap-8">

          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left z-10">
            <p className="text-[#00FF66] text-sm font-semibold mb-4 md:mb-6">Categories</p>
            
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6 md:mb-8 max-w-full md:max-w-md">
              Enhance Your<br />Music Experience
            </h1>
            
            {/* Countdown Timer */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mb-6 md:mb-8">
              {[
                { value: '23', label: 'Hours' },
                { value: '05', label: 'Days' },
                { value: '59', label: 'Minutes' },
                { value: '35', label: 'Seconds' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center">
                  <span className="text-black text-base font-semibold">{item.value}</span>
                  <span className="text-black text-[10px]">{item.label}</span>
                </div>
              ))}
            </div>
            
            {/* Buy Button */}
            <button className="bg-[#00FF66] text-white px-10 md:px-12 py-3.5 rounded-md font-medium hover:bg-[#00DD55] transition-colors self-center md:self-start">
              Buy Now!
            </button>
          </div>
          
          {/* Right Image */}
          <div className="flex-1 flex items-center justify-center relative w-full">
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-radial from-gray-800/50 to-transparent opacity-60 rounded-xl"></div>
            
            {/* Image */}
            <img 
              src={jblImage} 
              alt="JBL Speaker" 
              className="relative z-10 w-3/4 sm:w-2/3 md:w-5/6 lg:w-2/3 max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[350px] object-contain drop-shadow-2xl transition-all duration-300"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MusicBanner;

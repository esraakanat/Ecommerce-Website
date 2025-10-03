import React from 'react';
import jblImage from '../../../../assets/home-assets/jbl.png';

const MusicBanner = () => {
  return (
    <div className="px-4 py-6 md:px-10 md:py-8 lg:px-32 xl:px-48
                    mx-auto w-full 
                    xl:w-[1535px] ">
      <div className="relative bg-black rounded-sm overflow-hidden 
                      lg:-mx-16 xl:-mx-24"></div>

      <div
        className="relative bg-black rounded-sm overflow-hidden
                   min-h-[360px] sm:min-h-[380px] md:min-h-[420px]
                   lg:min-h-[370px] xl:min-h-[420px]
                   lg:-mx-16 xl:-mx-24"
      >
        

        <div className="flex flex-col md:flex-col lg:flex-row
                        items-center lg:items-center justify-between
                        px-5 md:px-8 lg:px-10 xl:px-12
                        py-8 md:py-8 lg:py-6
                        gap-5 h-full">

          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-center lg:text-left z-10 lg:max-w-md ">
            <p className="text-[#00FF66] text-xs md:text-sm font-poppins font-semibold mb-3">Categories</p>
             <h1 className="text-white  text-[48px] sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-semibold leading-tight mb-5 font-inter max-w-full lg:mt-12 lg:tracking-wider">
               Enhance Your<br />Music Experience
             </h1>

            {/* Countdown Timer */}
            <div className="flex flex-wrap justify-center md:justify-center font-poppins text-[11px] lg:justify-start gap-6 mb-5">
              {[
                { value: '23', label: 'Hours' },
                { value: '05', label: 'Days' },
                { value: '59', label: 'Minutes' },
                { value: '35', label: 'Seconds' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-full
                             w-12 h-12 md:w-12 md:h-12 lg:w-11 lg:h-11 xl:w-12 xl:h-12
                             flex flex-col items-center justify-center"
                >
                  <span className="text-black font-semibold text-sm md:text-sm lg:text-[13px]">
                    {item.value}
                  </span>
                  <span className="text-black text-[9px] md:text-[9px] lg:text-[9px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Buy Button */}
            <button className="bg-[#00FF66] text-white px-8 py-3 lg:mt-4  text-[14px] rounded-sm font-poppins font-medium hover:bg-[#00DD55] transition-colors self-center md:self-center lg:self-start">
              Buy Now!
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex items-center justify-center lg:justify-end relative w-full lg:pr-6 xl:pr-8">
            {/* 🔥 Glow خلف السماعة فقط */}
  <div
    className="absolute inset-0
               flex items-center justify-center
               pointer-events-none z-0"
  >
    {/* التوهج الأساسي حول السماعة */}
    <div className="w-[380px] h-[380px] lg:w-[450px] lg:h-[450px] rounded-full 
                    bg-white opacity-10 blur-2xl" />

    {/* توهج خفيف إضافي حول الحواف */}
    <div className="absolute w-[500px] h-[500px] rounded-full 
                    bg-white opacity-10 blur-3xl" />
  </div>

  {/* صورة السماعة */}
  <img
    src={jblImage}
    alt="JBL Speaker"
    className="relative z-10
               w-[230px] sm:w-[270px] md:w-[320px] lg:w-[360px] xl:w-[450px]
               max-w-none object-contain drop-shadow-2xl transition-all duration-300 xl:mr-24"
  />
        </div>
  </div>
      </div>
    </div>
  );
};

export default MusicBanner;

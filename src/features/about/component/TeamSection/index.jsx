import React from "react";
import image46 from "../../../../assets/about assets/image 46.png";
import image51 from "../../../../assets/about assets/image 51.png";
import image47 from "../../../../assets/about assets/image 47.png";
import twitterIcon from "../../../../assets/home assets/tiwtter.svg";
import instagramIcon from "../../../../assets/home assets/instagram.svg";
import linkedinIcon from "../../../../assets/home assets/linkedin.svg";

export default function TeamSection() {
  const members = [
    {
      name: "Tom Cruise",
      role: "Founder & Chairman",
      img: image46,
      socialIcons: [
        { icon: linkedinIcon, alt: "linkedin" },
        
      ],
    },
    {
      name: "Will Smith",
      role: "Product Designer",
      img: image51,
      socialIcons: [
       
        { icon: twitterIcon, alt: "twitter" },
      ],
    },
    {
      name: "Emma Watson",
      role: "Managing Director",
      img: image47,
      socialIcons: [
       
        { icon: instagramIcon, alt: "instagram" },
      ],
    },
  ];

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        {members.map((m, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-full h-[320px] bg-[#F6F6F6] flex items-center justify-center rounded-[6px] overflow-hidden">
              <img
                src={m.img}
                alt={m.name}
                className="object-contain h-full"
              />
            </div>
            <h3 className="mt-4 font-semibold text-[18px] font-inter leading-[22px] text-[#111]">
              {m.name}
            </h3>
            <p className="mt-1 text-[12px] font-poppins text-gray-900">{m.role}</p>
            <div className="flex gap-4 mt-3">
  {m.socialIcons.map((social, index) => (
    <span
      key={index}
      className="w-7 h-7 rounded-full bg-black flex items-center justify-center"
    >
      <img
        src={social.icon}
        alt={social.alt}
        className="w-4 h-4" // لا تستعمل invert هنا
      />
    </span>
  ))}
</div>

          </div>
        ))}
      </div>

      {/* Carousel dots */}
      <div className="flex justify-center mt-8 gap-2">
        <span className="w-2 h-2 bg-[#ccc] rounded-full"></span>
        <span className="w-2 h-2 bg-[#ccc] rounded-full"></span>
        <span className="w-2 h-2 bg-[#DB4444] rounded-full"></span>
        <span className="w-2 h-2 bg-[#ccc] rounded-full"></span>
        <span className="w-2 h-2 bg-[#ccc] rounded-full"></span>
      </div>
    </section>
  );
}

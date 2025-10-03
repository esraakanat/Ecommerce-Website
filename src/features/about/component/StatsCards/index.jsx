import React, { useState } from "react";
import shopIcon from "../../../../assets/about assets/shop.svg";
import saleIcon from "../../../../assets/about assets/Sale.svg";
import shoppingBagIcon from "../../../../assets/about assets/Shopping bag.svg";
import moneyBagIcon from "../../../../assets/about assets/Moneybag.svg";

// Responsive Tailwind-only cards
export default function StatsCards() {
  const [hoveredCard, setHoveredCard] = useState(1); // Default hover on Monthly Product Sale (index 1)
  const getCardClass = (cardIndex) => [
    // sizing & layout
    "group w-full h-[168px] sm:h-[180px] lg:h-[190px]",
    // visuals
    "rounded-[6px] border border-[#E7E7E7] shadow-[0_1px_2px_rgba(0,0,0,0.02)]",
    // content layout
    "flex flex-col items-center pt-6 sm:pt-[22px] lg:pt-[26px]",
    // background color based on hover state
    hoveredCard === cardIndex ? "bg-[#DB4444]" : "bg-white",
    // transition for smooth color changes
    "transition-colors duration-300",
  ].join(" ");

  const ring =
    "w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-black flex items-center justify-center";

  const getInnerCircleClass = (cardIndex) => [
    "w-16 h-16 rounded-full flex items-center justify-center border-2 border-[#a3a3a3] transition-colors duration-300",
    hoveredCard === cardIndex ? "bg-white" : "bg-[#a3a3a3]"
  ].join(" ");

  const getBigTextClass = (cardIndex) => [
    "font-semibold mt-4 text-[24px] sm:text-[26px] lg:text-[28px] leading-[30px] sm:leading-[32px] lg:leading-[34px]",
    hoveredCard === cardIndex ? "text-white" : "text-[#111111]",
    "transition-colors duration-300"
  ].join(" ");

  const getSubTextClass = (cardIndex) => [
    "font-medium text-[11px] sm:text-[12px] leading-[16px] sm:leading-[18px] mt-[8px] sm:mt-[10px] text-center max-w-[200px]",
    hoveredCard === cardIndex ? "text-white" : "text-black",
    "transition-colors duration-300"
  ].join(" ");

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div 
            className={getCardClass(0)}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(1)}
          >
            <div className={ring}>
              <div className={getInnerCircleClass(0)}>
                <img
                  src={shopIcon}
                  alt="customer"
                  className="w-12 h-12 px-2 bg-black rounded-full"
                />
              </div>
            </div>
            <div className={getBigTextClass(0)}>10.5k</div>
            <div className={getSubTextClass(0)}>Sallers active our site</div>
          </div>

          {/* Card 2 - Monthly Product Sale (Default Hover) */}
          <div 
            className={getCardClass(1)}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(1)}
          >
            <div className={ring}>
              <div className={getInnerCircleClass(1)}>
                <img
                  src={saleIcon}
                  alt="customer"
                  className="w-12 h-12 px-2 bg-white rounded-full"
                />
              </div>
            </div>
            <div className={getBigTextClass(1)}>33k</div>
            <div className={getSubTextClass(1)}>Mopnthly Producdut Sale</div>
          </div>

          {/* Card 3 */}
          <div 
            className={getCardClass(2)}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(1)}
          >
            <div className={ring}>
              <div className={getInnerCircleClass(2)}>
                <img
                  src={shoppingBagIcon}
                  alt="customer"
                  className="w-12 h-12 px-2 bg-black rounded-full"
                />
              </div>
            </div>
            <div className={getBigTextClass(2)}>45.5k</div>
            <div className={getSubTextClass(2)}>Customer active in our site</div>
          </div>

          {/* Card 4 */}
          <div 
            className={getCardClass(3)}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(1)}
          >
            <div className={ring}>
              <div className={getInnerCircleClass(3)}>
                <img
                  src={moneyBagIcon}
                  alt="customer"
                  className="w-12 h-12 px-2 bg-black rounded-full"
                />
              </div>
            </div>
            <div className={getBigTextClass(3)}>25k</div>
            <div className={getSubTextClass(3)}>Anual gross sale in our site</div>
          </div>
        </div>
      </div>
    </section>
  );
}
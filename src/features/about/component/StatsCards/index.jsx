import React from "react";
import shopIcon from "../../../../assets/about assets/shop.svg";
import saleIcon from "../../../../assets/about assets/Sale.svg";
import shoppingBagIcon from "../../../../assets/about assets/Shopping bag.svg";
import moneyBagIcon from "../../../../assets/about assets/Moneybag.svg";

// Responsive Tailwind-only cards
export default function StatsCards() {
  const baseCard = [
    // sizing & layout
    "group w-full h-[168px] sm:h-[180px] lg:h-[190px]",
    // visuals
    "rounded-[6px] border border-[#E7E7E7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]",
    // content layout
    "flex flex-col items-center pt-6 sm:pt-[22px] lg:pt-[26px]",
    // hover only changes background (your last version changes text too; keep if you like)
    "transition-colors duration-300 hover:bg-[#DB4444]",
  ].join(" ");

  const ring =
    "w-[58px] h-[58px] sm:w-[60px] sm:h-[60px] rounded-full bg-black flex items-center justify-center";

  const bigText =
    "font-semibold mt-4 text-[24px] sm:text-[26px] lg:text-[28px] leading-[30px] sm:leading-[32px] lg:leading-[34px] text-[#111111] group-hover:text-white transition-colors duration-300";

  const subText =
    "font-medium text-[11px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-black mt-[8px] sm:mt-[10px] text-center max-w-[200px] group-hover:text-white transition-colors duration-300";

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className={baseCard}>
            <div className={ring}>
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-400">
                <img
                  src={shopIcon}
                  alt="customer"
                  className="w-12 h-12 px-2 bg-black rounded-full"
                />
              </div>
            </div>
            <div className={bigText}>10.5k</div>
            <div className={subText}>Sallers active our site</div>
          </div>

          {/* Card 2 */}
          <div className={baseCard}>
            <div className={ring}>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-400">
                <img
                  src={saleIcon}
                  alt="customer"
                  className="w-12 h-12 px-2 bg-white rounded-full"
                />
              </div>
            </div>
            <div className={bigText}>33k</div>
            <div className={subText}>Mopnthly Producdut Sale</div>
          </div>

          {/* Card 3 */}
          <div className={baseCard}>
            <div className={ring}>
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center border-2 p-1 border-gray-400">
                <img
                  src={shoppingBagIcon}
                  alt="customer"
                  className="w-12 h-12 px-2 bg-black rounded-full"
                />
              </div>
            </div>
            <div className={bigText}>45.5k</div>
            <div className={subText}>Customer active in our site</div>
          </div>

          {/* Card 4 */}
          <div className={baseCard}>
            <div className={ring}>
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-400">
                <img
                  src={moneyBagIcon}
                  alt="customer"
                  className="w-12 h-12 px-2 bg-black rounded-full"
                />
              </div>
            </div>
            <div className={bigText}>25k</div>
            <div className={subText}>Anual gross sale in our site</div>
          </div>
        </div>
      </div>
    </section>
  );
}
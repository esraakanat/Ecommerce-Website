import React from "react";
import { Link } from "react-router-dom";
import shoppingImage from "../../../../assets/about assets/shopping.png";

export default function About() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="px-4 py-8">
        <p className="text-gray-900 text-sm">
          <Link to="/" className="text-gray-500 transition-colors">Home</Link> /about
        </p>
      </div>
        <main className="mt-8 sm:mt-12 lg:mt-14">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
            <div className="w-full max-w-prose">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-[1.2] font-semibold tracking-wide text-black mb-4 sm:mb-6">
                Our Story
              </h1>

              <p className="text-sm sm:text-base leading-7 sm:leading-8 text-black mb-4 sm:mb-5">
                Launched in 2015, <span className="font-medium">Exclusive</span> is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands, and serves 3 million customers across the region.
              </p>

              <p className="text-sm sm:text-base leading-7 sm:leading-8 text-black">
                Exclusive offers more than 1 million products and is growing very fast. You’ll find a diverse assortment across categories ranging from everyday essentials to premium consumer goods.
              </p>
            </div>
            <div className="w-full">
              <figure className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-sm">
                <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[480px] bg-[#F3A9BF]">
                  <img
                    src={shoppingImage}
                    alt="Shoppers with bags"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </figure>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

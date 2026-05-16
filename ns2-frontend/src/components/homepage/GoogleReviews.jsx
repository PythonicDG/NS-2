"use client";

import Script from "next/script";

/**
 * GoogleReviews Component
 * 
 * Integrates Elfsight Google Reviews widget.
 */
export default function GoogleReviews() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center mb-10">
          <div className="w-20 h-1.5 bg-[#C2481F] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Elfsight Widget Container */}
        <div className="elfsight-app-5407f2c3-dd74-486c-b5ec-34ff1ad71e1c" data-elfsight-app-lazy></div>

        {/* Elfsight Platform Script */}
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="lazyOnload"
        />
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function ServicesHero({ data }) {
  if (!data || typeof data !== "object") return null;

  const bannerData = data;
  if (!bannerData.is_active) return null;

  const statBarItems =
    bannerData.content_items?.filter((item) => item.category === "STAT_BAR") || [];

  const imageUrl = bannerData.primary_image
    ? `${API_BASE_URL}${bannerData.primary_image}`
    : "/images/fallback-hero.jpg";

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "white",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1440' height='1150' preserveAspectRatio='none' viewBox='0 0 1440 700'%3E%3Cpath d='M0,200 C480,450 960,50 1440,300 L1440,700 L0,700 Z' fill='rgba(121,186,255,0.25)'/%3E%3C/svg%3E")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "80vh",
      }}
    >
      <div className="w-full px-6 md:px-12 py-8 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-8">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left md:ml-[80px]">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              {bannerData.super_heading}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 leading-tight">
              {bannerData.heading}{" "}
              <span className="text-blue-600">
                {bannerData.highlighted_heading_text}
              </span>
            </h1>

            <p className="mt-4 text-gray-600 max-w-lg mx-auto md:mx-0">
              {bannerData.subheading}
            </p>

                        {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              {bannerData.primary_button_text && bannerData.primary_button_url && (
                <a
                  href={bannerData.primary_button_url} // The ID of the target section
                >
                  <button
                    className="px-6 py-3 bg-[#C2481F] text-white font-semibold shadow-lg hover:bg-[#A63D1A] transition-all duration-300"
                    style={{ borderRadius: '8px' }}
                  >
                    {bannerData.primary_button_text}
                  </button>
                </a>
              )}
              {bannerData.secondary_button_text && bannerData.secondary_button_url && (
                <a
                  href={bannerData.secondary_button_url} // The ID of the target section
                >
                  <button
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold shadow hover:bg-blue-50 transition-all duration-300"
                    style={{ borderRadius: '8px' }}
                  >
                    {bannerData.secondary_button_text}
                  </button>
                </a>
              )}
            </div>




            {/* Stats */}
            {statBarItems.length > 0 && (
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {statBarItems.map((item, index) => (
                  <div key={item.id || index}>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center relative w-full">
            <div className="relative w-full max-w-md h-[260px] md:h-[380px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageUrl}
                alt="Banner"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

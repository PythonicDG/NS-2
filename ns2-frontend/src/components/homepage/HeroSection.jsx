"use client";

import Image from "next/image";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Hero({ data }) {
  if (!data) return null;

  const backgroundImageUrl = data.background_image
    ? data.background_image.startsWith("http")
      ? data.background_image
      : `${API_BASE_URL}${data.background_image}`
    : null;

  return (
    <section className="relative w-full bg-black text-white pb-40 sm:pb-48">
      {backgroundImageUrl && (
        <div className="absolute inset-0">
          <Image
            alt="Hero Background"
            src={backgroundImageUrl}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_50%] opacity-50"
          />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-20 grid lg:grid-cols-2 items-center gap-8 sm:gap-10">
        <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
          <h2
            className="font-extrabold text-2xl sm:text-3xl lg:text-4xl font-heading"
            style={{ color: "#C2481F" }}
          >
            {data.super_heading}
          </h2>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-snug font-heading">
            {data.heading}
          </h1>

          <p className="text-gray-300 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base font-body">
            {data.subheading}
          </p>

          {data.primary_button_text && (
            <Link
              href={data.primary_button_url || "#"}
              className="inline-block bg-[#C2481F] hover:bg-blue-700 text-white hover:text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors font-body"
            >
              {data.primary_button_text}
            </Link>
          )}
        </div>
      </div>

      <div
        className="
          relative z-20 mt-8 px-4 sm:px-6
          grid grid-cols-2 gap-4 sm:gap-6
          lg:absolute lg:bottom-0 lg:left-1/2 lg:w-full lg:max-w-6xl lg:-translate-x-1/2 lg:translate-y-1/2 lg:grid-cols-4 lg:mt-0
        "
      >
        {data.content_items?.map((item, idx) => (
          <div
            key={idx}
            className="bg-white text-black p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-transform flex flex-col items-center justify-center text-center"
          >
            <p className="text-lg sm:text-2xl lg:text-3xl font-bold font-heading">
              {item.label}
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-body">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

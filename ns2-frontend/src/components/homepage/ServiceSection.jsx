"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Section Header
const SectionHeader = ({ superHeading, heading, subheading }) => (
  <div className="text-center max-w-3xl mx-auto px-4">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight font-poppins">
      {superHeading} <span className="text-blue-600">{heading}</span>
    </h2>

    {subheading && (
      <p className="mt-4 text-lg text-gray-500 font-opensans max-w-xl mx-auto">
        {subheading}
      </p>
    )}
  </div>
);

export const ServicesSection = ({ data = {} }) => {
  // Base URL for API requests, defaulting to empty string
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const contentItems = data?.content_items || [];

  // Track if the component has mounted to trigger animations
  const [animate, setAnimate] = useState(false);

  // Trigger animation on component mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-gray-100 py-24 md:py-32 overflow-hidden">
      {/* Background Wave */}
      <div className="absolute inset-x-0 bottom-0 -z-10 overflow-hidden pointer-events-none">
        <svg
          className="w-full h-40 md:h-56"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#bfdbfe"
            fillOpacity="0.3"
            d="M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,181.3C672,192,768,192,864,197.3C960,203,1056,213,1152,202.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <SectionHeader
          superHeading={data.super_heading}
          heading={data.heading}
          subheading={data.subheading || data.overview_text}
        />

        {/* Cards Row */}
        <div className="mt-20 flex flex-wrap justify-center gap-8">
          {contentItems.map((item, index) => (
            <div
              key={item.order || index}

              className={`group bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-full sm:w-[48%] lg:w-[31%] ${
                animate ? "animate-fade-slide-up" : "opacity-0 translate-y-6"
              }`}
 
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex flex-col items-start text-left gap-4 h-full">
                {/* Icon */}
                {item.icon && (
                  <div className="flex-shrink-0">
                    <img
                      src={`${API_BASE_URL}${item.icon}`}
                      alt={`${item.label || "Service"} icon`}
                      className="h-12 w-12 object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Heading */}
                <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                  {item.label || "Untitled Service"}
                </h3>

                {/* Description */}
                <p className="text-gray-600 font-opensans text-sm leading-relaxed">
                  {item.title}
                </p>

                {/* Bullet Points */}
                <ul className="mt-2 space-y-3 mb-6">
                  {item.description?.split(",").map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start text-gray-500 text-sm font-opensans"
                    >
                      <span className="mt-1.5 mr-3 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      {point.trim()}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div className="mt-auto">
                  {item.text && item.question && (
                    <Link
                      href={item.question}
                      className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-all group-hover:underline"
                      aria-label={`${item.text} about ${item.label}`}
                    >
                      {item.text} →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-slide-up {
          animation-name: fadeSlideUp;
          animation-duration: 700ms;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
};
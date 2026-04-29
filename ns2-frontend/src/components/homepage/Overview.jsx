"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useMemo } from "react";
import { motion } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Overview({ data }) {
  const primaryImageUrl = useMemo(() => {
    if (!data?.primary_image) return null;
    return data.primary_image.startsWith("http")
      ? data.primary_image
      : `${API_BASE_URL}${data.primary_image}`;
  }, [data?.primary_image]);

  const backgroundImageUrl = useMemo(() => {
    if (!data?.background_image) return null;
    return data.background_image.startsWith("http")
      ? data.background_image
      : `${API_BASE_URL}${data.background_image}`;
  }, [data?.background_image]);

  if (!data) return null;

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 sm:py-32 overflow-hidden">
      {/* Consistent Decorative Pattern - Soft Spheres */}
      <div className="absolute -left-10 top-20 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-2xl" aria-hidden="true"></div>
      <div className="absolute right-10 top-40 w-32 h-32 bg-orange-100 rounded-full opacity-20 blur-2xl" aria-hidden="true"></div>
      <div className="absolute left-1/2 bottom-20 w-60 h-60 bg-blue-50 rounded-full opacity-40 blur-3xl -translate-x-1/2" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
          {/* Structural accents */}
          <div className="absolute -left-3 -top-3 w-12 h-12 border-t-4 border-l-4 border-blue-200 opacity-60 rounded-tl-lg"></div>
          <div className="absolute -right-3 -bottom-3 w-12 h-12 border-b-4 border-r-4 border-blue-200 opacity-60 rounded-br-lg"></div>

          {backgroundImageUrl && (
            <div
              className="
              absolute 
              bottom-[42%] right-[22%] 
              w-[70%] h-[45%] 
              sm:w-[65%] sm:h-[50%]
              md:w-[60%] md:h-[52%]
              lg:w-[58%] lg:h-[54%]
              rounded-lg overflow-hidden shadow-lg z-10
              border-2 border-blue-100
              group cursor-pointer transition-transform duration-500 hover:scale-[1.02]
            "
            >
              <Image
                src={backgroundImageUrl}
                alt="Overview Background"
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 60vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}

          {primaryImageUrl && (
            <div
              className="
              absolute 
              bottom-0 right-0 
              w-[80%] h-[55%] 
              sm:w-[75%] sm:h-[60%]
              md:w-[72%] md:h-[62%]
              lg:w-[68%] lg:h-[65%]
              rounded-lg overflow-hidden shadow-2xl border-4 border-white z-20
              group cursor-pointer transition-transform duration-500 hover:scale-[1.02]
            "
            >
              <Image
                src={primaryImageUrl}
                alt="Overview Primary"
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 70vw, 65vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}

          {/* Dots Pattern */}
          <div className="absolute -bottom-6 -left-6 flex space-x-2 opacity-30" aria-hidden="true">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#C2481F" }}
            ></div>
            <div className="w-6 h-6 bg-blue-300 rounded-full"></div>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#C2481F" }}
            ></div>
          </div>
        </div>

        <div className="text-center lg:text-left relative lg:pl-4">
          <div className="absolute -right-6 -top-6 w-14 h-14 border-t-4 border-r-4 border-blue-100 opacity-50 rounded-tr-xl"></div>

          {data.super_heading && (
            <h2
              className="font-semibold text-sm sm:text-base relative inline-block mb-3 sm:mb-4"
              style={{ color: "#C2481F" }}
            >
              <span className="relative z-10">{data.super_heading}</span>
              <span className="absolute -left-2 -right-2 bottom-0 h-2 bg-blue-100 opacity-40 -z-10 rounded-full"></span>
            </h2>
          )}

          <h3 className="text-2xl text-black sm:text-3xl lg:text-5xl font-bold leading-tight mb-6 sm:mb-8">
            {data.heading}
          </h3>

          {data.overview_text && (
            <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium mx-auto lg:mx-0 mb-8 sm:mb-10 max-w-2xl">
              {data.overview_text}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12 justify-items-center lg:justify-items-start">
            {data.content_items?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 text-gray-700 text-sm sm:text-base relative group text-left w-full"
              >
                <CheckCircle
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                  style={{ color: "#C2481F" }}
                />
                <span className="group-hover:text-blue-800 transition-colors font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start">
            {data.primary_button_text && (
              <Link
                href={data.primary_button_url || "/contact"}
                className="inline-flex items-center gap-3 text-white px-8 py-3.5 sm:py-4 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center relative overflow-hidden group"
                style={{ backgroundColor: "#C2481F" }}
                prefetch={true}
              >
                <span className="relative z-10 transition-transform group-hover:translate-x-1">
                  {data.primary_button_text}
                </span>
                <span className="text-sm relative z-10 transition-transform group-hover:translate-x-2">
                  →
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-0"></div>
              </Link>
            )}

            {data.secondary_button_text && (
              <Link
                href={data.secondary_button_url || "/courses"}
                className="inline-flex items-center gap-3 border-2 border-gray-200 text-gray-700 px-8 py-3.5 sm:py-4 rounded-xl text-base font-semibold bg-white hover:bg-gray-50 hover:border-gray-300 transition-all w-full sm:w-auto justify-center relative overflow-hidden group"
                prefetch={true}
              >
                <span className="relative z-10">
                  {data.secondary_button_text}
                </span>
                <span className="text-sm relative z-10 transition-transform group-hover:translate-x-1">
                  →
                </span>
                <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </Link>
            )}
          </div>

          {/* Consistent dots accent */}
          <div className="absolute -bottom-10 left-1/4 translate-y-full flex space-x-1 opacity-40">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#C2481F" }}
            ></div>
            <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#C2481F" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

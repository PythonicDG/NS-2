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
    <section className="relative w-full bg-white py-12 sm:py-20 overflow-hidden">
      <div className="absolute -left-6 top-20 w-28 h-28 bg-blue-100 rounded-full opacity-40 blur-sm"></div>
      <div className="absolute right-12 top-16 w-16 h-16 bg-blue-200 rounded-[32px] rotate-45 opacity-30"></div>
      <div className="absolute left-24 bottom-32 w-20 h-20 bg-blue-100 rounded-[30%70%70%30%/30%30%70%70%] opacity-30"></div>

      <div className="absolute hidden lg:block right-20 top-24 opacity-25">
        <svg
          width="100"
          height="80"
          viewBox="0 0 100 80"
          className="fill-current"
          style={{ color: "#C2481F" }}
        >
          <path
            d="M80,40 C80,40 20,10 20,40 C20,70 0,40 0,40"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
          <polygon points="0,40 10,35 10,45" fill="currentColor" />
          <circle cx="65" cy="25" r="4" fill="currentColor" />
          <circle cx="75" cy="35" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute hidden lg:block left-32 top-44 opacity-15">
        <svg
          width="120"
          height="40"
          viewBox="0 0 120 40"
          className="fill-current"
          style={{ color: "#C2481F" }}
        >
          <path
            d="M0,20 Q30,0 60,20 T120,20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute hidden md:block right-32 bottom-44 opacity-20">
        <svg
          width="80"
          height="60"
          viewBox="0 0 80 60"
          className="fill-current"
          style={{ color: "#C2481F" }}
        >
          <path d="M70,10 C73,10 80,13 80,20 C80,27 73,30 70,30 L10,30 C7,30 0,27 0,20 C0,13 7,10 10,10 Z M50,40 L60,50 L50,40 Z" />
        </svg>
      </div>

      <div className="absolute left-16 top-1/3 opacity-20">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className="fill-current"
          style={{ color: "#C2481F" }}
        >
          <path d="M20,5 L24,16 L36,16 L26,23 L30,34 L20,27 L10,34 L14,23 L4,16 L16,16 Z" />
        </svg>
      </div>

      <div className="absolute right-24 top-1/2 opacity-15">
        <svg
          width="60"
          height="20"
          viewBox="0 0 60 20"
          className="fill-current"
          style={{ color: "#C2481F" }}
        >
          <path d="M10,0 L10,8 L18,8 L18,12 L10,12 L10,20 L6,20 L6,12 L-2,12 L-2,8 L6,8 L6,0 Z M30,0 L30,8 L38,8 L38,12 L30,12 L30,20 L26,20 L26,12 L18,12 L18,8 L26,8 L26,0 Z M50,0 L50,8 L58,8 L58,12 L50,12 L50,20 L46,20 L46,12 L38,12 L38,8 L46,8 L46,0 Z" />
        </svg>
      </div>

      <div className="container mt-12 mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <div className="absolute -left-3 -top-3 w-12 h-12 border-t-4 border-l-4 border-blue-200 opacity-60 rounded-tl-lg"></div>
          <div className="absolute -right-3 -bottom-3 w-12 h-12 border-b-4 border-r-4 border-blue-200 opacity-60 rounded-br-lg"></div>

          {backgroundImageUrl && (
            <div
              className="
              absolute 
              bottom-[40%] right-[20%] 
              w-[70%] h-[45%] 
              sm:bottom-[45%] sm:right-[25%] sm:w-[65%] sm:h-[50%]
              md:bottom-[48%] md:right-[28%] md:w-[60%] md:h-[52%]
              lg:bottom-[48%] lg:right-[28%] lg:w-[55%] lg:h-[54%]
              rounded-lg overflow-hidden shadow-lg z-10
              border-2 border-blue-100
            "
            >
              <Image
                src={backgroundImageUrl}
                alt="Overview Background"
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 60vw, 55vw"
                className="object-cover"
              />
            </div>
          )}

          {primaryImageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4, rotate: 15, x: 150, y: 150 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 60, 
                damping: 12,
                duration: 1.2
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="
              absolute 
              bottom-0 right-0 
              w-[80%] h-[55%] 
              sm:w-[75%] sm:h-[60%]
              md:w-[70%] md:h-[62%]
              lg:w-[65%] lg:h-[64%]
              rounded-lg overflow-hidden shadow-2xl border-4 border-white z-20
            "
            >
              <Image
                src={primaryImageUrl}
                alt="Overview Primary"
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 70vw, 65vw"
                className="object-cover"
              />

              <div className="absolute -left-8 bottom-1/3 z-30 opacity-80">
                <svg
                  width="60"
                  height="40"
                  viewBox="0 0 60 40"
                  className="fill-current"
                  style={{ color: "#C2481F" }}
                >
                  <path
                    d="M0,20 C20,10 40,30 60,20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <polygon points="60,20 50,15 50,25" fill="currentColor" />
                </svg>
              </div>
            </motion.div>
          )}

          <div className="absolute -bottom-6 -left-6 flex space-x-2 opacity-30">
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

        <div className="space-y-4 sm:space-y-6 text-center lg:text-left relative">
          <div className="absolute -right-6 -top-6 w-14 h-14 border-t-4 border-r-4 border-blue-100 opacity-50 rounded-tr-xl"></div>

          {data.super_heading && (
            <h2
              className="font-semibold text-sm sm:text-base relative inline-block"
              style={{ color: "#C2481F" }}
            >
              <span className="relative z-10">{data.super_heading}</span>
              <span className="absolute -left-2 -right-2 bottom-0 h-2 bg-blue-100 opacity-40 -z-10 rounded-full"></span>
            </h2>
          )}

          <h3 className="text-2xl text-black sm:text-3xl lg:text-4xl font-bold leading-snug">
            {data.heading}
          </h3>

          {data.overview_text && (
            <p className="text-gray-600 text-sm sm:text-base font-medium mx-auto lg:mx-0">
              {data.overview_text}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 justify-items-center lg:justify-items-start">
            {data.content_items?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-gray-700 text-sm sm:text-base relative group text-left"
              >
                <div
                  className="absolute -left-3 top-1.5 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: "#C2481F" }}
                ></div>
                <CheckCircle
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                  style={{ color: "#C2481F" }}
                />
                <span className="group-hover:text-blue-800 transition-colors">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 justify-center lg:justify-start">
            {data.primary_button_text && (
              <Link
                href={data.primary_button_url || "#"}
                className="inline-flex items-center gap-2 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium shadow transition-all w-full sm:w-auto justify-center relative overflow-hidden group"
                style={{ backgroundColor: "#C2481F" }}
                prefetch={false}
              >
                <span className="relative z-10 transition-transform group-hover:translate-x-1">
                  {data.primary_button_text}
                </span>
                <span className="text-xs relative z-10 transition-transform group-hover:translate-x-2">
                  →
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-0"></div>
              </Link>
            )}

            {data.secondary_button_text && (
              <Link
                href={data.secondary_button_url || "#"}
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base bg-white hover:bg-gray-50 transition-all w-full sm:w-auto justify-center relative overflow-hidden group"
                prefetch={false}
              >
                <span className="relative z-10">
                  {data.secondary_button_text}
                </span>
                <span className="text-xs relative z-10 transition-transform group-hover:translate-x-1">
                  →
                </span>
                <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </Link>
            )}
          </div>

          <div className="absolute -bottom-8 left-1/4 flex space-x-1 opacity-40">
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

      <div
        className="absolute bottom-0 left-0 right-0 h-2 opacity-50"
        style={{
          background: "linear-gradient(to right, #e0e7ff, #C2481F, #e0e7ff)",
        }}
      ></div>
    </section>
  );
}

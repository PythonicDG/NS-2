"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
      {/* Moving Orange Announcement Strip */}
      <div className="w-full bg-[#C2481F] py-2.5 z-30 relative overflow-hidden border-b border-white/10 shadow-lg">
        <motion.div 
          animate={{ x: [0, "-50%"] }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex whitespace-nowrap w-max"
        >
          {/* Announcement Content Block (Repeated for seamless loop) */}
          {[1, 2].map((block) => (
            <div key={block} className="flex items-center gap-12 px-6 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest">
              {data.announcements && data.announcements.length > 0 ? (
                data.announcements.map((ann, idx) => (
                  <div key={idx} className="flex items-center gap-12">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{ann.icon}</span>
                      <span>{ann.text}</span>
                    </div>
                    <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🎓</span>
                    <span>Admission Open - Enroll Now for Limited Seats!</span>
                  </div>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🚀</span>
                    <span>New Batch Starting - Don't Miss Out!</span>
                  </div>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm">💼</span>
                    <span>100% Placement Assistance Available</span>
                  </div>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
                </>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {backgroundImageUrl && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              alt="Hero Background"
              src={backgroundImageUrl}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_50%] opacity-50"
            />
          </motion.div>
          {/* Dark gradient overlay for text clarity */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          
          {/* Subtle Floating Tech Icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { icon: "{ }", top: "20%", left: "10%", size: "text-4xl", delay: 0 },
              { icon: "01", top: "60%", left: "15%", size: "text-6xl", delay: 1 },
              { icon: "</>", top: "30%", left: "80%", size: "text-5xl", delay: 2 },
              { icon: "[]", top: "70%", left: "85%", size: "text-4xl", delay: 0.5 },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.05, 0.15, 0.05],
                  y: [0, -30, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 8 + idx * 2, 
                  repeat: Infinity, 
                  delay: item.delay,
                  ease: "easeInOut" 
                }}
                style={{ top: item.top, left: item.left }}
                className={`absolute ${item.size} font-mono text-white/20 select-none hidden lg:block`}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-20 grid lg:grid-cols-2 items-center gap-8 sm:gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-4 sm:space-y-6 text-center lg:text-left"
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-extrabold text-2xl sm:text-3xl lg:text-4xl font-heading"
            style={{ color: "#C2481F" }}
          >
            {data.super_heading}
          </motion.h2>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-snug font-heading"
          >
            {data.heading}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-gray-300 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base font-body"
          >
            {data.subheading}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start"
          >
            {data.primary_button_text && (
              <Link
                href={data.primary_button_url || "#"}
                className="inline-block bg-[#C2481F] hover:bg-[#A83D1A] text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-[#C2481F]/30 hover:-translate-y-0.5 font-body"
              >
                {data.primary_button_text}
              </Link>
            )}

            {(data.secondary_button_text || data.secondary_button_url) && (
              <Link
                href={data.secondary_button_url || "#"}
                className="inline-block bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/20 hover:border-white/40 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 font-body"
              >
                {data.secondary_button_text || "Book Free Demo"}
              </Link>
            )}
          </motion.div>

          {/* Credibility Stats Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 pt-8 mt-8 border-t border-white/10"
          >
            {data.statistics && data.statistics.length > 0 ? (
              data.statistics.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 group">
                  <span className="text-xl group-hover:scale-110 transition-transform">{stat.icon}</span>
                  <span className="text-sm font-medium text-gray-300">
                    {stat.label} <span className="text-white font-bold">{stat.value}</span> {stat.sub_label}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center gap-2 group">
                  <span className="text-xl group-hover:scale-110 transition-transform">⭐</span>
                  <span className="text-sm font-medium text-gray-300">
                    Rated <span className="text-white font-bold">4.8/5</span> by 2,000+ students
                  </span>
                </div>
                <div className="flex items-center gap-2 group">
                  <span className="text-xl group-hover:scale-110 transition-transform">🎓</span>
                  <span className="text-sm font-medium text-gray-300">
                    <span className="text-white font-bold">10,000+</span> students trained
                  </span>
                </div>
                <div className="flex items-center gap-2 group">
                  <span className="text-xl group-hover:scale-110 transition-transform">🏢</span>
                  <span className="text-sm font-medium text-gray-300">
                    Placed in <span className="text-white font-bold">top companies</span>
                  </span>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
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
            className="bg-white text-black p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 flex flex-col items-center justify-center text-center"
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

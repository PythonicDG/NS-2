"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * KeyAchievementsClient Component
 * 
 * A client-side carousel that displays student achievements with a continuous scroll effect.
 * Uses Framer Motion for smooth animations.
 * 
 * @param {Object} props
 * @param {Array} props.items - List of achievement items to display
 * @returns {JSX.Element}
 */
export default function KeyAchievementsClient({ items = [] }) {
  // Triple the items to ensure seamless infinite scrolling
  const displayItems = useMemo(() => [...items, ...items, ...items], [items]);

  if (!items?.length) return null;

  return (
    <div className="w-full overflow-hidden pt-2 pb-12 group">
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex gap-20 w-max px-10"
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
      >
        {displayItems.map((item, idx) => (
          <StudentCard key={idx} item={item} index={idx % items.length} />
        ))}
      </motion.div>
    </div>
  );
}

function StudentCard({ item, index }) {
  const photoUrl = item.icon
    ? item.icon.startsWith("http")
      ? item.icon
      : `${API_BASE_URL}${item.icon}`
    : null;

  return (
    <div className="relative group w-[300px] md:w-[320px] shrink-0">
      {/* Decorative Aura */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#C2481F]/10 to-cyan-400/5 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Main Card Shell */}
      <div className="relative bg-white rounded-[2.50rem] p-6 pb-8 border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_40px_70px_-20px_rgba(194,72,31,0.15)] hover:-translate-y-2">
        
        {/* Compact Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
            <span className="text-gray-300 font-black text-xs">#{index + 1}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Verified</span>
          </div>
        </div>

        {/* Scaled Photo Section */}
        <div className="relative mx-auto mb-6">
          <div className="relative w-28 h-28 mx-auto">
            {/* Spinning decorative frame */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-15%] border border-dashed border-[#C2481F]/20 rounded-[2.5rem]"
            />
            
            <div className="relative w-full h-full rounded-[1.8rem] bg-gradient-to-br from-[#C2481F] to-orange-400 p-[2px] shadow-lg">
              <div className="relative w-full h-full rounded-[1.7rem] bg-white overflow-hidden">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt={item.title}
                    fill
                    className="object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-200 text-5xl font-thin">
                    👤
                  </div>
                )}
              </div>
            </div>
            
            {/* Level Tag */}
            <div className="absolute -bottom-2 right-[-10%] z-10">
              <div className="bg-[#1a1a1a] text-white text-[8px] font-black px-3 py-1.5 rounded-lg shadow-xl uppercase">
                LVL {item.order || index + 1}
              </div>
            </div>
          </div>
        </div>

        {/* Compact Profile Data */}
        <div className="text-center mb-6">
          <p className="text-[8px] font-black text-[#C2481F] uppercase tracking-[0.4em] mb-2 opacity-60">Success Graduate</p>
          <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-3 truncate px-2">
            {item.title}
          </h3>
          <div className="inline-block bg-[#1a1a1a] text-white px-5 py-2 rounded-xl">
             <p className="text-[9px] font-black uppercase tracking-widest">{item.description}</p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="space-y-4 pt-5 border-t border-dashed border-gray-100">
          <div className="bg-gray-50/50 p-3 rounded-2xl flex flex-col items-center gap-0.5">
            <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">{item.text || "Alma Mater"}</span>
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-tighter text-center truncate w-full">
              {item.question}
            </p>
          </div>

          <div className="flex items-center gap-4 px-1">
             <div className="w-10 h-10 rounded-full bg-[#C2481F] flex items-center justify-center shadow-lg shadow-[#C2481F]/30 shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
             </div>
             <div className="text-left overflow-hidden">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Official Cert</p>
                <p className="text-[11px] font-extrabold text-[#C2481F] tracking-tight truncate leading-tight">
                  {item.answer}
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

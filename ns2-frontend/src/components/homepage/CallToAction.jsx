"use client";

import React from "react";
import { Phone } from "lucide-react";
import Link from "next/link";

export default function CallToAction({ data }) {
  if (!data) return null;

  // Main Call to Action section with placement guarantee badge
  return (
    <section className="bg-gradient-to-r from-[#0B3A6E] to-[#0E4C92] py-16 md:py-20 overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16">
          
          {/* TEXT SIDE (NOW ON LEFT) */}
          <div className="text-center md:text-left text-white max-w-xl order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 tracking-tight">
              {data.heading || "Call Us Now"}
            </h2>
            <p className="text-blue-100 text-lg sm:text-xl font-medium mb-6 opacity-90">
              {data.subheading || "To get more information about the course and placements"}
            </p>
            
            {/* SMALL DECORATIVE LINE */}
            <div className="w-16 h-1 bg-orange-400 mb-8 mx-auto md:mx-0 rounded"></div>

            <div className="flex flex-col items-center md:items-start">
              <Link
                href={data.primary_button_url || "#"}
                className="inline-flex items-center gap-3 bg-white text-[#0B3A6E] px-10 py-4 rounded-xl text-xl font-black hover:bg-blue-50 transition-all shadow-xl active:scale-95 group"
              >
                <Phone className="w-6 h-6 fill-[#0B3A6E] text-[#0B3A6E]" />
                <span className="uppercase tracking-wider">
                  {data.primary_button_text === "Contact Support" ? "CALL NOW" : data.primary_button_text || "CALL NOW"}
                </span>
              </Link>
              
              <p className="text-sm text-blue-200 mt-4 opacity-80">
                Available 7 days a week • Quick response
              </p>
              
              {data.overview_text && (
                <p className="mt-6 text-xl font-bold tracking-wide text-white">
                  Phone: <span className="text-orange-400">{data.overview_text.replace("Phone: ", "")}</span>
                </p>
              )}
            </div>
          </div>

          {/* BADGE SIDE (NOW ON RIGHT) */}
          <div className="relative flex-shrink-0 scale-90 sm:scale-110 order-1 md:order-2">
            <div className="relative w-80 h-80 flex items-center justify-center">
              
              {/* Scalloped Red Shape SVG */}
              <div className="absolute inset-0 animate-pulse-subtle">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                  <path
                    d="M50,2.5 C52,2.5 53,5 55,5 C57,5 58,2.5 60,2.8 C62,3.1 63,5.6 65,6.1 C67,6.6 68,4.1 70,4.7 C72,5.3 73,7.8 75,8.6 C77,9.4 78,6.9 80,7.8 C82,8.7 83,11.2 85,12.3 C87,13.4 88,10.9 90,12.4 C92,13.9 92,16.4 93.5,18 C95,19.6 97.5,19.6 98.3,21.5 C99.1,23.4 97.5,25.5 98,27.5 C98.5,29.5 101,31 101,33 C101,35 98.5,36.5 98,38.5 C97.5,40.5 99.1,42.6 98.3,44.5 C97.5,46.4 95,46.4 93.5,48 C92,49.6 92,52.1 90,53.6 C88,55.1 87,52.6 85,53.7 C83,54.8 82,57.3 80,58.2 C78,59.1 77,56.6 75,57.4 C73,58.2 72,60.7 70,61.3 C68,61.9 67,59.4 65,59.9 C63,60.4 62,62.9 60,63.2 C58,63.5 57,61 55,61 C53,61 52,63.5 50,63.5 C48,63.5 47,61 45,61 C43,61 42,63.5 40,63.2 C38,62.9 37,60.4 35,59.9 C33,59.4 32,61.9 30,61.3 C28,60.7 27,58.2 25,57.4 C23,56.6 22,59.1 20,58.2 C18,57.3 17,54.8 15,53.7 C13,52.6 12,55.1 10,53.6 C8,52.1 8,49.6 6.5,48 C5,46.4 2.5,46.4 1.7,44.5 C0.9,42.6 2.5,40.5 2,38.5 C1.5,36.5 -1,35 -1,33 C-1,31 1.5,29.5 2,27.5 C2.5,25.5 0.9,23.4 1.7,21.5 C2.5,19.6 5,19.6 6.5,18 C8,16.4 8,13.9 10,12.4 C12,10.9 13,13.4 15,12.3 C17,11.2 18,8.7 20,7.8 C22,6.9 23,9.4 25,8.6 C27,7.8 28,5.3 30,4.7 C32,4.1 33,6.6 35,6.1 C37,5.6 38,3.1 40,2.8 C42,2.5 43,5 45,5 C47,5 48,2.5 50,2.5 Z"
                    fill="#E31E24"
                  />
                </svg>
              </div>
              
              {/* Inner content */}
              <div className="relative z-10 flex flex-col items-center text-center w-full">
                {/* Top Stars & 100% */}
                <div className="relative flex items-center justify-center mb-[-5px]">
                   <span className="text-white text-3xl mr-4 translate-y-2 opacity-90 animate-bounce-slow">★</span>
                   <div className="flex flex-col items-center">
                     <span className="text-white text-[74px] font-black leading-none drop-shadow-lg tracking-tighter">100 %</span>
                   </div>
                   <span className="text-white text-3xl ml-4 translate-y-2 opacity-90 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>★</span>
                </div>
                
                {/* The Yellow Ribbon */}
                <div className="relative w-[125%] h-20 flex items-center justify-center z-20">
                  <svg viewBox="0 0 400 100" className="absolute inset-0 w-full h-full drop-shadow-xl overflow-visible">
                    <polygon 
                       points="10,20 390,20 380,50 390,80 10,80 20,50" 
                       fill="#FFDE00" 
                       transform="rotate(-2, 200, 50)"
                    />
                  </svg>
                  <span className="relative z-30 text-[#002B5B] text-[42px] font-black tracking-tight rotate-[-2deg]">
                    PLACEMENTS
                  </span>
                </div>
                
                {/* Bottom text */}
                <h4 className="text-white text-[34px] font-extrabold mt-[-4px] tracking-tight drop-shadow-md">
                  JOB GUARANTY
                </h4>
                
                {/* Bottom Stars */}
                <div className="flex gap-6 mt-2">
                   <span className="text-white/60 text-xl">★</span>
                   <span className="text-white/60 text-xl">★</span>
                   <span className="text-white/60 text-xl">★</span>
                </div>
              </div>
              
              {/* Additional Decorative Stars spread around */}
              <span className="absolute top-8 left-12 text-yellow-400 text-2xl animate-pulse">★</span>
              <span className="absolute top-10 right-14 text-yellow-400 text-xl">★</span>
              <span className="absolute bottom-16 left-16 text-white/40 text-lg">★</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute left-0 top-0 w-72 h-72 bg-blue-400 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-900 opacity-20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0.5rem); }
          50% { transform: translateY(-0.25rem); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
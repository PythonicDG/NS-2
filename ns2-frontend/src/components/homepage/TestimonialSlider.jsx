"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function normalizeUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-1 rounded-full bg-neutral-800/50">
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-600"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default function TestimonialSlider({ items = [] }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;
  const [cardsToShow, setCardsToShow] = useState(3);

  // Responsive handling for number of cards to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsToShow(1);
      else if (window.innerWidth < 1024) setCardsToShow(2);
      else setCardsToShow(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  if (items.length === 0) {
    return null;
  }

  // Get current slice of items to show
  const visibleItems = [];
  for (let i = 0; i < cardsToShow; i++) {
    visibleItems.push(items[(current + i) % total]);
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map((item, idx) => (
              <motion.div
                key={`${current}-${idx}`}
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-[#1A1A1A] rounded-2xl p-8 md:p-10 flex flex-col border border-neutral-800 shadow-2xl h-full min-h-[350px]"
              >
                <StarRating />

                <h4 className="text-xl font-semibold text-white mb-4 line-clamp-1">
                  {item?.title}
                </h4>

                <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                  "{item?.description}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-800 border-2 border-neutral-700 flex-shrink-0 relative group">
                    {item?.icon ? (
                      <Image
                        src={normalizeUrl(item.icon)}
                        alt={item?.question || "Student"}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                        <span className="text-lg font-semibold text-neutral-400">
                          {item?.question?.charAt(0) || "S"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-white text-base">
                      {item?.question}
                    </span>
                    <span className="text-neutral-500 text-xs sm:text-sm">
                      {item?.answer}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex items-center justify-between pt-8 border-t border-neutral-200 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium text-neutral-800">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-neutral-400 text-lg">
            of {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors group"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-800 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors group"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

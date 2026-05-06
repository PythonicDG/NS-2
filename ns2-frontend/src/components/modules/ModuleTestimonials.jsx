"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";

export default function ModuleTestimonials({ data }) {
  if (!data) return null;

  const items = (data.content_items || []).filter((item) => item.is_active);

  if (items.length === 0) return null;

  return (
    <section id="module-testimonials" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[20rem] h-[20rem] bg-[#C2481F]/5 rounded-full blur-[100px] translate-x-1/2" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          {data.super_heading && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-[#C2481F] bg-[#C2481F]/10 rounded-full mb-5">
              <Quote className="w-4 h-4" />
              {data.super_heading}
            </span>
          )}
          {data.heading && (
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {data.heading}
              {data.highlighted_heading && (
                <span className="text-[#C2481F]"> {data.highlighted_heading}</span>
              )}
            </h2>
          )}
          {data.subheading && (
            <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
              {data.subheading}
            </p>
          )}
        </div>

        <TestimonialCarousel items={items} />
      </div>
    </section>
  );
}

function TestimonialCarousel({ items = [] }) {
  const [current, setCurrent] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const total = items.length;

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

  // Auto-slide
  useEffect(() => {
    if (total <= cardsToShow) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total, cardsToShow]);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const handleNext = () => setCurrent((prev) => (prev + 1) % total);

  const visibleItems = [];
  for (let i = 0; i < Math.min(cardsToShow, total); i++) {
    visibleItems.push(items[(current + i) % total]);
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {visibleItems.map((item, idx) => {
          const photoUrl = normalizeImageUrl(item.icon);
          return (
            <div
              key={`${current}-${idx}`}
              className="bg-[#1A1A1A] rounded-2xl p-8 flex flex-col border border-neutral-800 shadow-xl min-h-[320px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-1 rounded-full bg-neutral-800/50">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  </div>
                ))}
              </div>

              {/* Title */}
              {item.title && (
                <h4 className="text-lg font-semibold text-white mb-3 line-clamp-1">
                  {item.title}
                </h4>
              )}

              {/* Description */}
              {item.description && (
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                  &ldquo;{item.description}&rdquo;
                </p>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-neutral-800 border-2 border-neutral-700 flex-shrink-0 relative">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={item.question || "Student"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C2481F] to-orange-500">
                      <span className="text-sm font-bold text-white">
                        {(item.question || "S").charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  {item.question && (
                    <span className="font-medium text-white text-sm block">{item.question}</span>
                  )}
                  {item.answer && (
                    <span className="text-neutral-500 text-xs">{item.answer}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      {total > cardsToShow && (
        <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-neutral-800">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="text-neutral-400 text-lg">
              of {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-800 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

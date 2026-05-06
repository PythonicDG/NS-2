"use client";

import { normalizeImageUrl } from "@/lib/api";
import { Star } from "lucide-react";

export default function ModuleKeyHighlights({ data }) {
  if (!data) return null;

  const items = (data.content_items || []).filter((item) => item.is_active);

  return (
    <section id="module-key-highlights" className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -left-20 top-1/4 w-[28rem] h-[28rem] bg-gradient-to-br from-[#C2481F]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute -right-20 bottom-1/4 w-[24rem] h-[24rem] bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          {data.super_heading && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-[#C2481F] bg-[#C2481F]/10 rounded-full mb-5">
              <Star className="w-4 h-4" />
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
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {data.subheading}
            </p>
          )}
        </div>

        {/* Highlights Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, idx) => {
              const iconUrl = normalizeImageUrl(item.icon);
              return (
                <div
                  key={item.id || idx}
                  className={`group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#C2481F]/20 hover:-translate-y-1 transition-all duration-400 module-stagger-${(idx % 6) + 1}`}
                >
                  {/* Icon */}
                  {iconUrl ? (
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C2481F]/10 to-orange-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={iconUrl}
                        alt={item.title || ""}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C2481F] to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">{item.label || idx + 1}</span>
                    </div>
                  )}

                  {/* Title */}
                  {item.title && (
                    <h3 className="font-semibold text-gray-900 text-base mb-2 group-hover:text-[#C2481F] transition-colors">
                      {item.title}
                    </h3>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  )}

                  {/* Tags */}
                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.tags.split(",").map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

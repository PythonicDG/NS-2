"use client";

import { normalizeImageUrl } from "@/lib/api";
import { Trophy, TrendingUp } from "lucide-react";

const ResultCard = ({ item, iconUrl, idx }) => (
  <div
    key={item.id || idx}
    className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#C2481F]/20 transition-all duration-300 text-center"
  >
    {iconUrl ? (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C2481F]/10 to-orange-50 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
        <img src={iconUrl} alt="" className="w-6 h-6 object-contain" />
      </div>
    ) : (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C2481F]/10 to-orange-50 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
        <TrendingUp className="w-6 h-6 text-[#C2481F]" />
      </div>
    )}

    {item.label && (
      <p className="text-3xl font-black text-[#C2481F] mb-1">{item.label}</p>
    )}
    {item.title && (
      <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
    )}
    {item.description && (
      <p className="text-gray-500 text-xs mt-1">{item.description}</p>
    )}
  </div>
);

export default function ModulePastResults({ data }) {
  if (!data) return null;

  const items = (data.content_items || []).filter((item) => item.is_active);
  const primaryImage = normalizeImageUrl(data.primary_image);

  return (
    <section id="module-past-results" className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[30rem] h-[30rem] bg-yellow-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          {data.super_heading && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-[#C2481F] bg-[#C2481F]/10 rounded-full mb-5">
              <Trophy className="w-4 h-4" />
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

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Stats Grid */}
          {items.length > 0 && (
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-5">
                {items.map((item, idx) => (
                  <ResultCard 
                    key={item.id || idx} 
                    item={item} 
                    iconUrl={normalizeImageUrl(item.icon)} 
                    idx={idx} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Image */}
          {primaryImage && (
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-r from-yellow-500/10 to-[#C2481F]/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={primaryImage}
                  alt={data.heading || "Past Results"}
                  className="relative rounded-2xl shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { normalizeImageUrl } from "@/lib/api";
import { BookMarked, CheckCircle2 } from "lucide-react";

export default function ModuleSubjectsCovered({ data }) {
  if (!data) return null;

  const items = (data.content_items || []).filter((item) => item.is_active);

  return (
    <section id="module-subjects-covered" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[20rem] h-[20rem] bg-[#C2481F]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          {data.super_heading && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-[#C2481F] bg-[#C2481F]/10 rounded-full mb-5">
              <BookMarked className="w-4 h-4" />
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

        {/* Subjects Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {items.map((item, idx) => {
              const iconUrl = normalizeImageUrl(item.icon);
              return (
                <div
                  key={item.id || idx}
                  className="group flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg hover:border-[#C2481F]/15 transition-all duration-300"
                >
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt={item.title || ""}
                      className="w-8 h-8 object-contain flex-shrink-0 mt-0.5"
                    />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-[#C2481F] flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    {item.title && (
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#C2481F] transition-colors">
                        {item.title}
                      </h4>
                    )}
                    {item.description && (
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    )}
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.tags.split(",").map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white text-gray-500 px-2 py-0.5 rounded border border-gray-200"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

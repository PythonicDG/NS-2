"use client";

import { normalizeImageUrl } from "@/lib/api";
import { BookOpen } from "lucide-react";

export default function ModuleCourseOverview({ data }) {
  if (!data) return null;

  const primaryImage = normalizeImageUrl(data.primary_image);

  return (
    <section id="module-course-overview" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-gradient-to-bl from-[#C2481F]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image Side */}
          {primaryImage && (
            <div className="w-full lg:w-5/12 flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-r from-[#C2481F]/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={primaryImage}
                  alt={data.heading || "Course Overview"}
                  className="relative rounded-2xl shadow-xl w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {data.overlay_title && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <p className="font-bold text-gray-900 text-sm">{data.overlay_title}</p>
                    {data.overlay_description && (
                      <p className="text-gray-600 text-xs mt-1">{data.overlay_description}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Text Side */}
          <div className={`w-full ${primaryImage ? "lg:w-7/12" : ""}`}>
            {data.super_heading && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-[#C2481F] bg-[#C2481F]/10 rounded-full mb-5">
                <BookOpen className="w-4 h-4" />
                {data.super_heading}
              </span>
            )}

            {data.heading && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                {data.heading}
                {data.highlighted_heading && (
                  <span className="text-[#C2481F]"> {data.highlighted_heading}</span>
                )}
              </h2>
            )}

            {data.subheading && (
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                {data.subheading}
              </p>
            )}

            {/* Content items as feature bullets */}
            {data.content_items?.length > 0 && (
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {data.content_items
                  .filter((item) => item.is_active)
                  .map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {item.icon ? (
                        <img
                          src={normalizeImageUrl(item.icon)}
                          alt={item.title || ""}
                          className="w-8 h-8 object-contain flex-shrink-0 mt-0.5"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-[#C2481F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[#C2481F] font-bold text-sm">{idx + 1}</span>
                        </div>
                      )}
                      <div>
                        {item.title && (
                          <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                        )}
                        {item.description && (
                          <p className="text-gray-500 text-sm mt-0.5">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* CTA */}
            {data.primary_button_text && (
              <div className="mt-8">
                <a
                  href={data.primary_button_url || "#"}
                  className="inline-flex items-center px-6 py-3 bg-[#C2481F] text-white font-semibold rounded-lg shadow-lg hover:bg-[#A63D1A] hover:shadow-xl transition-all duration-300"
                >
                  {data.primary_button_text}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

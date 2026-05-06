"use client";

import { normalizeImageUrl } from "@/lib/api";
import { GraduationCap, Linkedin } from "lucide-react";
import Image from "next/image";

export default function ModuleFaculty({ data }) {
  if (!data) return null;

  const items = (data.content_items || []).filter((item) => item.is_active);

  return (
    <section id="module-faculty" className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute -left-16 bottom-1/4 w-[24rem] h-[24rem] bg-[#C2481F]/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          {data.super_heading && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-[#C2481F] bg-[#C2481F]/10 rounded-full mb-5">
              <GraduationCap className="w-4 h-4" />
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

        {/* Faculty Cards */}
        {items.length > 0 && (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${items.length >= 3 ? "lg:grid-cols-3" : ""} ${items.length >= 4 ? "xl:grid-cols-4" : ""} gap-8 max-w-5xl mx-auto justify-items-center`}>
            {items.map((item, idx) => {
              const photoUrl = normalizeImageUrl(item.icon);
              return (
                <div
                  key={item.id || idx}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl hover:border-[#C2481F]/20 transition-all duration-400 w-full max-w-[280px]"
                >
                  {/* Photo */}
                  <div className="relative h-56 bg-gradient-to-b from-gray-100 to-gray-50 overflow-hidden">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={item.title || "Faculty"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C2481F] to-orange-500 flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">
                            {item.title?.charAt(0) || "F"}
                          </span>
                        </div>
                      </div>
                    )}
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-5 text-center">
                    {item.title && (
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                    )}
                    {item.label && (
                      <p className="text-[#C2481F] text-sm font-medium mb-2">{item.label}</p>
                    )}
                    {item.description && (
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    )}

                    {/* Tags as specializations */}
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                        {item.tags.split(",").map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-[#C2481F]/10 text-[#C2481F] px-2 py-0.5 rounded-md font-medium"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Social link */}
                    {item.primary_button_url && (
                      <a
                        href={item.primary_button_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 text-sm text-gray-400 hover:text-[#0077b5] transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </a>
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

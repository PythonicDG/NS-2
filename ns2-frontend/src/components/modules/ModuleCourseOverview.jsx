"use client";

import { normalizeImageUrl } from "@/lib/api";
import { BookOpen, FileDown, FileText } from "lucide-react";

/**
 * ModuleCourseOverview Component
 * 
 * Displays a detailed overview of a course module with an optional image and content bullets.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Module data containing heading, subheading, and content items
 * @param {string} props.brochure - URL to the module brochure
 * @param {string} props.syllabus - URL to the module syllabus
 * @returns {JSX.Element|null}
 */
export default function ModuleCourseOverview({ data, brochure, syllabus }) {
  if (!data) return null;

  const primaryImage = normalizeImageUrl(data.primary_image);
  const brochureUrl = normalizeImageUrl(brochure);
  const syllabusUrl = normalizeImageUrl(syllabus);
  const imageAlt = data.heading || data.super_heading || "Course Overview";

  return (
    <section id="module-course-overview" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image Side */}
          {primaryImage && (
            <div className="w-full lg:w-5/12 flex-shrink-0">
              <div className="relative">
                <img
                  src={primaryImage}
                  alt={imageAlt}
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
                {data.overlay_title && (
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-xl">
                    <p className="font-bold text-gray-900 text-sm sm:text-base leading-tight">{data.overlay_title}</p>
                    {data.overlay_description && (
                      <p className="text-gray-600 text-xs mt-1 leading-relaxed">{data.overlay_description}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Text Side */}
          <div className={`w-full ${primaryImage ? "lg:w-7/12" : ""}`}>
            {data.super_heading && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-[#C2481F] bg-[#C2481F]/10 rounded-full mb-6 uppercase tracking-wide">
                <BookOpen className="w-4 h-4" />
                {data.super_heading}
              </span>
            )}

            {data.heading && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                {data.heading}
                {data.highlighted_heading && (
                  <span className="text-[#C2481F]"> {data.highlighted_heading}</span>
                )}
              </h2>
            )}

            {data.subheading && (
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-10">
                {data.subheading}
              </p>
            )}

            {/* Content items in 2 columns */}
            {data.content_items?.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-8 mb-10">
                {data.content_items
                  .filter((item) => item.is_active)
                  .map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#FDF2F0] flex items-center justify-center flex-shrink-0 font-bold text-[#C2481F]">
                        {idx + 1}
                      </div>
                      <div>
                        {item.title && (
                          <h4 className="font-bold text-gray-900 text-base">{item.title}</h4>
                        )}
                        {item.description && (
                          <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* CTA Button */}
            <div className="flex flex-wrap gap-4">
              {(syllabusUrl || brochureUrl) && (
                <a
                  href={syllabusUrl || brochureUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-10 py-4 bg-[#C2481F] text-white font-bold rounded-xl shadow-lg shadow-[#C2481F]/20 hover:bg-[#A63D1A] transition-all duration-300"
                >
                  {syllabusUrl ? "View Full Syllabus" : "Download Brochure"}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

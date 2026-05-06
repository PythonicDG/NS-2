"use client";

import { normalizeImageUrl } from "@/lib/api";
import { ClipboardCheck, CheckCircle } from "lucide-react";

export default function ModuleEligibilityCriteria({ data }) {
  if (!data) return null;

  const items = (data.content_items || []).filter((item) => item.is_active);
  const primaryImage = normalizeImageUrl(data.primary_image);

  return (
    <section id="module-eligibility" className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[24rem] h-[24rem] bg-blue-500/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-7/12">
            {/* Section Header */}
            {data.super_heading && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-[#C2481F] bg-[#C2481F]/10 rounded-full mb-5">
                <ClipboardCheck className="w-4 h-4" />
                {data.super_heading}
              </span>
            )}

            {data.heading && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                {data.heading}
                {data.highlighted_heading && (
                  <span className="text-[#C2481F]"> {data.highlighted_heading}</span>
                )}
              </h2>
            )}

            {data.subheading && (
              <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                {data.subheading}
              </p>
            )}

            {/* Eligibility Items */}
            {items.length > 0 && (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C2481F]/15 transition-all duration-300"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
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
          </div>

          {/* Image Side */}
          {primaryImage && (
            <div className="w-full lg:w-5/12 flex-shrink-0">
              <div className="relative group sticky top-32">
                <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500/10 to-[#C2481F]/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={primaryImage}
                  alt={data.heading || "Eligibility"}
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

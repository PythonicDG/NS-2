"use client";

import { normalizeImageUrl } from "@/lib/api";
import { IndianRupee, Calendar, Clock, Users } from "lucide-react";

const DETAIL_ICONS = {
  fee: IndianRupee,
  batch: Calendar,
  duration: Clock,
  seats: Users,
};

export default function ModuleFeesBatchDetails({ data }) {
  if (!data) return null;

  const items = (data.content_items || []).filter((item) => item.is_active);

  return (
    <section id="module-fees-batch" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[24rem] h-[24rem] bg-[#C2481F]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          {data.super_heading && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-[#C2481F] bg-[#C2481F]/10 rounded-full mb-5">
              <IndianRupee className="w-4 h-4" />
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

        {/* Details Cards */}
        {items.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                {items.map((item, idx) => {
                  const iconUrl = normalizeImageUrl(item.icon);
                  const labelLower = (item.label || "").toLowerCase();
                  const FallbackIcon =
                    DETAIL_ICONS[labelLower] ||
                    (labelLower.includes("fee") ? IndianRupee :
                     labelLower.includes("batch") ? Calendar :
                     labelLower.includes("duration") ? Clock :
                     labelLower.includes("seat") ? Users : IndianRupee);

                  return (
                    <div
                      key={item.id || idx}
                      className="p-8 flex flex-col items-center text-center group hover:bg-white/5 transition-colors duration-300"
                    >
                      {iconUrl ? (
                        <div className="w-14 h-14 rounded-xl bg-[#C2481F]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <img src={iconUrl} alt="" className="w-7 h-7 object-contain" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-[#C2481F]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <FallbackIcon className="w-7 h-7 text-[#C2481F]" />
                        </div>
                      )}

                      {item.label && (
                        <span className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                          {item.label}
                        </span>
                      )}

                      {item.title && (
                        <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                      )}

                      {item.description && (
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* CTA inside the dark card */}
              {data.primary_button_text && (
                <div className="border-t border-white/10 p-6 text-center">
                  <a
                    href={data.primary_button_url || "#"}
                    className="inline-flex items-center px-8 py-3.5 bg-[#C2481F] text-white font-semibold rounded-xl shadow-lg hover:bg-[#A63D1A] hover:shadow-xl transition-all duration-300 active:scale-95"
                  >
                    {data.primary_button_text}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

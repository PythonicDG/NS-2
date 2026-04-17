"use client";

import React from "react";
import { normalizeImageUrl } from "@/lib/api";

export default function WhyChooseUsClient({ data }) {
  if (!data?.is_active) return null;

  const items = (data?.content_items || [])
    .filter((item) => item.is_active)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="py-16 bg-[#F8F9FA] dark:bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="mt-0 text-3xl md:text-4xl font-bold font-[Poppins] text-[#C2481F]">
            {data?.heading}
          </h2>
          {data?.subheading && (
            <p className="mt-2 text-gray-600 dark:text-[#6C757D] max-w-2xl mx-auto font-[Open_Sans] text-base leading-relaxed">
              {data.subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const iconUrl = normalizeImageUrl(item.icon);
            return (
              <div
                key={item.id}
                className="bg-[#F8F9FA] dark:bg-[#F8F9FA] rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  {iconUrl && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#007BFF]">
                        <img
                          src={iconUrl}
                          alt={item.title || ""}
                          className="w-6 h-6"
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold font-[Poppins] text-gray-900 dark:text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-[#6C757D] leading-relaxed font-[Open_Sans]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

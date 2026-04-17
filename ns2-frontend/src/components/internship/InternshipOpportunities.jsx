"use client";

import { normalizeImageUrl } from "@/lib/api";
import { Download } from "lucide-react";
import { useState } from "react";

export default function InternshipOpportunities({ initialData }) {
  const [data] = useState(initialData);

  if (!data) {
    return null;
  }

  return (
    <section className="py-16 bg-white relative">
      <div className="text-center max-w-3xl mx-auto px-6">
        {data.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.heading}
          </h2>
        )}
        {data.subheading && <p className="text-gray-600">{data.subheading}</p>}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6">
        {data.content_items?.map((item) => {
          const iconUrl = normalizeImageUrl(item.icon);
          return (
            <div
              key={item.id}
              className="bg-white rounded-[8px] shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
            >
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt={item.title || ""}
                  className="w-12 h-12 mb-4 object-contain"
                />
              )}

              {item.title && (
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="text-gray-600 mb-4">{item.description}</p>
              )}

              {item.primary_button_text && (
                <a
                  href={item.primary_button_url || "#"}
                  className="mt-auto text-sm font-medium text-[#C2481F] hover:underline flex items-center gap-1"
                >
                  {item.primary_button_text} <Download size={16} />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

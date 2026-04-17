"use client";

import { normalizeImageUrl } from "@/lib/api";
import { useState } from "react";

export default function WhyChooseUs({ initialData }) {
  const [data] = useState(initialData);

  if (!data || !data.is_active) {
    return null;
  }

  const {
    super_heading,
    heading,
    highlighted_heading,
    subheading,
    content_items,
  } = data;

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#F8F9FA] to-[#E0F2FF] overflow-hidden">
      <div className="absolute -top-32 -left-20 w-[36rem] h-[36rem] rounded-[8px] bg-gradient-to-br from-[#C2481F] to-transparent opacity-20 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-[8px] bg-gradient-to-br from-[#C2481F]/30 to-transparent opacity-20 blur-2xl" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {super_heading && (
          <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-[#C2481F] rounded-[8px] mb-6">
            {super_heading}
          </span>
        )}

        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          {heading}{" "}
          {highlighted_heading && (
            <span className="bg-gradient-to-r from-[#C2481F] to-[#6C63FF] bg-clip-text text-transparent">
              {highlighted_heading}
            </span>
          )}
        </h2>

        {subheading && (
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">{subheading}</p>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {content_items &&
            content_items
              .filter((item) => item.is_active)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-[8px] shadow-md text-left flex flex-col gap-4 hover:shadow-lg transition"
                >
                  <div className="flex items-start gap-4">
                    {item.icon && (
                      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#C2481F] to-[#6C63FF] text-white rounded-[8px] shrink-0">
                        <img
                          src={normalizeImageUrl(item.icon)}
                          alt={item.title || ""}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    )}
                    <div>
                      {item.title && (
                        <h3 className="font-semibold text-lg mb-2 text-gray-900">
                          {item.title}
                        </h3>
                      )}
                      {item.description && (
                        <p className="text-gray-600 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {item.tags && (
                    <ul className="list-disc list-inside text-gray-600 mt-2">
                      {item.tags.split(",").map((tag, index) => (
                        <li key={index}>{tag.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

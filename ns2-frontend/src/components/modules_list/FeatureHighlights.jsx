"use client";

import { normalizeImageUrl } from "@/lib/api";
import { useState } from "react";

export default function FeatureHighlights({ initialData }) {
  const [data] = useState(initialData);

  if (!data || !data.is_active) {
    return null;
  }

  const {
    heading,
    subheading,
    primary_button_text,
    primary_button_url,
    secondary_button_text,
    secondary_button_url,
    content_items,
  } = data;

  return (
    <section className="relative py-16 sm:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Features grid */}
        {content_items && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {content_items
              .filter((item) => item.is_active)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-[8px] shadow-md text-center flex flex-col items-center gap-4 hover:shadow-lg transition"
                >
                  {/* Icon */}
                  {item.icon && (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-[8px] mb-4">
                      <img
                        src={normalizeImageUrl(item.icon)}
                        alt={item.title}
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm">{item.description}</p>

                  {/* Tags (if any) */}
                  {item.tags && (
                    <ul className="list-disc list-inside text-gray-600 mt-2 text-left text-sm">
                      {item.tags.split(",").map((tag, index) => (
                        <li key={index}>{tag.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Text content and CTA Buttons in gradient box */}
        {(heading ||
          subheading ||
          primary_button_text ||
          secondary_button_text) && (
          <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 sm:p-8 rounded-[8px] shadow-md flex flex-col items-center gap-4">
            {/* Heading */}
            {heading && (
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                {heading}
              </h2>
            )}

            {/* Subheading */}
            {subheading && (
              <p className="text-gray-200 max-w-2xl text-sm sm:text-base">
                {subheading}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 w-full sm:w-auto text-center">
              {primary_button_text && primary_button_url && (
                <a
                  href={primary_button_url}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-[#C2481F] hover:bg-[#A63D1A] focus:bg-[#A63D1A] text-white rounded-[8px] font-semibold text-sm sm:text-base transition w-full sm:w-auto"
                >
                  {primary_button_text}
                </a>
              )}
              {secondary_button_text && secondary_button_url && (
                <a
                  href={secondary_button_url}
                  className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 text-gray-200 rounded-[8px] font-semibold text-sm sm:text-base hover:bg-gray-700 transition w-full sm:w-auto"
                >
                  {secondary_button_text}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

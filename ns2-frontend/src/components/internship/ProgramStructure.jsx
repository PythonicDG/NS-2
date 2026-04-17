"use client";

import { normalizeImageUrl } from "@/lib/api";
import { useState } from "react";

export default function ProgramStructure({ initialData }) {
  const [data] = useState(initialData);

  if (!data || !data.is_active) return null;

  const {
    heading,
    subheading,
    primary_image,
    overlay_description,
    content_items,
  } = data;

  const overlayItems = overlay_description
    ? overlay_description.split(",").map((item) => item.trim())
    : [];

  return (
    <section className="py-8 bg-gradient-to-b from-sky-50 via-white to-sky-100">
      {/* Constrained container that will also hold the gradient box */}
      <div className="max-w-5xl mx-auto px-6">
        {/* Gradient box INSIDE the constrained container */}
        <div className="bg-gradient-to-r from-slate-900 to-sky-700 rounded-[8px] p-8 mb-6 shadow-lg">
          {/* Heading row: icon left of title */}
          <div className="flex items-center gap-3 mb-4">
            {primary_image && (
              <img
                src={normalizeImageUrl(primary_image)}
                alt={heading}
                className="w-10 h-10 object-contain rounded-[8px]"
              />
            )}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {heading}
              </h2>
              {subheading && (
                <p className="text-gray-200 text-sm sm:text-base mt-1">
                  {subheading}
                </p>
              )}
            </div>
          </div>

          {/* Stats row */}
          {overlayItems.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {overlayItems.map((item, idx) => {
                const [number, ...rest] = item.split(" ");
                return (
                  <div
                    key={idx}
                    className="bg-black rounded-[8px] px-6 py-4 text-center flex flex-col items-center justify-center shadow"
                  >
                    <p className="text-2xl font-bold text-white leading-none">
                      {number}
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                      {rest.join(" ")}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Steps section */}
      <div className="max-w-5xl mx-auto px-6 py-12 relative">
        {/* Vertical timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-sky-100"></div>

        <div className="space-y-10">
          {content_items
            .filter((step) => step.is_active)
            .map((step) => (
              <div key={step.id} className="relative flex gap-6">
                {/* Icon circle */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-[8px] bg-gray-100 border flex items-center justify-center shadow">
                    {step.icon && (
                      <img
                        src={normalizeImageUrl(step.icon)}
                        alt={step.title}
                        className="w-6 h-6 object-contain"
                      />
                    )}
                  </div>
                </div>

                {/* Step card */}
                <div className="bg-white rounded-[8px] shadow p-6 flex-1">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    {step.label && (
                      <span className="text-xs sm:text-sm md:text-base font-medium text-[#C2481F] bg-sky-100 px-2 sm:px-3 py-1 rounded-[8px]">
                        {step.label}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mt-2">{step.description}</p>

                  {/* Tags */}
                  {step.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {step.tags.split(",").map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs sm:text-sm md:text-base bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-[8px]"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

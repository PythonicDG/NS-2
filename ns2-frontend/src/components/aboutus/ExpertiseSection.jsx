"use client";

import { motion } from "framer-motion";
import { normalizeImageUrl } from "@/lib/api";

/**
 * ExpertiseSection Component
 *
 * Displays the institute's expertise / differentiators in an animated card grid.
 * Maps to the "EXPERTISE" section_type from the About Us API.
 *
 * @param {Object} props
 * @param {Object} props.data - The EXPERTISE section data from the About Us API
 * @returns {JSX.Element}
 */
export default function ExpertiseSection({ data }) {
  if (!data) return null;

  const items = data.content_items?.filter((item) => item.is_active) || [];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-14">
          {data.super_heading && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold text-[#C2481F] tracking-widest uppercase mb-2"
            >
              {data.super_heading}
            </motion.p>
          )}
          {data.heading && (
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
            >
              {data.heading}
            </motion.h2>
          )}
          {data.subheading && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
            >
              {data.subheading}
            </motion.p>
          )}
        </div>

        {/* Cards Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item, idx) => {
              const imageUrl = normalizeImageUrl(item.image);
              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Icon/Image */}
                  {imageUrl && (
                    <div className="w-14 h-14 mb-5 rounded-xl bg-blue-50 flex items-center justify-center overflow-hidden group-hover:bg-blue-100 transition-colors">
                      <img
                        src={imageUrl}
                        alt={item.label || "Expertise"}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  )}

                  {/* Label / Title */}
                  {item.label && (
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                      {item.label}
                    </h3>
                  )}

                  {/* Description */}
                  {(item.description || item.title) && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description || item.title}
                    </p>
                  )}

                  {/* CTA link */}
                  {item.primary_button_text && (
                    <a
                      href={item.primary_button_url || "#"}
                      className="inline-flex items-center gap-1 text-[#C2481F] text-sm font-semibold mt-5 group-hover:gap-2 transition-all"
                    >
                      {item.primary_button_text}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Overview text */}
        {data.overview_text && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-gray-500 text-sm mt-10 max-w-2xl mx-auto"
          >
            {data.overview_text}
          </motion.p>
        )}
      </div>
    </section>
  );
}

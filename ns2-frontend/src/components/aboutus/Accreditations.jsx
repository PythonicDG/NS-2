"use client";

import { motion } from "framer-motion";
import { normalizeImageUrl } from "@/lib/api";
import { Award } from "lucide-react";

/**
 * Accreditations Component
 *
 * Displays the institute's accreditations, affiliations, and certifications
 * in a visually rich card/logo grid.
 * Maps to the "ACCREDITATIONS" section_type from the About Us API.
 *
 * Field mapping:
 * - heading → Section title
 * - subheading → Section subtitle
 * - content_items[].label → Accreditation name
 * - content_items[].title → Short subtitle / category
 * - content_items[].description → Description
 * - content_items[].image → Logo or badge image
 *
 * @param {Object} props
 * @param {Object} props.data - The ACCREDITATIONS section data
 * @returns {JSX.Element}
 */
export default function Accreditations({ data }) {
  if (!data) return null;

  const items = data.content_items?.filter((item) => item.is_active) || [];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
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

        {/* Accreditation Cards */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item, idx) => {
              const logoUrl = normalizeImageUrl(item.image);
              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Logo / Badge */}
                  {logoUrl ? (
                    <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden group-hover:bg-blue-50 transition-colors p-3">
                      <img
                        src={logoUrl}
                        alt={item.label || "Accreditation"}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-[#C2481F]/10 flex items-center justify-center">
                      <Award className="w-10 h-10 text-[#C2481F]" />
                    </div>
                  )}

                  {/* Name */}
                  {item.label && (
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.label}
                    </h3>
                  )}

                  {/* Subtitle */}
                  {item.title && (
                    <p className="text-[#C2481F] text-sm font-medium mb-3">
                      {item.title}
                    </p>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
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

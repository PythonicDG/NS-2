"use client";

import { motion } from "framer-motion";
import { normalizeImageUrl } from "@/lib/api";
import { Quote } from "lucide-react";

/**
 * DirectorMessage Component
 *
 * Displays the director/founder's photo and message in a premium split layout.
 * Maps to the "DIRECTOR_MESSAGE" section_type from the About Us API.
 *
 * Field mapping:
 * - heading → Section title (e.g., "Message from the Director")
 * - subheading → Director's name
 * - overview_text → Director's designation/role
 * - primary_image → Director's photo
 * - content_items[0].description → The message text
 *
 * @param {Object} props
 * @param {Object} props.data - The DIRECTOR_MESSAGE section data
 * @returns {JSX.Element}
 */
export default function DirectorMessage({ data }) {
  if (!data) return null;

  const message = data.content_items?.find((item) => item.is_active);
  const directorImage = normalizeImageUrl(data.primary_image);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#f8f9fc] to-[#eef1f6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        {data.super_heading && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-[#C2481F] tracking-widest uppercase text-center mb-2"
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-14"
          >
            {data.heading}
          </motion.h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Director Photo - 2 columns */}
          {directorImage && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 flex justify-center"
            >
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#C2481F]/20 to-[#0B3A6E]/20 rounded-3xl rotate-3" />
                <img
                  src={directorImage}
                  alt={data.subheading || "Director"}
                  className="relative w-full max-w-[380px] rounded-2xl shadow-2xl object-cover aspect-[3/4]"
                />
                {/* Name card overlay */}
                {data.subheading && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl px-6 py-3 text-center min-w-[200px]">
                    <p className="font-bold text-gray-900 text-lg">
                      {data.subheading}
                    </p>
                    {data.overview_text && (
                      <p className="text-[#C2481F] text-sm font-medium">
                        {data.overview_text}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Message Content - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={directorImage ? "lg:col-span-3" : "lg:col-span-5"}
          >
            {/* Quote icon */}
            <div className="mb-6">
              <div className="w-14 h-14 rounded-full bg-[#C2481F]/10 flex items-center justify-center">
                <Quote className="w-7 h-7 text-[#C2481F]" />
              </div>
            </div>

            {/* Message text */}
            {message?.description && (
              <blockquote className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line mb-8 border-l-4 border-[#C2481F]/30 pl-6">
                {message.description}
              </blockquote>
            )}

            {/* Signature area (when no image side) */}
            {!directorImage && data.subheading && (
              <div className="mt-6">
                <p className="font-bold text-gray-900 text-xl">
                  {data.subheading}
                </p>
                {data.overview_text && (
                  <p className="text-[#C2481F] text-sm font-medium mt-1">
                    {data.overview_text}
                  </p>
                )}
              </div>
            )}

            {/* CTA Button */}
            {data.primary_button_text && (
              <a
                href={data.primary_button_url || "#"}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C2481F] to-[#d85c34] text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 mt-4"
              >
                {data.primary_button_text}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

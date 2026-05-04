"use client";

import { motion } from "framer-motion";
import { normalizeImageUrl } from "@/lib/api";

/**
 * OurStory Component
 *
 * A vertical timeline showcasing the institute's milestones and history.
 * Maps to the "OUR_STORY" section_type from the About Us API.
 *
 * Field mapping:
 * - heading → Section title (e.g., "Our Journey")
 * - subheading → Section subtitle
 * - content_items[].label → Year or milestone label (e.g., "2018")
 * - content_items[].title → Milestone title
 * - content_items[].description → Milestone description
 * - content_items[].image → Optional milestone image
 *
 * @param {Object} props
 * @param {Object} props.data - The OUR_STORY section data
 * @returns {JSX.Element}
 */
export default function OurStory({ data }) {
  if (!data) return null;

  const milestones =
    data.content_items?.filter((item) => item.is_active) || [];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
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

        {/* Timeline */}
        {milestones.length > 0 && (
          <div className="relative">
            {/* Vertical line - center on desktop, left on mobile */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C2481F] via-[#0B3A6E] to-[#C2481F]" />

            <div className="space-y-12 md:space-y-16">
              {milestones.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                const itemImage = normalizeImageUrl(item.image);

                return (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`relative flex items-start md:items-center gap-6 md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#C2481F] border-4 border-white shadow-md z-10" />

                    {/* Content card */}
                    <div
                      className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                      }`}
                    >
                      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                        {/* Year/Label badge */}
                        {item.label && (
                          <span className="inline-block bg-[#C2481F]/10 text-[#C2481F] text-sm font-bold px-4 py-1 rounded-full mb-3">
                            {item.label}
                          </span>
                        )}

                        {/* Milestone image */}
                        {itemImage && (
                          <div className="mb-4 rounded-xl overflow-hidden">
                            <img
                              src={itemImage}
                              alt={item.title || item.label || "Milestone"}
                              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}

                        {/* Title */}
                        {item.title && (
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                        )}

                        {/* Description */}
                        {item.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

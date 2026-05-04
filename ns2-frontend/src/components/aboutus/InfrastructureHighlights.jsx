"use client";

import { motion } from "framer-motion";
import { normalizeImageUrl } from "@/lib/api";
import {
  Monitor,
  BookOpen,
  Wifi,
  Users,
  FlaskConical,
  Projector,
} from "lucide-react";

// Fallback icons mapped by index for items without images
const FALLBACK_ICONS = [Monitor, BookOpen, Wifi, Users, FlaskConical, Projector];

/**
 * InfrastructureHighlights Component
 *
 * Showcases the institute's infrastructure: classrooms, labs, library, tools, etc.
 * Maps to the "INFRASTRUCTURE" section_type from the About Us API.
 *
 * Field mapping:
 * - heading → Section title
 * - subheading → Section subtitle
 * - primary_image → Optional large infrastructure banner
 * - content_items[].label → Facility name
 * - content_items[].title → Short subtitle
 * - content_items[].description → Details
 * - content_items[].image → Facility photo
 *
 * @param {Object} props
 * @param {Object} props.data - The INFRASTRUCTURE section data
 * @returns {JSX.Element}
 */
export default function InfrastructureHighlights({ data }) {
  if (!data) return null;

  const items = data.content_items?.filter((item) => item.is_active) || [];
  const bannerImage = normalizeImageUrl(data.primary_image);

  return (
    <section className="py-16 md:py-24 bg-[#0B3A6E] overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute left-0 top-0 w-72 h-72 bg-blue-400 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-900 opacity-15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          {data.super_heading && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold text-orange-400 tracking-widest uppercase mb-2"
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
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
              className="mt-4 text-base sm:text-lg text-blue-200 max-w-2xl mx-auto"
            >
              {data.subheading}
            </motion.p>
          )}
        </div>

        {/* Infrastructure Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item, idx) => {
              const itemImage = normalizeImageUrl(item.image);
              const FallbackIcon = FALLBACK_ICONS[idx % FALLBACK_ICONS.length];

              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 overflow-hidden hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  {itemImage && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={itemImage}
                        alt={item.label || "Infrastructure"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Icon fallback when no image */}
                    {!itemImage && (
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                        <FallbackIcon className="w-6 h-6 text-orange-400" />
                      </div>
                    )}

                    {/* Label */}
                    {item.label && (
                      <h3 className="text-lg font-bold text-white mb-2">
                        {item.label}
                      </h3>
                    )}

                    {/* Title */}
                    {item.title && (
                      <p className="text-orange-300 text-sm font-medium mb-2">
                        {item.title}
                      </p>
                    )}

                    {/* Description */}
                    {item.description && (
                      <p className="text-blue-100/80 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Banner Image */}
        {bannerImage && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-14 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={bannerImage}
              alt={data.heading || "Infrastructure"}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

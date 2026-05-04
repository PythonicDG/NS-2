"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { normalizeImageUrl } from "@/lib/api";

/**
 * AboutHeroBanner Component
 *
 * A visually rich hero banner for the About Us page with breadcrumb navigation,
 * animated text, and dynamic background image from the API.
 *
 * @param {Object} props
 * @param {Object} props.data - The HERO section data from the About Us API
 * @returns {JSX.Element}
 */
export default function AboutHeroBanner({ data }) {
  if (!data) return null;

  const bgImage = normalizeImageUrl(data.background_image) || normalizeImageUrl(data.primary_image);

  return (
    <section className="relative w-full min-h-[340px] md:min-h-[420px] flex items-center overflow-hidden">
      {/* Background Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt={data.heading || "About Us"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B3A6E]/90 to-[#0E4C92]/75" />
        </div>
      )}

      {/* Fallback gradient if no image */}
      {!bgImage && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B3A6E] to-[#0E4C92]" />
      )}

      {/* Decorative circles */}
      <div className="absolute left-0 top-0 w-72 h-72 bg-blue-400 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-900 opacity-15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 z-0" />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-16 relative z-10 py-16 md:py-24">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm text-blue-200 mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-blue-300">/</span>
          <span className="text-white font-medium">About Us</span>
        </motion.nav>

        {/* Super Heading */}
        {data.super_heading && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3"
          >
            {data.super_heading}
          </motion.p>
        )}

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl"
        >
          {data.heading || "About Us"}
        </motion.h1>

        {/* Subheading */}
        {data.subheading && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-blue-100 text-base sm:text-lg mt-4 max-w-xl leading-relaxed opacity-90"
          >
            {data.subheading}
          </motion.p>
        )}

        {/* CTA Button */}
        {data.primary_button_text && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Link
              href={data.primary_button_url || "#contact"}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C2481F] to-[#d85c34] text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {data.primary_button_text}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

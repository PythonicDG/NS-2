// components/aboutus/CompanyGalleryClient.jsx

"use client";

import { motion } from "framer-motion";
import { normalizeImageUrl } from "@/lib/api";

export default function CompanyGalleryClient({ data }) {
  if (!data) return null;

  return (
    <section className="relative w-full py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Heading */}
        {data.super_heading && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold text-center text-gray-900"
          >
            {data.super_heading}
          </motion.h2>
        )}

        {data.heading && (
          <p className="mt-3 text-center text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {data.heading}
          </p>
        )}

        {/* Gallery Grid */}
        {data.content_items?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10">
            {data.content_items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[1/1] w-full overflow-hidden">
                  <img
                    src={normalizeImageUrl(item.image)}
                    alt={item.label}
                    className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500"></div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  <p className="text-white font-semibold text-sm md:text-base drop-shadow-lg">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Large Banner */}
        {data.primary_image && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mt-12 rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
              <img
                src={normalizeImageUrl(data.primary_image)}
                alt={data.subheading || "Company Headquarters"}
                className="w-full h-full object-cover transform transition duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition duration-500 flex flex-col items-center justify-end text-center text-white px-4 pb-6 md:pb-12">
              {data.subheading && (
                <h3 className="text-lg sm:text-xl md:text-3xl font-bold leading-tight">
                  {data.subheading}
                </h3>
              )}
              {data.overview_text && (
                <p className="mt-2 text-sm sm:text-base md:text-lg max-w-2xl">
                  {data.overview_text}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

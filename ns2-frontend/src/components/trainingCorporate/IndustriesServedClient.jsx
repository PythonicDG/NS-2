"use client";

import React from "react";
import { normalizeImageUrl } from "@/lib/api";
import { motion } from "framer-motion";

export default function IndustriesServedClient({ data }) {
  const items = (data?.content_items || [])
    .filter((item) => item.is_active)
    .slice()
    .sort((a, b) => a.order - b.order);

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12, scale: 0.995 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#C2481F]">
            {data?.heading || "Industry we serve"}
          </h2>
          {data?.subheading && (
            <p className="mt-4 text-sm sm:text-base text-[#6C757D] max-w-2xl mx-auto">
              {data.subheading}
            </p>
          )}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center"
        >
          {items.map((itemData) => {
            const iconUrl = normalizeImageUrl(itemData.icon);
            return (
              <motion.article
                key={itemData.id}
                variants={item}
                whileHover={{ translateY: -6, scale: 1.01 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 cursor-default"
                aria-labelledby={`industry-${itemData.id}-title`}
                role="article"
              >
                <div className="flex flex-col items-center text-center">
                  {iconUrl && (
                    <img
                      src={iconUrl}
                      alt={itemData.title || ""}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4"
                    />
                  )}

                  <h3
                    id={`industry-${itemData.id}-title`}
                    className="text-lg font-semibold text-gray-900 leading-tight"
                  >
                    {itemData.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#6C757D] leading-relaxed">
                    {itemData.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

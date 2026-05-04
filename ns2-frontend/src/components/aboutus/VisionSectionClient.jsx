// components/aboutus/VisionSectionClient.jsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { normalizeImageUrl } from "@/lib/api";
import { Laptop, Lightbulb, BarChart3 } from "lucide-react";

export default function VisionSectionClient({ data }) {
  if (!data || !Array.isArray(data.content_items)) return null;

  const [activeTab, setActiveTab] = useState(data.content_items[0]?.label);
  const activeContent = data.content_items.find(
    (item) => item.label === activeTab
  );

  return (
    <section className="relative w-full py-11 overflow-hidden bg-[linear-gradient(135deg,#E2E8F0,#F8FAFC)]">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Decorative shapes and icons */}
        <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/4 right-40 text-blue-500 opacity-30 z-0">
          <Lightbulb size={48} strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-1/3 left-16 text-blue-400 opacity-30 z-0">
          <Laptop size={52} strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-28 right-20 text-blue-500 opacity-30 z-0">
          <BarChart3 size={50} strokeWidth={1.5} />
        </div>
      </div>

      {/* Foreground Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Title */}
        {data.section_type && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900"
          >
            {data.section_type.replace(/_/g, " ")}
          </motion.h2>
        )}

        {/* Heading */}
        {data.heading && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-center text-gray-600 mt-4 max-w-3xl mx-auto"
          >
            {data.heading}
          </motion.p>
        )}

        {/* Tabs */}
        <div className="flex justify-center mt-8 space-x-4">
          {data.content_items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.label)}
              className={`px-4 py-2 rounded-lg font-medium shadow transition ${
                activeTab === item.label
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        {activeContent && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10"
            key={activeContent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Left Content */}
            <div className="flex-1 lg:ml-40">
              {activeContent.label && (
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {activeContent.label}
                </h3>
              )}
              {activeContent.description && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {activeContent.description}
                </p>
              )}
            </div>

            {/* Right Image */}
            {activeContent.image && (
              <motion.div
                className="flex justify-center items-center p-6 h-[400px]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img
                  src={normalizeImageUrl(activeContent.image)}
                  alt={activeContent.label || "Vision"}
                  className="w-full h-full object-cover rounded-[10px]"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

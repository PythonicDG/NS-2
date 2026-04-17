"use client";

import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { useState } from "react";

const activeColor = {
  bg: "bg-[#C2481F]",
  text: "text-[#C2481F]",
  lightBg: "bg-[#e3ebff]",
};

export default function WhatYouWillLearnClient({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  const [activeTab, setActiveTab] = useState(data[0].subheading);

  const activeIndex = data.findIndex((item) => item.subheading === activeTab);
  const activeSection = data[activeIndex];

  return (
    <section className="relative w-full py-12 bg-[linear-gradient(135deg,#E2E8F0,#F8FAFC)]">
      <div className="container mx-auto px-6 lg:px-12">
        {activeSection?.super_heading && (
          <div className="flex justify-center">
            <span
              className="inline-flex items-center gap-1.5 sm:gap-2 
                px-3 py-1 sm:px-2 sm:py-1 
                rounded-full bg-[#E6F0FF] text-[#007BFF] 
                text-xs sm:text-sm font-semibold shadow-md"
            >
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-yellow-400" />
              {activeSection.super_heading}
            </span>
          </div>
        )}
        {activeSection?.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mt-4">
            {activeSection.heading}
          </h2>
        )}
        {activeSection?.highlighted_heading && (
          <p className="text-lg md:text-xl text-center text-gray-600 mt-4 max-w-3xl mx-auto">
            {activeSection.highlighted_heading}
          </p>
        )}
        <div className="flex flex-wrap justify-center mt-8 gap-2">
          {data.map((section) => {
            const isActive = activeTab === section.subheading;

            return (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.subheading)}
              className={`px-5 py-2 rounded-[8px] font-medium shadow transition text-sm sm:text-base ${
                isActive
                  ? `${activeColor.bg} text-white`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {section.subheading}
            </button>

            );
          })}
        </div>
        {activeSection && (
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full md:w-11/12 lg:w-10/12 xl:w-8/12 mx-auto"
          >
            <div className="space-y-4">
              {activeSection.content_items?.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 bg-[linear-gradient(135deg,#E2E8F0,#F8FAFC)] rounded-xl shadow hover:shadow-md transition"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${activeColor.lightBg} ${activeColor.text} font-bold`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-gray-600 text-sm mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {item.label && (
                    <div className="mt-3 sm:mt-0 text-sm text-gray-500 text-left sm:text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${activeColor.lightBg} ${activeColor.text} font-medium`}
                      >
                        <Clock size={14} />
                        {item.label}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ProcessStepsSection({ data }) {
  if (!data || typeof data !== "object") return null;

  const {
    heading,
    subheading,
    content_items: steps = [],
  } = data;

  const orderedSteps = [...steps]
    .filter((step) => step.is_active)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          {heading}
        </motion.h2>

        {/* Subheading */}
        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto mb-16"
          >
            {subheading}
          </motion.p>
        )}

        {/* Steps */}
        <div className="relative">
          {/* Connecting line for steps */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-[#C2481F] to-[#A63D1A] w-3/4 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {orderedSteps.map((step, index) => {
              const iconUrl = step.icon
                ? `${API_BASE_URL}${step.icon}`
                : "/images/default-icon.svg";

              return (
                <motion.div
                  key={step.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step connector circles */}
                  {index < orderedSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-6 w-6 h-6 rounded-full bg-white border-4 border-[#C2481F] z-10"></div>
                  )}
                  
                  {/* Icon container with gradient background */}
                  <div className="relative w-24 h-24 bg-gradient-to-br from-[#C2481F] to-[#A63D1A] rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300">
                    <div className="absolute -inset-2 bg-blue-200 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <Image
                      src={iconUrl}
                      alt={step.title}
                      width={40}
                      height={40}
                      className="filter brightness-0 invert"
                    />
                    
                    {/* Step number badge */}
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#C2481F] to-[#A63D1A] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                      {step.order}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#C2481F] transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

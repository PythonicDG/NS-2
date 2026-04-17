"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function WhatWeProvideSection({ data }) {
  if (!data || typeof data !== "object") return null;

  const {
    heading,
    subheading,
    content_items: items = [],
  } = data;

  const services = [...items]
    .filter((item) => item.is_active)
    .sort((a, b) => a.order - b.order);

  const [showAll, setShowAll] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determine which services to display
  const displayedServices = !isMounted || !showAll ? services.slice(0, 3) : services;

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMTAgMGExMCAxMCAwIDEgMCAyMCAwYTEwIDEwIDAgMSAwIC0yMCAwIiBzdHJva2U9IiM1NTUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')]"></div>
      
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {heading}
          </motion.h2>

          {/* Subheading */}
          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {subheading}
            </motion.p>
          )}
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, index) => {
            const iconUrl = service.icon
              ? `${API_BASE_URL}${service.icon}`
              : "/images/default-icon.svg";

            const tags = service.tags
              ? service.tags.split(",").map((tag) => tag.trim())
              : [];

            // Extract price from tags if it contains pricing info
            const priceTag = tags.find((tag) =>
              tag.toLowerCase().includes("starting from")
            );

            // Filter out price tag from regular tags
            const filteredTags = tags.filter(tag => 
              !tag.toLowerCase().includes("starting from")
            );

            return (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative h-full"
              >
                {/* Main card */}
                <div className="bg-white p-8 rounded-lg shadow-sm h-full flex flex-col border border-gray-100 transition-all duration-300 group-hover:shadow-md">
                  
                  {/* Icon with subtle background */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                      <Image 
                        src={iconUrl} 
                        alt={service.title} 
                        width={28} 
                        height={28} 
                        className="text-blue-600"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{service.description}</p>

                  {/* Tags as features */}
                  {filteredTags.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-800 mb-3 uppercase tracking-wide">Key Features</h4>
                      <ul className="space-y-2">
                        {filteredTags.map((tag, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                            <span className="text-gray-700 text-sm">{tag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Price and CTA */}
                  {priceTag && (
                    <div className="mt-auto pt-5 border-t border-gray-100">
                      <p className="text-lg font-semibold text-gray-900 mb-4">{priceTag}</p>
                      <button className="w-full bg-gray-900 hover:bg-blue-700 text-white py-3 px-4 rounded transition-colors duration-300 text-sm font-medium">
                        Get Started
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* CTA Button - Only show if there are more than 3 services */}
        {services.length > 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-16"
          >
          <button 
            onClick={() => setShowAll(!showAll)}
            className="bg-[#C2481F] hover:bg-[#A63D1A] text-white py-3 px-8 rounded-[8px] font-medium transition-colors duration-300 flex items-center mx-auto border border-[#A63D1A]"
          >
            {showAll ? 'Show Less Services' : 'View All Services'}
            <svg 
              className={`ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>


          </motion.div>
        )}
      </div>
    </section>
  );
}

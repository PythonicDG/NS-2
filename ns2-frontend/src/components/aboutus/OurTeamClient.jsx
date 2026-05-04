"use client";

import { motion } from "framer-motion";
import { normalizeImageUrl } from "@/lib/api";
import { FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

// Helper to get initials from full name
function getInitials(name) {
  return name
    ?.split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function OurTeamClient({ data }) {
  if (!data?.content_items?.length) return null;

  const items = data.content_items;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading + Subheading */}
        <div className="text-center mb-12">
          {data.heading && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              {data.heading}{" "}
              {data.subheading && (
                <span className="text-blue-600">{data.subheading}</span>
              )}
            </h2>
          )}
          {data.overview_text && (
            <p className="mt-4 text-sm sm:text-base text-[#6C757D] max-w-2xl mx-auto">
              {data.overview_text}
            </p>
          )}
        </div>

        {/* Team Grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {items.map((item, index) => {
            const imageUrl = normalizeImageUrl(item.image);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-full sm:w-72 lg:w-80 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 group flex flex-col items-center text-center p-6 pb-8 border border-gray-100"
                whileHover={{ y: -5 }}
              >
                {/* Profile Image or Initials Fallback */}
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.label}
                    className="w-24 h-24 object-cover rounded-full shadow-md border-4 border-white ring-2 ring-gray-100"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xl font-semibold text-white shadow-md">
                    {getInitials(item.label)}
                  </div>
                )}

                {/* Name */}
                <h3 className="mt-5 text-xl font-semibold text-gray-900">
                  {item.label}
                </h3>

                {/* Title */}
                {item.title && (
                  <p className="mt-1 text-sm font-medium text-[#C2481F]">
                    {item.title}
                  </p>
                )}

                {/* Description */}
                {item.description && (
                  <p className="mt-3 text-sm text-[#6C757D] leading-relaxed flex-grow">
                    {item.description}
                  </p>
                )}

                {/* Social Links */}
                <div className="mt-5 flex gap-3">
                  {item.linkedin_url && (
                    <a
                      href={item.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all duration-300"
                    >
                      <FaLinkedin className="text-lg" />
                    </a>
                  )}
                  {item.twitter_url && (
                    <a
                      href={item.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all duration-300"
                    >
                      <FaTwitter className="text-lg" />
                    </a>
                  )}
                  {item.facebook_url && (
                    <a
                      href={item.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300"
                    >
                      <FaGlobe className="text-lg" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

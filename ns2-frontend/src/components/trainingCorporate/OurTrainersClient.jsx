"use client";

import { motion } from "framer-motion";
import { normalizeImageUrl } from "@/lib/api";
import { FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

export default function OurTrainersClient({ data }) {
  const items = (data?.content_items || [])
    .filter((item) => item.is_active)
    .sort((a, b) => a.order - b.order);

  if (!data?.is_active || items.length === 0) return null;

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words.length === 1
      ? words[0][0].toUpperCase()
      : (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#C2481F]">
            {data?.heading}
          </h2>
          {data?.subheading && (
            <p className="mt-4 text-sm sm:text-base text-[#6C757D] max-w-2xl mx-auto">
              {data.subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {items.map((item, index) => {
            const profileUrl = normalizeImageUrl(item.icon);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center bg-white rounded-lg p-6 shadow-md border border-gray-100 w-full max-w-sm"
              >
                <div className="w-full h-40 flex justify-center items-center mb-4 rounded-lg overflow-hidden">
                  {profileUrl ? (
                    <img
                      src={profileUrl}
                      alt={item.label}
                      className="h-full w-auto object-contain rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="h-24 w-24 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold text-2xl shadow-md">
                      {getInitials(item.label)}
                    </div>
                  )}
                </div>

                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {item.label}
                </h3>

                <p className="mt-1 text-sm font-medium text-[#C2481F]">
                  {item.title}
                </p>

                <p className="mt-3 text-sm text-[#6C757D] leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 flex gap-3">
                  {item.linkedin_url && (
                    <a
                      href={item.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white shadow"
                    >
                      <FaLinkedin className="text-lg" />
                    </a>
                  )}
                  {item.twitter_url && (
                    <a
                      href={item.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-400 text-white shadow"
                    >
                      <FaTwitter className="text-lg" />
                    </a>
                  )}
                  {item.other_social_url && (
                    <a
                      href={item.other_social_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-600 text-white shadow"
                    >
                      <FaGlobe className="text-lg" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

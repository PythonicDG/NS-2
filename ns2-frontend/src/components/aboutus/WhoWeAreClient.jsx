// components/aboutus/WhoWeAreClient.jsx
"use client";

import { motion } from "framer-motion";
import { normalizeImageUrl } from "@/lib/api";
import {
  Laptop,
  Rocket,
  Lightbulb,
  BarChart3,
  Smartphone,
  Cloud,
  Satellite,
  Camera,
  Microscope,
} from "lucide-react";

export default function WhoWeAreClient({ data }) {
  if (!data) return null;

  return (
    <section className="relative w-full py-5 overflow-hidden">
      {/* Wave Background - hidden on mobile */}
      <div className="absolute inset-0 z-0 hidden sm:block">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#cce9ff"
            fillOpacity="1"
            d="M0,160L80,170.7C160,181,320,203,480,208C640,213,800,203,960,213.3C1120,224,1280,256,1360,272L1440,288L1440,320L1360,320C1280,320,1120,320,
            960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Static Doodle Icons */}
      <div className="absolute top-10 left-12 text-blue-400 opacity-50 z-0">
        <Rocket size={50} strokeWidth={1.5} />
      </div>
      <div className="absolute top-1/3 right-20 text-blue-500 opacity-40 z-0">
        <Lightbulb size={48} strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-1/3 left-16 text-blue-400 opacity-50 z-0">
        <Laptop size={52} strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-28 right-32 text-blue-500 opacity-50 z-0">
        <BarChart3 size={50} strokeWidth={1.5} />
      </div>
      <div className="absolute top-[22%] left-1/2 text-blue-300 opacity-50 z-0">
        <Smartphone size={46} strokeWidth={1.5} />
      </div>
      <div className="absolute top-16 right-40 text-blue-400 opacity-50 z-0">
        <Cloud size={54} strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-12 left-1/3 text-blue-300 opacity-40 z-0">
        <Satellite size={48} strokeWidth={1.5} />
      </div>
      <div className="absolute top-1/4 left-1/4 text-blue-400 opacity-50 z-0">
        <Camera size={46} strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-1/4 right-1/4 text-blue-500 opacity-40 z-0">
        <Microscope size={50} strokeWidth={1.5} />
      </div>

      {/* Foreground Content */}
      <div className="container mx-auto bg-transparent px-6 lg:px-12 relative z-10">
        {/* Heading */}
        {data.heading && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800"
          >
            {data.heading}
          </motion.h2>
        )}

        {/* Content Box */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-transparent p-8 mt-2"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Image */}
          {data.primary_image && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-transparent overflow-hidden w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl"
            >
              <motion.img
                src={normalizeImageUrl(data.primary_image)}
                alt={data.heading || "Who We Are"}
                className="w-full h-full object-cover rounded-2xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {data.subheading && (
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {data.subheading}
              </h3>
            )}
            {data.overview_text && (
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.overview_text}
              </p>
            )}
            {data.content_items?.length > 0 && (
              <ul className="space-y-3">
                {data.content_items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">
                      ✓
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

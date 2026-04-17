"use client";

import { normalizeImageUrl } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSectionClient({ data }) {
  if (!data || !data.is_active) return null;

  const {
    heading,
    highlighted_heading,
    subheading,
    primary_button_text,
    primary_button_url,
    secondary_button_text,
    secondary_button_url,
    content_items = [],
  } = data;

  const iconItems = (content_items || []).filter(
    (item) => item.is_active && item.icon
  );

  const statItems = (content_items || []).filter(
    (item) => item.is_active && !item.icon
  );

  return (
    <section className="relative bg-white py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="#E5E7EB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </motion.div>

      <div className="relative max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          {heading}{" "}
          <span className="text-[#C2481F]">{highlighted_heading}</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          {subheading}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {primary_button_text && (
            <Link href={primary_button_url || "#"}>
              <button
                className="relative px-6 py-3 rounded bg-[#C2481F] text-white font-semibold shadow-md overflow-hidden group"
                type="button"
              >
                <span className="relative z-10">{primary_button_text}</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
              </button>
            </Link>
          )}

          {secondary_button_text && (
            <Link href={secondary_button_url || "#"}>
              <button
                className="relative px-6 py-3 rounded border border-[#C2481F] text-[#C2481F] font-semibold overflow-hidden group"
                type="button"
              >
                <span className="relative z-10">{secondary_button_text}</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#C2481F]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
              </button>
            </Link>
          )}
        </div>

        {iconItems.length > 0 && (
          <div className="mt-16 hero-icon-row">
            {iconItems.map((item) => (
              <div
                key={item.id}
                className="icon-card flex flex-col items-center text-center p-6 rounded-lg shadow-sm hover:shadow-lg transition bg-white"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#f6f9ff]">
                  <Image
                    src={normalizeImageUrl(item.icon)}
                    alt={item.title || "icon"}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-base text-gray-900">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div
          className={`${statItems.length === 0 ? "" : "mt-16"} ${iconItems.length === 0 ? "pt-12 border-t border-gray-200" : ""}`}
        >
          {statItems.length > 0 && (
            <div className="hero-stat-row">
              {statItems.map((stat) => (
                <div key={stat.id} className="stat-card">
                  <StatCounter stat={stat} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* ICONS: gap-6 (1.5rem) */
        .hero-icon-row { display:flex; flex-wrap:wrap; justify-content:center; gap:1.5rem; }
        .hero-icon-row .icon-card { box-sizing:border-box; }
        /* mobile: full width */
        @media (max-width:639px) {
          .hero-icon-row .icon-card { flex: 0 0 100%; max-width:100%; }
        }
        /* sm: 2 columns -> subtract 1 gap (1 * 1.5rem) distributed across 2 items */
        @media (min-width:640px) and (max-width:767px) {
          .hero-icon-row .icon-card { flex: 0 0 calc((100% - 1 * 1.5rem) / 2); max-width: calc((100% - 1 * 1.5rem) / 2); }
        }
        /* md and up: 3 columns -> subtract 2 gaps (2 * 1.5rem) across 3 items */
        @media (min-width:768px) {
          .hero-icon-row .icon-card { flex: 0 0 calc((100% - 2 * 1.5rem) / 3); max-width: calc((100% - 2 * 1.5rem) / 3); }
        }

        /* STATS: gap-8 (2rem) */
        .hero-stat-row { display:flex; flex-wrap:wrap; justify-content:center; gap:2rem; }
        .hero-stat-row .stat-card { box-sizing:border-box; text-align:center; }
        @media (max-width:639px) {
          .hero-stat-row .stat-card { flex: 0 0 100%; max-width:100%; }
        }
        /* sm: 2 columns, subtract 1 gap (2rem) */
        @media (min-width:640px) and (max-width:767px) {
          .hero-stat-row .stat-card { flex: 0 0 calc((100% - 1 * 2rem) / 2); max-width: calc((100% - 1 * 2rem) / 2); }
        }
        /* md and up: 4 columns, subtract 3 gaps (3 * 2rem) */
        @media (min-width:768px) {
          .hero-stat-row .stat-card { flex: 0 0 calc((100% - 3 * 2rem) / 4); max-width: calc((100% - 3 * 2rem) / 4); }
        }
      `}</style>
    </section>
  );
}

function StatCounter({ stat }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) setStart(true);
  }, [inView]);

  const parseNumber = (label) => {
    const match = label && label.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const getSuffix = (label) => {
    const match = label && label.match(/\d+/);
    if (!match) return label || "";
    const index = match.index + match[0].length;
    return label.slice(index);
  };

  const number = parseNumber(stat.label || "");
  const suffix = getSuffix(stat.label || "");

  return (
    <div ref={ref} className="text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-[#C2481F]">
        {start ? <CountUp end={number} duration={3} separator="," /> : number}
        {suffix}
      </h3>
      <p className="mt-2 text-gray-600">{stat.title}</p>
    </div>
  );
}

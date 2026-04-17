"use client";

import { normalizeImageUrl } from "@/lib/api";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
    primary_image,
    background_image,
  } = data;

  const bgUrl = normalizeImageUrl(primary_image || background_image);

  return (
    <section className="py-8 md:py-10 px-4 bg-[linear-gradient(135deg,#E2E8F0,#F8FAFC)]">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <div className="relative w-full h-[420px] sm:h-[480px] md:h-[560px] lg:h-[580px]">
            {bgUrl ? (
              <Image
                src={bgUrl}
                alt={heading || "Hero background"}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-50" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-y-0 left-6 md:left-12 lg:left-16 flex items-center"
            >
              <div className="max-w-xl md:max-w-2xl p-6 md:p-12 text-white">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                  {heading}
                  {highlighted_heading && (
                    <>
                      <br />
                      <span className="inline-block">
                        {highlighted_heading}
                      </span>
                    </>
                  )}
                </h1>

                {subheading && (
                  <p className="mt-4 text-sm md:text-lg text-white/90 max-w-md">
                    {subheading}
                  </p>
                )}

              <div className="mt-6 flex gap-4">
                {primary_button_text && (
                  <Link
                    href={primary_button_url || "#"}
                    className="inline-flex items-center px-5 py-3 text-white rounded-[8px] font-semibold shadow-md transition"
                    style={{
                      backgroundColor: "#C2481F",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#A63D1A")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#C2481F")}
                  >
                    {primary_button_text}
                  </Link>
                )}

                {secondary_button_text && (
                  <Link
                    href={secondary_button_url || "#"}
                    className="inline-flex items-center px-5 py-3 rounded-[8px] border border-white/30 text-white font-semibold"
                  >
                    {secondary_button_text}
                  </Link>
                )}
              </div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

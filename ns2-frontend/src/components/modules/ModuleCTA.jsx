"use client";

import { Phone, ArrowRight } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import Link from "next/link";

export default function ModuleCTA({ data }) {
  if (!data) return null;

  const bgImage = normalizeImageUrl(data.background_image);

  return (
    <section id="module-cta" className="relative py-16 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {bgImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B3A6E]/90 to-[#0E4C92]/85" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B3A6E] to-[#0E4C92]" />
        )}
      </div>

      {/* Decorative glow */}
      <div className="absolute left-0 top-0 w-72 h-72 bg-blue-400 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-900 opacity-20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text Side */}
          <div className="text-center md:text-left text-white max-w-xl">
            {data.super_heading && (
              <span className="inline-block px-4 py-1.5 text-sm font-semibold text-white bg-white/15 rounded-full mb-5 backdrop-blur-sm">
                {data.super_heading}
              </span>
            )}

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 tracking-tight">
              {data.heading || "Ready to Get Started?"}
            </h2>

            {data.subheading && (
              <p className="text-blue-100 text-lg font-medium mb-6 opacity-90">
                {data.subheading}
              </p>
            )}

            <div className="w-16 h-1 bg-orange-400 mb-8 mx-auto md:mx-0 rounded" />

            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
              {data.primary_button_text && (
                <Link
                  href={data.primary_button_url || "#"}
                  className="inline-flex items-center gap-3 bg-white text-[#0B3A6E] px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition-all shadow-xl active:scale-95 group"
                >
                  <Phone className="w-5 h-5 fill-[#0B3A6E] text-[#0B3A6E]" />
                  <span className="uppercase tracking-wider">
                    {data.primary_button_text}
                  </span>
                </Link>
              )}

              {data.secondary_button_text && (
                <Link
                  href={data.secondary_button_url || "#"}
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all group"
                >
                  <span>{data.secondary_button_text}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {data.overlay_title && (
              <p className="mt-6 text-xl font-bold tracking-wide text-white">
                {data.overlay_title}:{" "}
                <span className="text-orange-400">{data.overlay_description}</span>
              </p>
            )}
          </div>

          {/* Right decorative element (optional image) */}
          {data.primary_image && (
            <div className="flex-shrink-0">
              <img
                src={normalizeImageUrl(data.primary_image)}
                alt=""
                className="w-64 h-auto opacity-90"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

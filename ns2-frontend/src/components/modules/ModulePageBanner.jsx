"use client";

import { normalizeImageUrl } from "@/lib/api";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default function ModulePageBanner({ data, moduleTitle, brochure, syllabus }) {
  if (!data) return null;

  const bgImage = normalizeImageUrl(data.background_image);
  const downloadUrl = normalizeImageUrl(brochure || syllabus);

  return (
    <section
      id="module-page-banner"
      className="relative min-h-[340px] sm:min-h-[400px] flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {bgImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B3A6E] to-[#0E4C92]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#C2481F]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 py-16 sm:py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/internship" className="hover:text-white transition-colors">
            Programs
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">
            {data.heading || moduleTitle || "Module"}
          </span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight max-w-3xl">
          {data.heading || moduleTitle}
          {data.highlighted_heading && (
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#C2481F] mt-1">
              {data.highlighted_heading}
            </span>
          )}
        </h1>

        {data.subheading && (
          <p className="mt-4 text-lg text-white/80 max-w-2xl leading-relaxed">
            {data.subheading}
          </p>
        )}

        {/* CTA Buttons */}
        {(data.primary_button_text || data.secondary_button_text) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {data.primary_button_text && (
              <a
                href={data.primary_button_url || "#"}
                className="px-8 py-3.5 bg-[#C2481F] text-white font-semibold rounded-lg shadow-lg hover:bg-[#A63D1A] hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                {data.primary_button_text}
              </a>
            )}
            {data.secondary_button_text && (
              <a
                href={downloadUrl || "#"}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {data.secondary_button_text}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";

export default function Hero({ data }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = useMemo(() => {
    if (!data) return [];
    const itemImages = (data.content_items || [])
      .map((item) => normalizeImageUrl(item.icon))
      .filter(Boolean);
    const background = normalizeImageUrl(data.background_image);
    return itemImages.length ? itemImages : background ? [background] : [];
  }, [data]);

  useEffect(() => {
    if (images.length <= 1) return undefined;
    const timer = window.setInterval(
      () => setCurrentImageIndex((index) => (index + 1) % images.length),
      7000
    );
    return () => window.clearInterval(timer);
  }, [images.length]);

  if (!data) return null;

  const highlights = (data.content_items || []).filter(
    (item) => item.is_active !== false && (item.label || item.title)
  );
  const announcements = data.announcements?.length
    ? data.announcements.slice(0, 3)
    : [{ text: "Admissions open for upcoming automation batches" }];

  return (
    <section aria-labelledby="home-hero-title" className="relative isolate overflow-hidden bg-[#11100f] text-white">
      {images[currentImageIndex] && (
        <Image src={images[currentImageIndex]} alt="" fill priority sizes="100vw" quality={78} className="-z-20 object-cover object-center opacity-45" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/80 to-black/30" />

      <div className="border-b border-white/10 bg-[#C2481F]">
        <div className="announcement-marquee mx-auto max-w-7xl overflow-hidden px-4 py-2.5 text-xs font-semibold sm:text-sm">
          <div className="announcement-marquee__track">
            {[0, 1].map((copy) => (
              <div key={copy} className="announcement-marquee__group" aria-hidden={copy === 1 ? true : undefined}>
                {announcements.map((announcement, index) => (
                  <span key={index}>{announcement.text}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid min-h-[560px] max-w-7xl items-center px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,.9fr)] lg:px-8 lg:py-24">
        <div className="max-w-3xl text-center lg:text-left">
          {data.super_heading && <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-orange-300">{data.super_heading}</p>}
          <h1 id="home-hero-title" className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">{data.heading}</h1>
          {data.subheading && <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-gray-200 sm:text-lg lg:mx-0">{data.subheading}</p>}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            {data.primary_button_text && (
              <Link href={data.primary_button_url || "/modules"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#C2481F] px-6 py-3 font-bold text-white shadow-lg transition hover:bg-[#A63D1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                {data.primary_button_text}<ArrowRight aria-hidden="true" className="h-5 w-5" />
              </Link>
            )}
            {data.secondary_button_text && (
              <Link href={data.secondary_button_url || "/contact"} className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{data.secondary_button_text}</Link>
            )}
          </div>
        </div>
      </div>

      {highlights.length > 0 && (
        <div className="border-t border-white/10 bg-black/45 backdrop-blur-sm">
          <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.slice(0, 4).map((item, index) => (
              <li key={`${item.label}-${index}`} className="flex items-center gap-3 bg-[#171513]/95 px-5 py-5 sm:py-6">
                <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-orange-400" />
                <div className="min-w-0"><p className="font-bold text-white">{item.label}</p>{item.title && <p className="text-sm text-gray-300">{item.title}</p>}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

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
    <section aria-labelledby="home-hero-title" className="home-hero relative isolate flex min-h-[calc(100svh-73px)] flex-col overflow-hidden bg-[#11100f] text-white sm:min-h-[calc(100svh-81px)] md:min-h-[calc(100svh-89px)] lg:min-h-0">
      <div className="home-hero__visual contents">
      {images[currentImageIndex] && (
        <Image src={images[currentImageIndex]} alt="" fill priority sizes="100vw" quality={78} className="-z-20 object-cover object-center opacity-45" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/75 to-black/25" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(194,72,31,0.18),transparent_60%)]" />

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

      <div className="home-hero__content mx-auto grid w-full max-w-7xl flex-1 items-center px-4 py-6 sm:px-6 sm:py-8 lg:min-h-[clamp(380px,60svh,500px)] lg:items-start lg:grid-cols-[minmax(0,1.35fr)_minmax(240px,.65fr)] lg:px-8 lg:pb-16 lg:pt-10">
        <div className="max-w-3xl text-center lg:text-left">
          {data.super_heading && <p className="mb-3 text-xs font-bold uppercase leading-5 tracking-[0.18em] text-orange-300 sm:text-sm">{data.super_heading}</p>}
          <h1 id="home-hero-title" className="text-balance text-[clamp(1.75rem,7.5vw,2.25rem)] font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">{data.heading}</h1>
          {data.subheading && <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-gray-200 sm:mt-4 sm:text-lg lg:mx-0">{data.subheading}</p>}
          <div className="home-hero__actions mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
            {data.primary_button_text && (
              <Link href={data.primary_button_url || "/modules"} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-orange-300/20 bg-gradient-to-r from-[#C2481F] to-[#d85c34] px-6 py-3 font-bold text-white shadow-lg shadow-orange-950/30 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                {data.primary_button_text}<ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            {data.secondary_button_text && (
              <Link href={data.secondary_button_url || "/contact"} className="home-hero__secondary inline-flex min-h-12 items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{data.secondary_button_text}</Link>
            )}
          </div>
        </div>
      </div>
      </div>

      {highlights.length > 0 && (
        <div className="home-hero__features mt-auto shrink-0 border-t border-white/10 bg-black/45 backdrop-blur-sm">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
            {highlights.slice(0, 4).map((item, index) => (
              <li key={`${item.label}-${index}`} className="flex min-w-0 items-start gap-2 bg-[#171513]/95 px-3 py-3 sm:items-center sm:gap-3 sm:px-5 sm:py-6">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-400 sm:mt-0 sm:h-5 sm:w-5" />
                <div className="min-w-0 break-words"><p className="text-xs font-bold leading-5 text-white sm:text-base">{item.label}</p>{item.title && <p className="mt-0.5 text-[11px] leading-4 text-gray-300 sm:text-sm sm:leading-5">{item.title}</p>}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

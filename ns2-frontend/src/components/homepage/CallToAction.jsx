"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function CallToAction({ data }) {
  if (!data) return null;
  return (
    <section aria-labelledby="home-cta-title" className="bg-[#171513] py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div className="max-w-3xl text-center lg:text-left">
          {data.super_heading && <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">{data.super_heading}</p>}
          <h2 id="home-cta-title" className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{data.heading}</h2>
          {data.subheading && <p className="mt-5 text-lg leading-8 text-stone-300">{data.subheading}</p>}
          {data.overview_text && <p className="mt-3 font-semibold text-orange-300">{data.overview_text}</p>}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link href={data.primary_button_url || "/contact"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#C2481F] px-7 py-3 font-bold text-white transition hover:bg-[#A63D1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <PhoneCall aria-hidden="true" className="h-5 w-5" />{data.primary_button_text || "Call now"}
          </Link>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 px-7 py-3 font-bold transition hover:bg-white hover:text-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Send an enquiry <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

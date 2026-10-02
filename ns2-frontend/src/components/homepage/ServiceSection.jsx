"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";

export const ServicesSection = ({ data = {} }) => {
  const items = (data.content_items || []).filter((item) => item.is_active !== false);
  return (
    <section aria-labelledby="programs-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {data.super_heading && <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C2481F]">{data.super_heading}</p>}
          <h2 id="programs-title" className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">{data.heading}</h2>
          {data.subheading && <p className="mt-5 text-lg leading-8 text-gray-600">{data.subheading}</p>}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const href = item.question || (item.text?.startsWith("/") ? item.text : "/modules");
            return (
              <article key={item.label || index} className="flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-8">
                {item.icon && <div className="relative mb-5 h-14 w-14 overflow-hidden rounded-xl bg-orange-50"><Image src={normalizeImageUrl(item.icon)} alt="" fill sizes="56px" className="object-contain p-2" /></div>}
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#C2481F]">{item.label}</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-950">{item.title}</h3>
                <p className="mt-4 flex-1 break-words text-sm leading-7 text-gray-600">{item.description}</p>
                <Link href={href} className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-lg font-bold text-[#A63D1A] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2481F]">
                  View program <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

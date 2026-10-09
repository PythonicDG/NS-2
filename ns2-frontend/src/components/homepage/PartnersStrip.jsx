import Image from "next/image";
import { normalizeImageUrl } from "@/lib/api";

export default function PartnersStrip({ data }) {
  if (!data || data.is_active === false) return null;

  const partners = (data.content_items || [])
    .filter((partner) => partner.is_active !== false && partner.title)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (!partners.length) return null;

  return (
    <section
      aria-label={data.heading || "Strategic partners"}
      className="border-y border-stone-200 bg-white py-8 sm:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {data.heading && (
            <h2 className="text-sm font-semibold tracking-wide text-[#C2481F] sm:text-base">
              {data.heading}
            </h2>
          )}
          {data.subheading && (
            <p className="mx-auto mt-2 max-w-3xl text-lg font-semibold leading-relaxed text-stone-900 sm:text-xl">
              {data.subheading}
            </p>
          )}
        </div>
        <ul className="mt-6 flex flex-wrap items-stretch justify-center gap-4 sm:gap-6">
          {partners.map((partner, index) => {
            const logo = normalizeImageUrl(partner.icon);
            return (
              <li
                key={`${partner.title}-${index}`}
                className="flex w-full min-w-0 flex-col items-center justify-center rounded-xl border border-stone-200 bg-stone-50/60 px-6 py-5 text-center sm:w-60"
              >
                {logo ? (
                  <div className="relative h-20 w-full max-w-48">
                    <Image
                      src={logo}
                      alt={`${partner.title} logo`}
                      fill
                      sizes="192px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <p className="flex min-h-20 items-center break-words text-2xl font-bold tracking-wide text-stone-800">
                    {partner.title}
                  </p>
                )}
                {partner.description && (
                  <p className="mt-3 break-words text-sm leading-relaxed text-stone-600">
                    {partner.description}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

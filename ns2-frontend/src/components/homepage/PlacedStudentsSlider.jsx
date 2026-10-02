import Image from "next/image";
import { normalizeImageUrl } from "@/lib/api";

export default function PlacedStudentsSlider({ items = [] }) {
  const validItems = items.filter((item) => item?.is_active !== false && item?.title);
  if (!validItems.length) return null;

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {validItems.map((item, index) => (
        <li key={item.title || index} className="min-w-0 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="relative aspect-square bg-stone-100">
            {item.icon ? (
              <Image src={normalizeImageUrl(item.icon)} alt={`Placement announcement for ${item.title}, ${item.description || "engineering graduate"}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#C2481F] to-orange-500 text-4xl font-bold text-white" aria-hidden="true">{item.title.charAt(0)}</div>
            )}
          </div>
          <div className="p-5">
            <h3 className="break-words text-lg font-bold text-gray-950">{item.title}</h3>
            {item.description && <p className="mt-1 font-semibold text-[#A63D1A]">{item.description}</p>}
            {item.text && <p className="mt-2 break-words text-sm leading-6 text-gray-600">{item.text}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

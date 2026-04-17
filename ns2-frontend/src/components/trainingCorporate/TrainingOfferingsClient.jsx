"use client";

import Image from "next/image";
import { normalizeImageUrl } from "@/lib/api";

export default function TrainingOfferingsClient({ data }) {
  if (!data) return null;

  const items = (data.content_items || []).filter((item) => item.is_active);

  const handleDownload = async (id, title) => {
    try {
      console.log("Fetching brochure for ID:", id);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training/download_brochure/${id}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch brochure URL");
      }

      const data = await res.json();
      console.log("Download API response:", data);

      if (!data.brochure_url) {
        throw new Error("No brochure URL found in response");
      }

      const urlParts = data.brochure_url.split("/");
      const fileName =
        urlParts[urlParts.length - 1] || `${title || "brochure"}.pdf`;

      console.log("Resolved file name:", fileName);

      const fileRes = await fetch(data.brochure_url);
      if (!fileRes.ok) {
        throw new Error("Failed to fetch brochure file");
      }

      const blob = await fileRes.blob();
      console.log("Blob type:", blob.type, "Blob size:", blob.size);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log("✅ Download started:", fileName);
    } catch (error) {
      console.error("Download error:", error);
      alert("Unable to download the file. Please try again later.");
    }
  };

  return (
    <section
      id="corporate-training"
      className="bg-white text-gray-600 py-16 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#C2481F]">
          {data.heading}
        </h2>
        <p className="mt-4 text-gray-600">{data.subheading}</p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-lg bg-gray-100">
                <Image
                  src={normalizeImageUrl(item.icon)}
                  width={40}
                  height={40}
                  alt={item.title}
                />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
            </div>

            <p className="text-gray-600 mb-4">{item.description}</p>

            {item.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.split(",").map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={() => handleDownload(item.id, item.title)}
              className={`mt-auto inline-block text-white text-center font-medium rounded-md px-6 py-2 ${
                item.title === "Technical Skills"
                  ? "bg-green-600 hover:bg-green-700"
                  : item.title === "Soft Skills"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#007BFF] hover:bg-[#0069d9]"
              }`}
            >
              {item.primary_button_text}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

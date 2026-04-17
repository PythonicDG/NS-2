"use client";

import Image from "next/image";

export default function AboutCorporateClient({ data }) {
  if (!data) return null;

  const activeItems = (data.content_items || []).filter(
    (item) => item.is_active
  );

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  return (
    <section className="relative bg-[#F8F9FA] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h3 className="text-lg font-semibold text-[#6C757D] uppercase tracking-wide font-heading">
            {data.super_heading}
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 font-heading">
            <span className="text-[#C2481F]">{data.heading}</span>
          </h2>
          <h4 className="text-lg md:text-xl font-semibold text-[#6C757D] mt-4 font-heading">
            {data.highlighted_heading}
          </h4>
          <p className="text-[#6C757D] mt-4 leading-relaxed font-body">
            {data.subheading}
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activeItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3">
                {item.icon && apiBase && (
                  <Image
                    src={`${apiBase}${item.icon}`}
                    alt={item.title || "Icon"}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                )}
                <div>
                  <h5 className="font-semibold text-[#C2481F] font-heading">
                    {item.title}
                  </h5>
                  <p className="text-sm text-[#6C757D] font-body">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full max-w-md mx-auto">
          <div
            className="absolute -left-4 top-4 w-full h-[105%] rounded-[8px]"
            style={{
              background: "#F8F9FA",
              boxShadow: "8px 8px 20px rgba(21, 93, 252, 0.2)",
            }}
          ></div>

          <div className="relative w-full h-[360px] md:h-[480px]">
            <Image
              src={`${apiBase}${data.primary_image}`}
              alt="Corporate Training"
              fill
              className="object-cover relative z-10"
              style={{
                borderRadius: "8px",
                boxShadow: "0 10px 25px rgba(21, 93, 252, 0.3)",
              }}
            />

            <div
              className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 shadow-md z-20"
              style={{ borderRadius: "8px" }}
            >
              <h5 className="font-semibold text-[#C2481F] font-heading">
                {data.overlay_title}
              </h5>
              <p className="text-sm text-[#6C757D] font-body">
                {data.overlay_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { normalizeImageUrl } from "@/lib/api";

/**
 * ContactUs Component
 * 
 * A section-based contact component that uses the shared ContactForm.
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.data - Dynamic content data fetched from the API
 * @returns {JSX.Element} The rendered ContactUs section
 */
export default function ContactUs({ data }) {
  if (!data) return null;

  return (
    <section id="contact" className="w-full py-16 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#C2481F] animate-pulse drop-shadow-[0_0_8px_rgba(21,93,252,0.8)]">
            + Get In Touch
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2"
            style={{ color: "#C2481F" }}
          >
            {data.super_heading}
          </h2>
          <p
            className="text-base sm:text-lg mt-4 max-w-2xl mx-auto"
            style={{ color: "#212529" }}
          >
            {data.heading}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left side */}
          <div>
            <h3
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: "#C2481F" }}
            >
              {data.subheading}
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              {data.overview_text}
            </p>

            <div className="space-y-6">
              {data.content_items
                ?.filter(
                  (item) =>
                    item.is_active &&
                    (item.label || item.title || item.description)
                )
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start p-5 rounded-2xl shadow-md bg-white border border-gray-200"
                  >
                    {item.icon && (
                      <img
                        src={normalizeImageUrl(item.icon)}
                        alt={item.label || "contact icon"}
                        className="w-10 h-10 mr-4 object-contain"
                      />
                    )}
                    <div>
                      {item.label && (
                        <h4 className="font-semibold text-black">
                          {item.label}
                        </h4>
                      )}
                      {item.title && (
                        <p className="text-black text-sm">{item.title}</p>
                      )}
                      {item.description && (
                        <p className="text-[#C2481F] font-medium mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6">
              <p className="font-semibold text-black">Follow Us</p>
              <div className="flex space-x-4 mt-3">
                {data.social_links?.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={normalizeImageUrl(link.icon)}
                      alt={link.platform}
                      className="w-6 h-6 transition-transform hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg bg-white border border-gray-200 overflow-hidden h-[300px] lg:h-[400px] min-h-[300px] lg:self-center">
            {data.map_url || data.company_address ? (
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={
                  data.map_url ||
                  `https://maps.google.com/maps?q=${encodeURIComponent(
                    `Modern Institute of Automation, ${data.company_address
                      ?.split(",")
                      .filter(part => !part.toLowerCase().includes("flat") && !part.toLowerCase().includes("floor"))
                      .join(",")}`
                  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`
                }
                title="Company Location"
              ></iframe>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-8 text-center">
                <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-lg font-medium">Location Map Unavailable</p>
                <p className="text-sm">Please contact us for directions.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

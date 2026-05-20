export const metadata = {
  title: "MIA | Contact Us",
  description:
    "Get in touch with Modern Institute of Automation (MIA). Contact us for course enrollments, batch details, collaboration, or technical support.",
};

export const revalidate = 0; // Full SSR (no cache)

import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import FAQSection from "@/components/homepage/FAQSection";
import { fetchHomepageSection } from "@/lib/api";
import { MapPin } from "lucide-react";

/**
 * ContactPage Component
 * 
 * Renders the separate, dedicated /contact page of the website.
 * Follows premium visual standards, layout conventions, and fetches dynamic
 * CMS contact details and FAQs directly from the API.
 * 
 * @returns {Promise<JSX.Element>}
 */
export default async function ContactPage() {
  const [contactData, faqData] = await Promise.all([
    fetchHomepageSection("Contact Us"),
    fetchHomepageSection("Frequently Asked Questions"),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero / Banner Section with breadcrumbs */}
      <ContactHero />

      {/* 2. Contact details cards and the interactive Contact Form */}
      <ContactDetails data={contactData} />

      {/* 3. Google Map Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#C2481F] uppercase tracking-wider bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
              Our Location
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3A6E] mt-4 mb-2">
              Find Us on the Map
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              We are located in Pune's primary training hub. Use the interactive map below to plan your route.
            </p>
          </div>

          <div className="rounded-3xl shadow-xl bg-white border border-gray-100 overflow-hidden h-[400px] sm:h-[450px] lg:h-[500px] relative">
            {contactData?.map_url || contactData?.company_address ? (
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={
                  contactData?.map_url ||
                  `https://maps.google.com/maps?q=${encodeURIComponent(
                    `Modern Institute of Automation, ${contactData?.company_address
                      ?.split(",")
                      .filter(part => !part.toLowerCase().includes("flat") && !part.toLowerCase().includes("floor"))
                      .join(",")}`
                  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`
                }
                title="Company Location Map"
              ></iframe>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-8 text-center">
                <MapPin className="w-16 h-16 mb-4 opacity-25 text-[#C2481F]" />
                <p className="text-lg font-bold text-gray-700">Location Map Unavailable</p>
                <p className="text-sm text-gray-500 mt-1">Please contact our support for directions.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions Section */}
      {faqData && <FAQSection data={faqData} />}
    </main>
  );
}

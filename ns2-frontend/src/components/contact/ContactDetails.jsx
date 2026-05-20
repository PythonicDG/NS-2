"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Share2 } from "lucide-react";
import ContactForm from "@/components/common/ContactForm";
import { normalizeImageUrl } from "@/lib/api";

/**
 * ContactDetails Component
 * 
 * Renders the two-column contact details and form section.
 * Reuses the existing ContactForm component and provides robust fallbacks
 * and visual effects consistent with the rest of the application.
 * 
 * @param {Object} props
 * @param {Object} props.data - Dynamic content data fetched from the Contact Us API section
 * @returns {JSX.Element}
 */
export default function ContactDetails({ data }) {
  // If we have content items from API, use them. Otherwise, fall back to robust default values
  const defaultItems = [
    {
      label: "Our Campus Address",
      title: data?.company_address || "Modern Institute of Automation, Pune, Maharashtra",
      description: "Visit us for a campus tour",
      iconType: MapPin,
    },
    {
      label: "Phone Number",
      title: data?.phone || "+91 98765 43210",
      description: "Mon-Sat from 9am to 6pm",
      iconType: Phone,
    },
    {
      label: "Email Address",
      title: data?.email || "info@moderninstituteofautomation.com",
      description: "Support response within 24 hours",
      iconType: Mail,
    },
    {
      label: "Working Hours",
      title: "Monday - Saturday: 9:00 AM - 6:00 PM",
      description: "Sunday: Closed",
      iconType: Clock,
    }
  ];

  const displayItems = data?.content_items?.length > 0 
    ? data.content_items.filter(item => item.is_active)
    : null;

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#C2481F] uppercase tracking-wider bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
                Contact Information
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3A6E] mt-4 mb-2">
                We'd Love to Hear From You
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Connect with our advisors to choose the right batch, ask about student support, or collaborate on automation initiatives.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {displayItems 
                ? displayItems.map((item, idx) => {
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="flex items-start p-6 rounded-2xl shadow-sm bg-white border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
                      >
                        {item.icon ? (
                          <div className="p-3 bg-orange-50 rounded-xl mr-4 group-hover:scale-105 transition-transform flex-shrink-0">
                            <img
                              src={normalizeImageUrl(item.icon)}
                              alt={item.label || "icon"}
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                        ) : (
                          <div className="p-3 bg-orange-50 rounded-xl mr-4 group-hover:scale-105 transition-transform flex-shrink-0 text-[#C2481F]">
                            <MapPin size={24} />
                          </div>
                        )}
                        <div>
                          {item.label && (
                            <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                              {item.label}
                            </h4>
                          )}
                          {item.title && (
                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-1">
                              {item.title}
                            </p>
                          )}
                          {item.description && (
                            <p className="text-[#C2481F] text-xs font-semibold">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                : defaultItems.map((item, idx) => {
                    const IconComponent = item.iconType;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="flex items-start p-6 rounded-2xl shadow-sm bg-white border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
                      >
                        <div className="p-3 bg-orange-50 rounded-xl mr-4 text-[#C2481F] group-hover:scale-105 transition-transform flex-shrink-0">
                          <IconComponent size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                            {item.label}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-1">
                            {item.title}
                          </p>
                          <p className="text-[#C2481F] text-xs font-semibold">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })
              }
            </div>

            {/* Social Sharing / Links */}
            {data?.social_links?.length > 0 && (
              <div className="pt-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                  Follow Our Updates
                </span>
                <div className="flex gap-4">
                  {data.social_links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 transition-all text-gray-600 hover:text-[#C2481F]"
                      aria-label={link.platform || `social-link-${i}`}
                    >
                      {link.icon ? (
                        <img
                          src={normalizeImageUrl(link.icon)}
                          alt={link.platform || "Social Link"}
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <Share2 size={20} />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-gray-100/70 border border-gray-100 relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#C2481F] to-orange-500" />
              
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B3A6E] mb-1">
                  Send a Message
                </h3>
                <p className="text-gray-500 text-sm">
                  Fill out the form below and our response coordinators will connect with you.
                </p>
              </div>

              <ContactForm initialSubject="general" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

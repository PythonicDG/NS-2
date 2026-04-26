"use client";

import { useState, useRef, useEffect } from "react";
import { submitContactForm } from "@/lib/api";

/**
 * ContactUs Component
 * 
 * A comprehensive contact form with validation and integration with the backend API.
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.data - Dynamic content data fetched from the API
 * @returns {JSX.Element} The rendered ContactUs section
 */
const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "project", label: "Project Collaboration" },
  { value: "support", label: "Technical Support" },
  { value: "feedback", label: "Feedback" },
];

export default function ContactUs({ data }) {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validators = {
    fullName: (val) =>
      /^[A-Za-z\s]+$/.test(val) ? "" : "Name should contain only letters.",
    email: (val) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "" : "Enter a valid email.",
    phone: (val) => {
      if (!val) return "";
      return /^\d{10}$/.test(val)
        ? ""
        : "Phone number must be exactly 10 digits.";
    },
    subject: (val) => (val ? "" : "Please select a subject."),
    message: (val) =>
      val.trim().length >= 10
        ? ""
        : "Message must be at least 10 characters long.",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      const truncatedValue = digitsOnly.slice(0, 10);
      setFormData({ ...formData, [name]: truncatedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(validators).forEach((field) => {
      const errorMsg = validators[field](formData[field]);
      if (errorMsg) newErrors[field] = errorMsg;
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitted(false);

    try {
      const payload = {
        full_name: formData.fullName,
        email_address: formData.email,
        phone_number: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      const res = await submitContactForm(payload);

      if (res.success) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("❌ Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectSubject = (subjectValue) => {
    setFormData({ ...formData, subject: subjectValue });
    setIsDropdownOpen(false);
    if (errors.subject) {
      setErrors({ ...errors, subject: "" });
    }
  };

  if (!data) return null;

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const selectedSubjectLabel =
    subjects.find((sub) => sub.value === formData.subject)?.label ||
    "Select a subject";

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
                    {item.icon && API_BASE_URL && (
                      <img
                        src={`${API_BASE_URL}${item.icon}`}
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
                  <a key={i} href={link.url} target="_blank" rel="noreferrer">
                    <img
                      src={`${API_BASE_URL}${link.icon}`}
                      alt={link.platform}
                      className="w-6 h-6"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
            <h3
              className="text-xl sm:text-2xl font-bold mb-2"
              style={{ color: "#C2481F" }}
            >
              Send us a Message
            </h3>
            <p className="text-gray-800 text-sm sm:text-base mb-6">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            {submitted && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Message sent successfully!
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name *"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C2481F] focus:border-[#C2481F] text-black transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C2481F] focus:border-[#C2481F] text-black transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter 10-digit phone number *"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C2481F] focus:border-[#C2481F] text-black transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="relative" ref={dropdownRef}>
                  <div
                    className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-[#C2481F] focus:border-[#C2481F] text-black bg-white flex items-center justify-between cursor-pointer transition-colors ${isDropdownOpen ? "ring-2 ring-[#C2481F] border-[#C2481F]" : ""}`}
                    onClick={toggleDropdown}
                  >
                    <span
                      className={
                        formData.subject ? "text-black" : "text-gray-400"
                      }
                    >
                      {selectedSubjectLabel}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                      {subjects.map((subject, idx) => (
                        <div
                          key={idx}
                          className={`px-4 py-3 cursor-pointer transition-colors ${formData.subject === subject.value ? "bg-[#eaf0ff] text-[#C2481F]" : "hover:bg-gray-50"}`}
                          onClick={() => selectSubject(subject.value)}
                        >
                          {subject.label}
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Message *"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={1000}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C2481F] focus:border-[#C2481F] text-black transition-colors"
                  />
                  <div className="flex justify-between mt-1">
                    {errors.message ? (
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    ) : (
                      <div />
                    )}
                    <p className={`text-xs ${formData.message.length > 950 ? "text-red-500 font-semibold" : "text-gray-400"}`}>
                      {formData.message.length}/1000 characters
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-[#C2481F] text-white rounded-lg font-semibold hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      data.primary_button_text || "Send Message"
                    )}
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                      setErrors({});
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { submitContactForm } from "@/lib/api";

const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "enrollment", label: "Course Enrollment" },
  { value: "project", label: "Project Collaboration" },
  { value: "support", label: "Technical Support" },
  { value: "feedback", label: "Feedback" },
];

export default function ContactForm({ initialSubject = "enrollment", onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: initialSubject,
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
    let { name, value } = e.target;

    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
          subject: initialSubject,
          message: "",
        });
        if (onSuccess) setTimeout(onSuccess, 2000);
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

  const selectedSubjectLabel =
    subjects.find((sub) => sub.value === formData.subject)?.label ||
    "Select a subject";

  return (
    <div className="w-full">
      {submitted && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
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
            Thank you! Your message has been sent successfully.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Full Name *</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#C2481F] focus:border-transparent text-gray-900 transition-all outline-none bg-gray-50/50"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.fullName}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#C2481F] focus:border-transparent text-gray-900 transition-all outline-none bg-gray-50/50"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="10-digit number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#C2481F] focus:border-transparent text-gray-900 transition-all outline-none bg-gray-50/50"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.phone}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Subject *</label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={toggleDropdown}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#C2481F] text-left text-gray-900 bg-gray-50/50 flex justify-between items-center transition-all"
              >
                <span>{selectedSubjectLabel}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
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
              </button>
              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {subjects.map((sub) => (
                    <button
                      key={sub.value}
                      type="button"
                      onClick={() => selectSubject(sub.value)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        formData.subject === sub.value
                          ? "text-[#C2481F] font-semibold bg-orange-50"
                          : "text-gray-700"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 ml-1">Your Message *</label>
          <textarea
            name="message"
            placeholder="Tell us more about your inquiry..."
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#C2481F] focus:border-transparent text-gray-900 transition-all outline-none bg-gray-50/50 resize-none"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#C2481F] hover:bg-[#A63D1A] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
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
              <span>Sending...</span>
            </>
          ) : (
            "Submit Request"
          )}
        </button>
      </form>
    </div>
  );
}

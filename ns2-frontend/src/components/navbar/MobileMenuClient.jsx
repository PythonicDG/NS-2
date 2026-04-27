"use client";

import { useState, useEffect } from "react";
import NavLinkClient from "@/components/navbar/NavLinkClient";
import { usePathname } from "next/navigation";

/**
 * MobileMenu Component
 * 
 * A client-side mobile navigation menu with slide-in animation,
 * backdrop blur, and accordion-style submenus.
 * 
 * @param {Object} props
 * @param {Array} props.menuItems - Navigation links and submenus
 * @param {string} props.logoUrl - URL of the company logo
 * @returns {JSX.Element}
 */
export default function MobileMenu({ menuItems, logoUrl }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById("mobile-menu");
      const button = document.getElementById("hamburger-button");
      if (
        menu &&
        button &&
        !menu.contains(event.target) &&
        !button.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setActiveSubmenu(null);
  };

  const toggleSubmenu = (index) =>
    setActiveSubmenu(activeSubmenu === index ? null : index);

  const regularItems = menuItems.filter((item) => !item.is_button);
  const buttonItems = menuItems.filter((item) => item.is_button);

  if (!isMounted) return null;

  return (
    <div className="lg:hidden">
      <button
        id="hamburger-button"
        onClick={toggleMenu}
        className="p-2 rounded-md text-[#6C757D] hover:text-[#C2481F] hover:bg-[#e9ecef] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C2481F] focus:ring-opacity-50"
        aria-label="Toggle mobile menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          id="mobile-menu"
          className={`absolute inset-0 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              {logoUrl && !logoError ? (
                <NavLinkClient href="/" onClick={() => setIsMenuOpen(false)}>
                  <img
                    src={logoUrl}
                    alt="Company Logo"
                    className="h-10 w-auto"
                    onError={() => setLogoError(true)}
                  />
                </NavLinkClient>
              ) : (
                <NavLinkClient href="/" onClick={() => setIsMenuOpen(false)}>
                  <div className="h-10 w-32 bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 rounded-md">
                    Company Logo
                  </div>
                </NavLinkClient>
              )}

              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full text-[#6C757D] hover:text-[#C2481F] hover:bg-[#F8F9FA] transition-colors duration-200"
                aria-label="Close menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-2">
                {regularItems.map((item, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    {item.submenus?.length > 0 ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(index)}
                          className="flex justify-between items-center w-full py-4 text-left text-[#6C757D] hover:text-[#C2481F] transition-colors duration-200 font-medium"
                        >
                          <span>{item.text}</span>
                          <svg
                            className={`w-4 h-4 transform transition-transform duration-200 ${
                              activeSubmenu === index ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <ul
                          className={`pl-4 pb-3 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
                            activeSubmenu === index ? "max-h-96" : "max-h-0"
                          }`}
                        >
                          {item.submenus.map((subitem, subIndex) => (
                            <li key={subIndex}>
                              <NavLinkClient
                                href={subitem.url}
                                className="block py-2 px-4 rounded-md hover:bg-[#F8F9FA]"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subitem.text}
                              </NavLinkClient>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <NavLinkClient
                        href={item.url}
                        className="block py-4 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.text}
                      </NavLinkClient>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {buttonItems.length > 0 && (
              <div className="pt-6 mt-auto border-t border-gray-200 space-y-3">
                {buttonItems.map((buttonItem, index) => (
                  <NavLinkClient
                    key={index}
                    href={buttonItem.url}
                    className="block w-full bg-[#C2481F] text-white text-center px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {buttonItem.text}
                  </NavLinkClient>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

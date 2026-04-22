import { fetchNavbarData } from "@/lib/api";
import MobileMenu from "@/components/navbar/MobileMenuClient";
import LogoClient from "@/components/navbar/LogoClient";
import NavLinkClient from "@/components/navbar/NavLinkClient";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function Navbar() {
  let navbarData;
  try {
    navbarData = await fetchNavbarData();
  } catch (err) {
    console.error("Error fetching navbar data:", err);
    navbarData = null;
  }

  const menuItems = navbarData?.header?.menu || [];
  const logoPath = navbarData?.footer?.company?.logo;
  const logoUrl = logoPath ? `${API_BASE_URL}${logoPath}` : null;

  const regularMenuItems = menuItems.filter((item) => !item.is_button);
  const buttonMenuItems = menuItems.filter((item) => item.is_button);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-3 w-full transition-all duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="pl-4 lg:pl-8 transform hover:scale-105 transition-transform duration-300">
          <LogoClient logoUrl={logoUrl} />
        </div>

        <div className="hidden lg:flex flex-1 justify-center items-center">
          <ul className="flex space-x-8">
            {regularMenuItems.map((item, index) => (
              <li key={index} className="relative group py-2">
                {item.submenus?.length > 0 ? (
                  <>
                    <button className="text-gray-600 hover:text-[#C2481F] text-sm font-semibold transition-colors duration-300 flex items-center gap-1 group">
                      {item.text}
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Premium Dropdown */}
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-[110]">
                      <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-t border-l border-gray-100 rotate-45"></div>
                      {item.submenus.map((subitem, subIndex) => (
                        <NavLinkClient
                          key={subIndex}
                          href={subitem.url}
                          className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#C2481F] hover:bg-gray-50/80 transition-all duration-200"
                        >
                          {subitem.text}
                        </NavLinkClient>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="relative group">
                    <NavLinkClient 
                      href={item.url}
                      className="text-gray-600 hover:text-[#C2481F] text-sm font-semibold transition-colors duration-300"
                    >
                      {item.text}
                    </NavLinkClient>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C2481F] transition-all duration-300 group-hover:w-full"></span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {buttonMenuItems.length > 0 && (
          <div className="hidden lg:flex space-x-4 pr-4 lg:pr-8">
            {buttonMenuItems.map((buttonItem, index) => (
              <Link
                key={index}
                href={buttonItem.url || "/"}
                className="bg-gradient-to-r from-[#C2481F] to-[#d85c34] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
              >
                {buttonItem.text}
              </Link>
            ))}
          </div>
        )}

        <div className="lg:hidden">
          <MobileMenu menuItems={menuItems} logoUrl={logoUrl} />
        </div>
      </div>
    </nav>
  );
}

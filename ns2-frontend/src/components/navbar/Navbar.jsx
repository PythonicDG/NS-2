import { fetchNavbarData } from "@/lib/api";
import MobileMenu from "@/components/navbar/MobileMenuClient";
import LogoClient from "@/components/navbar/LogoClient";
import NavLinkClient from "@/components/navbar/NavLinkClient";

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
    <nav className="sticky top-0 bg-[#F8F9FA] shadow-md py-4 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="pl-4 lg:pl-8">
          <LogoClient logoUrl={logoUrl} />
        </div>

        <div className="hidden lg:flex flex-1 justify-center items-center">
          <ul className="flex space-x-6">
            {regularMenuItems.map((item, index) => (
              <li key={index} className="relative group">
                {item.submenus?.length > 0 ? (
                  <>
                    <button className="text-[#6C757D] hover:text-[#C2481F] transition-colors duration-200 flex items-center">
                      {item.text}
                      <svg
                        className="ml-1 w-4 h-4"
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

                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      {item.submenus.map((subitem, subIndex) => (
                        <NavLinkClient
                          key={subIndex}
                          href={subitem.url}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {subitem.text}
                        </NavLinkClient>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLinkClient href={item.url}>{item.text}</NavLinkClient>
                )}
              </li>
            ))}
          </ul>
        </div>

        {buttonMenuItems.length > 0 && (
          <div className="hidden lg:flex space-x-4 pr-4 lg:pr-8">
            {buttonMenuItems.map((buttonItem, index) => (
              <NavLinkClient
                key={index}
                href={buttonItem.url}
                className="bg-[#C2481F] text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white hover:scale-105 transition-transform transition-colors duration-200"
              >
                {buttonItem.text}
              </NavLinkClient>
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

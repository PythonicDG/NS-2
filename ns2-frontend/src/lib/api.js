const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Normalizes an image URL by handling duplicated domains and prepending the API base URL if needed.
 * 
 * @param {string} url - The raw URL string from the backend
 * @returns {string|null} - The normalized absolute URL or null if no URL provided
 */
export function normalizeImageUrl(url) {
  if (!url) return null;

  // Workaround for backend returning duplicated URLs (e.g., https://domain.comhttps//domain.com/media/...)
  if (url.includes("https//")) {
    url = url.replace("https//", "https://");
  }

  // If URL has multiple https:// or http://, take the last one
  const httpsParts = url.split("https://");
  if (httpsParts.length > 2) {
    url = "https://" + httpsParts[httpsParts.length - 1];
  }
  const httpParts = url.split("http://");
  if (httpParts.length > 2) {
    url = "http://" + httpParts[httpParts.length - 1];
  }

  if (url.startsWith("http")) return url;
  return `${API_BASE_URL.replace(/\/$/, "")}${url.startsWith("/") ? "" : "/"}${url}`;
}

/**
 * Fetches the navigation bar and footer data from the backend.
 * 
 * @returns {Promise<Object>} - Object containing header, menu, and footer data
 */
export async function fetchNavbarData() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/core/header-footer`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && (data.header || data.menu || data.footer)) {
      // Safely normalize menu URLs if they exist
      if (Array.isArray(data.menu)) {
        data.menu = data.menu.map((item) => {
          if (item.url && !item.url.startsWith("http") && !item.url.startsWith("/")) {
            item.url = `/${item.url}`;
          }
          if (Array.isArray(item.submenus)) {
            item.submenus = item.submenus.map((sub) => {
              if (sub.url && !sub.url.startsWith("http") && !sub.url.startsWith("/")) {
                sub.url = `/${sub.url}`;
              }
              return sub;
            });
          }
          return item;
        });
      }
      // Safely normalize footer URLs if they exist
      if (data.footer && Array.isArray(data.footer.sections)) {
        data.footer.sections.forEach((section) => {
          if (Array.isArray(section.items)) {
            section.items.forEach((item) => {
              if (item.url && !item.url.startsWith("http") && !item.url.startsWith("/")) {
                item.url = `/${item.url}`;
              }
            });
          }
        });
      }
      return data;
    } else {
      console.warn("API response missing expected structure");
      return { header: {}, menu: [], footer: {} };
    }
  } catch (error) {
    console.error("Failed to fetch Navbar data:", error);
    return { header: {}, menu: [], footer: {} };
  }
}

// Module-level cache for homepage data to avoid duplicate fetches within the same request
let _homepageCache = null;
let _homepageCacheTime = 0;
const HOMEPAGE_CACHE_TTL = 30 * 1000; // 30 seconds in-memory cache

async function fetchAllHomepageSections() {
  const now = Date.now();
  if (_homepageCache && now - _homepageCacheTime < HOMEPAGE_CACHE_TTL) {
    return _homepageCache;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/homepage/fetch-homepage`,
      {
        next: { revalidate: 60 }, // ISR: serve cached, revalidate in background every 60s
      }
    );

    if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);

    const data = await response.json();
    const sections = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : [];

    _homepageCache = sections;
    _homepageCacheTime = now;
    return sections;
  } catch (error) {
    console.error("Failed to fetch homepage sections:", error);
    return [];
  }
}

export async function fetchHomepageSection(sectionType) {
  try {
    const sections = await fetchAllHomepageSections();

    const section = sections.find(
      (s) =>
        s.section_type?.toLowerCase().replace(/\s/g, "") ===
          sectionType.toLowerCase().replace(/\s/g, "") && s.is_active
    );

    if (!section) {
      return null;
    }

    if (section.background_image)
      section.background_image = normalizeImageUrl(section.background_image);
    if (section.primary_image)
      section.primary_image = normalizeImageUrl(section.primary_image);

    return section;
  } catch (error) {
    console.error(`Failed to fetch ${sectionType} section:`, error);
    return null;
  }
}



export async function submitContactForm(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/core/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Contact API error:", response.status);
      return { success: false };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return { success: false };
  }
}


export async function fetchAboutPage() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/aboutus/fetch-about-page/`, {
      cache: "no-store",
    });

    if (!res.ok)
      throw new Error(`Failed to fetch About Us page: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Error fetching About Us page:", error);
    return null;
  }
}


export async function fetchModulePage() {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/modules/fetch-module-page`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (data && typeof data === "object") return [data];
    return [];
  } catch (err) {
    console.error("fetchModulePage error:", err);
    return [];
  }
}

export async function fetchModuleBySlug(slug) {
  try {
    const baseUrl = API_BASE_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseUrl}/api/modules/modules/${slug}/`,
      { cache: "no-store" }
    );

    if (res.status === 404) {
      console.warn(`Module not found: ${slug}`);
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch module: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching module by slug:", error);
    return null;
  }
}

export async function fetchModulesList() {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/modules/modules/`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch modules list: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching modules list:", error);
    return [];
  }
}

export async function fetchAnnouncements(categorySlug = "") {
  try {
    const baseUrl = API_BASE_URL.replace(/\/$/, "");
    let url = `${baseUrl}/api/announcements/items/`;
    if (categorySlug) {
      url += `?category=${categorySlug}`;
    }
    console.log("Fetching Announcements from:", url); // Debug Log
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch announcements: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}


export async function fetchAnnouncementBySlug(slug) {
  try {
    const baseUrl = API_BASE_URL.replace(/\/$/, "");
    const res = await fetch(`${baseUrl}/api/announcements/items/${slug}/`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch announcement: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching announcement by slug:", error);
    return null;
  }
}

export async function fetchAnnouncementCategories() {
  try {
    const baseUrl = API_BASE_URL.replace(/\/$/, "");
    const res = await fetch(`${baseUrl}/api/announcements/categories/`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch announcement categories: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching announcement categories:", error);
    return [];
  }
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

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
  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

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
      return data;
    } else {
      console.warn(
        "API response missing expected structure, returning empty array instead of fallback"
      );
      return { header: [], menu: [], footer: null };
    }
  } catch (error) {
    console.error("Failed to fetch Navbar data:", error);
    return { header: [], menu: [], footer: null };
  }
}

export async function fetchHomepageSection(sectionType) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/homepage/fetch-homepage`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);

    const data = await response.json();
    const sections = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : [];
    const section = sections.find(
      (s) =>
        s.section_type?.toLowerCase().replace(/\s/g, "") ===
          sectionType.toLowerCase().replace(/\s/g, "") && s.is_active
    );

    if (!section) {
      const availableTypes = sections.filter(s => s.is_active).map(s => s.section_type);
      console.warn(
        `${sectionType} section not found. Available active sections: ${availableTypes.join(", ")}`
      );
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

export async function fetchPortfolioData() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/portfolio/fetch-portfolio`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data && Array.isArray(data) && data.length > 0) {
      return data;
    }

    console.warn(
      "API for Portfolio page returned an empty or invalid response."
    );
    return [];
  } catch (error) {
    console.error("Failed to fetch Portfolio page data:", error);
    return [];
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

export async function fetchServiceBySlug(slug) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/services/fetch-services/?submenu=${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch service data");

    return await res.json();
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
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

export async function fetchTrainingPage(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training/fetch-training-page/?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch training page data");
  }

  return res.json();
}
export async function fetchInternshipPage() {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/internships/fetch-internship-page`,
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
    console.error("fetchInternshipPage error:", err);
    return [];
  }
}

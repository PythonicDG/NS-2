import ServicesExperience from "@/components/services/ServicesExperience";
import defaults from "@/lib/services-defaults.json";

export const metadata = {
  title: "Industrial Services & Corporate Training | MIA × AES × ADS",
  description:
    "Corporate training, PLC/SCADA automation engineering, technical workforce and placement support in Pimpri-Chinchwad. Connect with the MIA, AES and ADS alliance.",
};

async function getServices() {
  const base = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return defaults;
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/api/services/`, {
      next: { revalidate: 300, tags: ["services"] },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Services API: ${response.status}`);
    const data = await response.json();
    if (
      !data.hero ||
      !data.contact ||
      ![data.partners, data.services, data.pillars].every(Array.isArray)
    ) {
      throw new Error("Invalid services page response");
    }
    return data;
  } catch (error) {
    console.error(
      "Services CMS unavailable; using initial page content:",
      error.message
    );
    return defaults;
  }
}

export default async function ServicesPage() {
  return <ServicesExperience data={await getServices()} />;
}

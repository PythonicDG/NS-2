import { fetchModuleBySlug, fetchHomepageSection } from "@/lib/api";
import { notFound } from "next/navigation";
import ModulePageClient from "@/components/modules/ModulePageClient";
import ContactUs from "@/components/homepage/ContactUs";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params: incomingParams }) {
  try {
    const params = await incomingParams;
    const slug = params.slug;
    const moduleData = await fetchModuleBySlug(slug);

    if (!moduleData) {
      return { 
        title: "Module Not Found | MIA",
        description: "The requested training module could not be found."
      };
    }

    return {
      title: `${moduleData.title} | MIA`,
      description: moduleData.tagline || `Learn more about ${moduleData.title} and enhance your skills with MIA's expert-led training.`,
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return { title: "MIA Training" };
  }
}

export default async function ModuleDetailPage({ params: incomingParams }) {
  const params = await incomingParams;
  const slug = params.slug;

  const [moduleData, contact] = await Promise.all([
    fetchModuleBySlug(slug),
    fetchHomepageSection("Contact Us"),
  ]);

  if (!moduleData) {
    notFound();
  }

  return (
    <>
      <ModulePageClient moduleData={moduleData} />
      <ContactUs data={contact} />
    </>
  );
}

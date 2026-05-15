import ContactUs from "@/components/homepage/ContactUs";
import FAQSection from "@/components/homepage/FAQSection";
import FeatureHighlights from "@/components/modules_list/FeatureHighlights";
import HeroSection from "@/components/modules_list/HeroSection";
import ModuleOpportunities from "@/components/modules_list/ModuleOpportunities";
import ProgramStructure from "@/components/modules_list/ProgramStructure";
import WhyChooseUs from "@/components/modules_list/WhyChooseUs";
import { fetchHomepageSection, fetchModulePage } from "@/lib/api";

export const metadata = {
  title: "MIA | Modules",
  description: "Explore our specialized modules and innovative projects.",
};

export const dynamic = "force-dynamic";

export default async function ModulesPage() {
  const moduleData = await fetchModulePage();

  const heroBanner =
    moduleData.find(
      (section) =>
        section.section_type === "HERO" ||
        section.section_type === "Hero Banner"
    ) || null;

  const opportunities =
    moduleData.find(
      (section) => section.section_type === "MODULE_OPPORTUNITIES"
    ) || null;

  const whyChooseUs =
    moduleData.find(
      (section) => section.section_type === "WHY_CHOOSE_US"
    ) || null;

  const featureHighlights =
    moduleData.find(
      (section) => section.section_type === "FEATURE_HIGHLIGHTS"
    ) || null;

  const programStructure =
    moduleData.find(
      (section) => section.section_type === "PROGRAM_STRUCTURE"
    ) || null;

  const faqSection =
    moduleData.find((section) => section.section_type === "FAQ") || null;

  const [contact, initialSections] = await Promise.all([
      fetchHomepageSection("Contact Us"),
    ]); 

  return (
    <main className="bg-white">
      {heroBanner && <HeroSection data={heroBanner} />}
      {opportunities && <ModuleOpportunities initialData={opportunities} />}
      {whyChooseUs && <WhyChooseUs initialData={whyChooseUs} />}
      {featureHighlights && (
        <FeatureHighlights initialData={featureHighlights} />
      )}
      {programStructure && <ProgramStructure initialData={programStructure} />}
      {faqSection && <FAQSection data={faqSection} />}
      <ContactUs data={contact} />
    </main>
  );
}

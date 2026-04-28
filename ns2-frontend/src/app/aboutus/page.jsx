export const metadata = {
  title: "MIA | | About Us",
  description:
    "At MIA, we craft innovative solutions that bridge industry needs and technical training.",
};

import CompanyGallery from "@/components/aboutus/CompanyGallery";
import OurTeam from "@/components/aboutus/OurTeam";
import VisionSection from "@/components/aboutus/VisionSection";
import WhoWeAre from "@/components/aboutus/WhoWeAre";
import ContactUs from "@/components/homepage/ContactUs";
import { fetchAboutPage, fetchHomepageSection } from "@/lib/api";

export const revalidate = 0; // Full SSR (no cache)

export default async function AboutUsPage() {
  const data = await fetchAboutPage();

  if (!data || !Array.isArray(data)) {
    return <p className="text-center py-10">Failed to load About Us data</p>;
  }

  const whoWeAre = data.find(
    (section) => section.section_type === "WHO_WE_ARE" && section.is_active
  );
  const vision = data.find(
    (section) => section.section_type === "VISION_MISSION" && section.is_active
  );
  const gallery = data.find(
    (section) => section.section_type === "GALLERY" && section.is_active
  );
  const team = data.find(
    (section) => section.section_type === "OUR_TEAM" && section.is_active
  );
  const [contact] = await Promise.all([
      fetchHomepageSection("Contact Us"),
    ]);

  return (
    <main className="min-h-screen bg-white">
      {whoWeAre && <WhoWeAre data={whoWeAre} />}
      {vision && <VisionSection data={vision} />}
      {gallery && <CompanyGallery data={gallery} />}
      {team && <OurTeam data={team} />}
      <ContactUs data={contact} />
    </main>
  );
}

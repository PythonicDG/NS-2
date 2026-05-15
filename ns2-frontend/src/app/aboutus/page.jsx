export const metadata = {
  title: "MIA | About Us",
  description:
    "Learn about MIA (Modern Institute of Automation) — our mission, vision, team, and the expertise that makes us a leading automation training institute.",
};

export const revalidate = 0; // Full SSR (no cache)

import AboutHeroBanner from "@/components/aboutus/AboutHeroBanner";
import WhoWeAre from "@/components/aboutus/WhoWeAre";
import DirectorMessage from "@/components/aboutus/DirectorMessage";
import OurStory from "@/components/aboutus/OurStory";
import VisionSection from "@/components/aboutus/VisionSection";
import ExpertiseSection from "@/components/aboutus/ExpertiseSection";
import Accreditations from "@/components/aboutus/Accreditations";
import InfrastructureHighlights from "@/components/aboutus/InfrastructureHighlights";
import CompanyGallery from "@/components/aboutus/CompanyGallery";
import OurTeam from "@/components/aboutus/OurTeam";
import { fetchAboutPage, fetchHomepageSection } from "@/lib/api";

export default async function AboutUsPage() {
  const [data] = await Promise.all([
    fetchAboutPage(),
  ]);

  if (!data || !Array.isArray(data)) {
    return <p className="text-center py-10">Failed to load About Us data</p>;
  }

  // Extract sections by type from API response
  const hero = data.find(
    (section) => section.section_type === "HERO" && section.is_active
  );
  const whoWeAre = data.find(
    (section) => section.section_type === "WHO_WE_ARE" && section.is_active
  );
  const directorMessage = data.find(
    (section) => section.section_type === "DIRECTOR_MESSAGE" && section.is_active
  );
  const ourStory = data.find(
    (section) => section.section_type === "OUR_STORY" && section.is_active
  );
  const vision = data.find(
    (section) => section.section_type === "VISION_MISSION" && section.is_active
  );
  const expertise = data.find(
    (section) => section.section_type === "EXPERTISE" && section.is_active
  );
  const accreditations = data.find(
    (section) => section.section_type === "ACCREDITATIONS" && section.is_active
  );
  const infrastructure = data.find(
    (section) => section.section_type === "INFRASTRUCTURE" && section.is_active
  );
  const gallery = data.find(
    (section) => section.section_type === "GALLERY" && section.is_active
  );
  const team = data.find(
    (section) => section.section_type === "OUR_TEAM" && section.is_active
  );

  return (
    <main className="min-h-screen bg-white">
      {hero && <AboutHeroBanner data={hero} />}
      {whoWeAre && <WhoWeAre data={whoWeAre} />}
      {directorMessage && <DirectorMessage data={directorMessage} />}
      {ourStory && <OurStory data={ourStory} />}
      {vision && <VisionSection data={vision} />}
      {expertise && <ExpertiseSection data={expertise} />}
      {accreditations && <Accreditations data={accreditations} />}
      {infrastructure && <InfrastructureHighlights data={infrastructure} />}
      {gallery && <CompanyGallery data={gallery} />}
      {team && <OurTeam data={team} />}
    </main>
  );
}

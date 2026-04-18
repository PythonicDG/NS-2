export const metadata = {
  title: "MIA | | Portfolio",
  description:
    "Explore MIA's innovative projects, trusted partnerships, and expert team.",
};
import ContactUs from "@/components/homepage/ContactUs";
import Testimonial from "@/components/homepage/Testimonial";
import { FeaturedProjectsSection } from "@/components/portfolio/FeaturedProjects";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { TeamSection } from "@/components/portfolio/ourteam";
import { Projects } from "@/components/portfolio/Projects";
import { TrustedCompaniesSection } from "@/components/portfolio/TrustedCompanies";
import { fetchHomepageSection } from "@/lib/api";
export const dynamic = "force-dynamic";

import { fetchPortfolioData } from "@/lib/api";


export default async function PortfolioPage() {
  const portfolioData = await fetchPortfolioData();

  const [contact, initialSections] = await Promise.all([
      fetchHomepageSection("Contact Us"),
    ]);


  const heroBanner = portfolioData.find(
    (section) => section.section_type === "Hero Banner"
  );
  const featuredProjects = portfolioData.find(
    (section) => section.section_type === "Featured Projects"
  );
  const trustedCompanies = portfolioData.find(
    (section) => section.section_type === "Trusted Companies"
  );
  const ourTeam = portfolioData.find(
    (section) => section.section_type === "Our Team"
  );
  const projects = portfolioData.find(
    (section) => section.section_type === "Projects"
  );

  const testimonial = await fetchHomepageSection("Testimonials Slider");

  return (
    <main className="bg-white">
      {heroBanner && <HeroSection data={heroBanner} />}
      {featuredProjects && <FeaturedProjectsSection data={featuredProjects} />}
      {trustedCompanies && <TrustedCompaniesSection data={trustedCompanies} />}
      {ourTeam && <TeamSection data={ourTeam} />}
      {projects && <Projects data={projects} />}
      {testimonial && <Testimonial data={testimonial} />}
      <ContactUs data={contact} />
    </main>
  );
}

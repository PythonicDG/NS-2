export const metadata = {
  title: "NS2 Infotech | Home",
  description:
    "At NS-2 Infotech, we craft innovative solutions that bridge industry needs and technical training.",
};

export const dynamic = "force-dynamic";
import CallToAction from "@/components/homepage/CallToAction";
import ContactUs from "@/components/homepage/ContactUs";
import FAQSection from "@/components/homepage/FAQSection";
import Hero from "@/components/homepage/HeroSection";
import KeyAchievementsServer from "@/components/homepage/KeyAchievements.server";
import Overview from "@/components/homepage/Overview";
import ScrollToTop from "@/components/homepage/ScrollToTop";
import { ServicesSection } from "@/components/homepage/ServiceSection";
import Testimonial from "@/components/homepage/Testimonial";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import { fetchHomepageSection } from "@/lib/api";

export default async function HomePage() {
  const heroData = await fetchHomepageSection("Hero Banner");
  const overview = await fetchHomepageSection("Overview");
  const whyChooseUs = await fetchHomepageSection("Why Choose Us");
  const testimonial = await fetchHomepageSection("Testimonials Slider");
  const faq = await fetchHomepageSection("Frequently Asked Questions");
  const contact = await fetchHomepageSection("Contact Us");
  const keyAchievements = await fetchHomepageSection("Key Achivements");
  const ourServices = await fetchHomepageSection("Our Services");
  const callToAction = await fetchHomepageSection("Call To Action");

  return (
    <main>
      <Hero data={heroData} />
      <Overview data={overview} />
      <WhyChooseUs data={whyChooseUs} />
      {ourServices && <ServicesSection data={ourServices} />}
      <KeyAchievementsServer data={keyAchievements} />
      <Testimonial data={testimonial} />
      <CallToAction data={callToAction} />
      <FAQSection data={faq} />
      <ContactUs data={contact} />
      <ScrollToTop />
    </main>
  );
}

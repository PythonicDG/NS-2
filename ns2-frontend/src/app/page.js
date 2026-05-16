export const metadata = {
  title: "MIA | Home",
  description:
    "At MIA (Modern Institute of Automation), we craft innovative solutions that bridge industry needs and technical training.",
};

import dynamic from "next/dynamic";
import Hero from "@/components/homepage/HeroSection";
import Overview from "@/components/homepage/Overview";
import { fetchHomepageSection } from "@/lib/api";

// Lazy-load all below-the-fold sections to reduce initial bundle size and TBT
const WhyChooseUs = dynamic(() => import("@/components/homepage/WhyChooseUs"));
const ServicesSection = dynamic(() =>
  import("@/components/homepage/ServiceSection").then((m) => ({ default: m.ServicesSection }))
);
const KeyAchievementsServer = dynamic(() => import("@/components/homepage/KeyAchievements.server"));
const PlacedStudents = dynamic(() => import("@/components/homepage/PlacedStudents"));
const Testimonial = dynamic(() => import("@/components/homepage/Testimonial"));
const CallToAction = dynamic(() => import("@/components/homepage/CallToAction"));
const FAQSection = dynamic(() => import("@/components/homepage/FAQSection"));
const ContactUs = dynamic(() => import("@/components/homepage/ContactUs"));
const GoogleReviews = dynamic(() => import("@/components/homepage/GoogleReviews"));
const ScrollToTop = dynamic(() => import("@/components/homepage/ScrollToTop"));


export default async function HomePage() {
  const heroData = await fetchHomepageSection("Hero Banner");
  const overview = await fetchHomepageSection("Overview");
  const whyChooseUs = await fetchHomepageSection("Why Choose Us");
  const testimonial = await fetchHomepageSection("Testimonials Slider");
  const faq = await fetchHomepageSection("Frequently Asked Questions");
  const contact = await fetchHomepageSection("Contact Us");
  const keyAchievements = await fetchHomepageSection("Key Achievements");
  const ourServices = await fetchHomepageSection("Our Services");
  const callToAction = await fetchHomepageSection("Call To Action");
  const placedStudents = await fetchHomepageSection("Our Placed Students");

  return (
    <main>
      <Hero data={heroData} />
      <Overview data={overview} />
      <WhyChooseUs data={whyChooseUs} />
      {ourServices && <ServicesSection data={ourServices} />}
      <KeyAchievementsServer data={keyAchievements} />
      {placedStudents && <PlacedStudents data={placedStudents} />}
      <Testimonial data={testimonial} />
      <CallToAction data={callToAction} />
      <FAQSection data={faq} />
      <ContactUs data={contact} />
      <GoogleReviews />
      <ScrollToTop />
    </main>
  );
}

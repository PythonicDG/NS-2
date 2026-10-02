export const metadata = {
  title: "MIA | Home",
  description:
    "At MIA (Modern Institute of Automation), we craft innovative solutions that bridge industry needs and technical training.",
};

import dynamic from "next/dynamic";
import Hero from "@/components/homepage/HeroSection";
import Overview from "@/components/homepage/Overview";
import { fetchHomepageSections } from "@/lib/api";

// Lazy-load all below-the-fold sections to reduce initial bundle size and TBT
const WhyChooseUs = dynamic(() => import("@/components/homepage/WhyChooseUs"));
const ServicesSection = dynamic(() =>
  import("@/components/homepage/ServiceSection").then((m) => ({ default: m.ServicesSection }))
);
const PlacedStudents = dynamic(() => import("@/components/homepage/PlacedStudents"));
const Testimonial = dynamic(() => import("@/components/homepage/Testimonial"));
const CallToAction = dynamic(() => import("@/components/homepage/CallToAction"));
const FAQSection = dynamic(() => import("@/components/homepage/FAQSection"));
const ContactUs = dynamic(() => import("@/components/homepage/ContactUs"));
const GoogleReviews = dynamic(() => import("@/components/homepage/GoogleReviews"));


export default async function HomePage() {
  const sections = await fetchHomepageSections();
  const byType = new Map(
    sections.filter((section) => section.is_active).map((section) => [section.section_type, section])
  );
  const heroData = byType.get("Hero Banner");
  const overview = byType.get("Overview");
  const whyChooseUs = byType.get("Why Choose Us");
  const testimonial = byType.get("Testimonials Slider");
  const faq = byType.get("Frequently Asked Questions");
  const contact = byType.get("Contact Us");
  const ourServices = byType.get("Our Services");
  const callToAction = byType.get("Call To Action");
  const placedStudents = byType.get("Our Placed Students");

  return (
    <div className="home-page overflow-x-clip">
      <Hero data={heroData} />
      <Overview data={overview} />
      <WhyChooseUs data={whyChooseUs} />
      {ourServices && <ServicesSection data={ourServices} />}
      {placedStudents && <PlacedStudents data={placedStudents} />}
      <Testimonial data={testimonial} />
      <CallToAction data={callToAction} />
      <FAQSection data={faq} />
      <ContactUs data={contact} />
      <GoogleReviews />
    </div>
  );
}

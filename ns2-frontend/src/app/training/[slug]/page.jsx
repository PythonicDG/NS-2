export const metadata = {
  title: "MIA | | Training Programs",
  description:
    "At MIA, we offer comprehensive training programs for both corporate professionals and students.",
};

import WhatYouWillLearnServer from "@/components/trainingStudent/WhatYouWillLearnServer";
import ProgramStructureServer from "@/components/trainingStudent/ProgramStructureServer";
import HeroSectionServer from "@/components/trainingCorporate/HeroSectionServer";
import StudentHeroSectionServer from "@/components/trainingStudent/HeroSectionServer";
import AboutCorporateServer from "@/components/trainingCorporate/AboutCorporateServer";
import TrainingSectionServer from "@/components/trainingCorporate/TrainingOfferingsServer";
import WhyChooseUsServer from "@/components/trainingCorporate/WhyChooseUsServer";
import IndustriesServedServer from "@/components/trainingCorporate/IndustriesServedServer";
import TrainingProcessServer from "@/components/trainingCorporate/TrainingProcessServer";
import OurTrainersServer from "@/components/trainingCorporate/OurTrainersServer";
import FAQSection from "@/components/homepage/FAQSection";
import UpcomingBatchesServer from "@/components/trainingStudent/UpcomingBatchesServer";
import ContactUs from "@/components/homepage/ContactUs";
import { fetchHomepageSection } from "@/lib/api";
import { fetchTrainingPage } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function TrainingPage({ params: incomingParams }) {
  const params = await incomingParams;
  const slug = params.slug;

  const [contact, initialSections] = await Promise.all([
    fetchHomepageSection("Contact Us"),
    ,
  ]);

  const data = await fetchTrainingPage(slug);

  const heroData = data.find(
    (section) =>
      section.section_type ===
      (slug === "corporate-training" ? "HERO_CORPORATE" : "HERO_STUDENT")
  );

  const aboutData = data.find(
    (section) =>
      section.section_type ===
      (slug === "corporate-training" ? "ABOUT_CORPORATE" : "ABOUT_STUDENT")
  );

  const trainingData = data.find(
    (section) => section.section_type === "TRAINING_OFFERINGS"
  );

  const programStructureData = data.filter(
    (section) => section.section_type === "PROGRAM_STRUCTURE"
  );

  const whatYouWillLearnData = data.filter(
    (section) => section.section_type === "WHAT_YOU_WILL_LEARN"
  );

  const upcomingBatchesData = data.filter(
    (section) => section.section_type === "UPCOMING_BATCHES"
  );

  const why = data.find((section) => section.section_type === "WHY_CHOOSE_US");
  const industries = data.find(
    (section) => section.section_type === "INDUSTRIES_SERVED"
  );
  const processData = data.find(
    (section) => section.section_type === "TRAINING_PROCESS"
  );
  const trainersData = data.find(
    (section) => section.section_type === "OUR_TRAINERS"
  );
  const faq = data.find((section) => section.section_type === "FAQ");

  return (
    <main>
      {heroData &&
        (slug === "corporate-training" ? (
          <HeroSectionServer data={heroData} />
        ) : (
          <StudentHeroSectionServer data={heroData} />
        ))}
      {programStructureData.length > 0 && slug === "student-training" && (
        <ProgramStructureServer data={programStructureData} />
      )}
      {whatYouWillLearnData.length > 0 && slug === "student-training" && (
        <WhatYouWillLearnServer data={whatYouWillLearnData} />
      )}
      {upcomingBatchesData.length > 0 && slug === "student-training" && (
        <UpcomingBatchesServer data={upcomingBatchesData} />
      )}

      {aboutData && <AboutCorporateServer data={aboutData} />}
      {trainingData && <TrainingSectionServer data={trainingData} />}
      {why && <WhyChooseUsServer data={why} />}
      {industries && <IndustriesServedServer data={industries} />}
      {processData && <TrainingProcessServer slug={slug} />}
      {trainersData && <OurTrainersServer data={trainersData} />}
      {faq && <FAQSection data={faq} />}
      <ContactUs data={contact} />
    </main>
  );
}

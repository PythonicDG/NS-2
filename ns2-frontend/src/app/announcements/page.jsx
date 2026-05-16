import AnnouncementHero from "@/components/announcements/AnnouncementHero";
import AnnouncementList from "@/components/announcements/AnnouncementList";

export const metadata = {
  title: "MIA | Announcements & Updates",
  description:
    "Stay updated with the latest news, events, and important announcements from Modern Institute of Automation (MIA).",
};

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen">
      <AnnouncementHero />
      <AnnouncementList />
    </main>
  );
}

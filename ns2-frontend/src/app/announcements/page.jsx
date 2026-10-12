import AnnouncementHero from "@/components/announcements/AnnouncementHero";
import AnnouncementList from "@/components/announcements/AnnouncementList";
import { fetchPageCopy } from "@/lib/api";

export const metadata = {
  title: "MIA | Announcements & Updates",
  description:
    "Stay updated with the latest news, events, and important announcements from Modern Institute of Automation (MIA).",
};

export default async function AnnouncementsPage() {
  const copy = await fetchPageCopy("announcements");
  return (
    <main className="min-h-screen">
      <AnnouncementHero copy={copy} />
      <AnnouncementList copy={copy} />
    </main>
  );
}

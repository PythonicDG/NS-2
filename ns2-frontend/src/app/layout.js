import Footer from "@/components/footer/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollToTop from "@/components/homepage/ScrollToTop";
import Navbar from "@/components/navbar/Navbar";
import TopCredibilityBar from "@/components/navbar/TopCredibilityBar";
import { Open_Sans, Poppins } from "next/font/google";
import Script from "next/script";
import { fetchNavbarData } from "@/lib/api";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-poppins",
});
const opensans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
});

export const metadata = {
  applicationName: "NS2 Infotech",
  title: "NS2 Infotech | Modern Institute of Automation",
  description:
    "Empowering the next generation of automation experts with industry-leading training and placement support.",
  keywords: [
    "Automation",
    "PLC",
    "SCADA",
    "Robotics",
    "Industrial training",
    "NS2 Infotech",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "NS2 Infotech | Modern Institute of Automation",
    description: "Empowering the next generation of automation experts.",
    type: "website",
    locale: "en_US",
    siteName: "NS2 Infotech",
  },
  twitter: {
    card: "summary_large_image",
    title: "NS2 Infotech | Modern Institute of Automation",
    description: "Empowering the next generation of automation experts.",
  },
};

export default async function RootLayout({ children }) {
  const navbarData = await fetchNavbarData();
  const statistics = navbarData?.header?.statistics || [];
  const socialLinks = navbarData?.footer?.social_links || [];

  return (
    <html lang="en" className={`${poppins.variable} ${opensans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" />

        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Z9P7RWW6VP"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Z9P7RWW6VP', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="font-opensans flex flex-col min-h-screen">
        <GoogleAnalytics />
        <div className="sticky top-0 z-[100]">
          <TopCredibilityBar stats={statistics} socialLinks={socialLinks} />
          <Navbar />
        </div>
        <main className="flex-grow">{children}</main>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}

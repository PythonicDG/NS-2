import Footer from "@/components/footer/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Navbar from "@/components/navbar/Navbar";
import { Open_Sans, Poppins } from "next/font/google";
import Script from "next/script";
import { fetchNavbarData } from "@/lib/api";
import { ModalProvider } from "@/context/ModalContext";
import EnrollModal from "@/components/common/EnrollModal";
import EnquiryPopupManager from "@/components/common/EnquiryPopupManager";
import NavigationScrollReset from "@/components/common/NavigationScrollReset";
import "./globals.css";

// Header and footer content is managed in Django and must be read on each request.
export const dynamic = "force-dynamic";

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
  applicationName: "Modern Institute of Automation",
  title: "MIA | Modern Institute of Automation",
  description:
    "Empowering the next generation of automation experts with industry-leading training and placement support.",
  keywords: [
    "Automation",
    "PLC",
    "SCADA",
    "Robotics",
    "Industrial training",
    "MIA",
    "Modern Institute of Automation",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "MIA | Modern Institute of Automation",
    description: "Empowering the next generation of automation experts.",
    type: "website",
    locale: "en_US",
    siteName: "Modern Institute of Automation",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIA | Modern Institute of Automation",
    description: "Empowering the next generation of automation experts.",
  },
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const navbarData = await fetchNavbarData();
  const phone = navbarData?.footer?.company?.phone;

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
        <NavigationScrollReset />
        <ModalProvider>
          <GoogleAnalytics />
          <div className="sticky top-0 z-[100]">
            <Navbar />
          </div>
          <main className="flex-grow">{children}</main>
          <WhatsAppButton phone={phone} />
          <Footer />
          <EnrollModal />
          <EnquiryPopupManager />
        </ModalProvider>
      </body>
    </html>
  );
}

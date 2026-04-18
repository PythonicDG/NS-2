import Footer from "@/components/footer/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollToTop from "@/components/homepage/ScrollToTop";
import Navbar from "@/components/navbar/Navbar";
import { Open_Sans, Poppins } from "next/font/google";
import Script from "next/script";
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
  title: "MIA",
  description: "Modern Institute of Automation",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
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

        <Navbar />
        <main className="flex-grow">{children}</main>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}

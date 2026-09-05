import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SmoothScroll from "./component/SmoothScroll";
import { ScrollProgress } from "./component/Reveal";
import WhatsApp from "./component/WhatsApp";
import PageTransition from "./component/PageTransition";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Kumarthestar — Coaching, Languages, Media, Trading & Consultancy",
    template: "%s | Kumarthestar",
  },
  description:
    "Kumarthestar is a proprietorship firm offering online coaching for Classes 1–12, entrance and competitive exams, defence and civil services, school and university admissions, spoken English, regional and foreign languages, drama and short movies, coffee and tea, cooking classes in Mysuru, corporate gifts, sales promotions, worldwide job consultancy, real estate, clothing and security staffing.",
  keywords: [
    "Kumarthestar",
    "online coaching Classes 1 to 12",
    "competitive exam coaching",
    "NDA CDS AFCAT coaching",
    "IAS IPS coaching",
    "spoken English classes",
    "cooking classes Mysuru",
    "job consultancy",
    "corporate gifts",
    "real estate Mysuru",
    "security and bouncers",
    "Candy International Animal Welfare",
  ],
};

export const viewport = {
  themeColor: "#0B1E3D",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <noscript>
          <style>{`[data-reveal],[data-reveal] *{opacity:1!important;transform:none!important;filter:none!important}[data-hero-video]{opacity:1!important}[data-page-transition]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className="font-[family-name:var(--font-body)] bg-brand-cream text-brand-slate antialiased"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <WhatsApp/>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SmoothScroll from "./component/SmoothScroll";
import { ScrollProgress } from "./component/Reveal";
import WhatsApp from "./component/WhatsApp";

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
  title: "Kumar The Star — Competitive Exam Coaching",
  description:
    "Structured coaching for NTSE, JEE, NEET, Olympiads and 50+ competitive exams. 200+ verified faculty, weekly mock tests and a 98% success rate.",
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
          <style>{`[data-reveal],[data-reveal] *{opacity:1!important;transform:none!important;filter:none!important}[data-hero-video]{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body className="font-[family-name:var(--font-body)] bg-brand-cream text-brand-slate antialiased">
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <WhatsApp/>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SmoothScroll from "./component/SmoothScroll";
import { ScrollProgress } from "./component/Reveal";

/* Body face — Poppins was imported before but never applied to the
   document, so the whole site silently fell back to the system font. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

/* Display face — a high-contrast serif for headlines. This pairing
   (geometric sans body + editorial serif display) is what separates
   "template" from "premium brand" more than any colour choice. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  /* Required once any page exports an openGraph image, otherwise Next
     resolves those URLs against localhost. Set NEXT_PUBLIC_SITE_URL in
     the deploy environment to the real domain. */
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
        {/* Without JS, GSAP never runs — make sure reveal targets stay visible.
            The hero video needs the same treatment: it fades in from a React
            state flag set by onCanPlay, which never fires without hydration,
            so it would autoplay permanently invisible. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal] *{opacity:1!important;transform:none!important;filter:none!important}[data-hero-video]{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body className="font-[family-name:var(--font-body)] bg-brand-cream text-brand-slate antialiased">
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

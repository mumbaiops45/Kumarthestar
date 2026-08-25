import AdmissionContent from "./AdmissionContent";

/* Server component wrapper — keeps per-page metadata available while the
   interactive body (form, FAQ, scrubbed timeline) stays a client component. */
export const metadata = {
  title: "Admissions — Apply to Kumar The Star",
  description:
    "Five clear steps from enquiry to your first class. Rolling intake across JEE, NEET, NTSE, Olympiads, CA/CS/CMA and language programmes, with counselling, diagnostic placement and merit scholarships.",
  openGraph: {
    title: "Admissions — Apply to Kumar The Star",
    description:
      "Five clear steps from enquiry to your first class. Rolling intake, counselling and merit scholarships.",
  },
};

export default function AdmissionPage() {
  return <AdmissionContent />;
}

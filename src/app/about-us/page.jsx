import AboutContent from "./AboutContent";
import { contact, founder, site } from "../../data/site";
import { divisions } from "../../data/divisions";

export const metadata = {
  title: "About Us | Kumarthestar - Coaching, Languages, Media, Trading & More",
  description:
    "Kumarthestar is a proprietorship firm founded by Kumara Swamy N (MBA). Online coaching for Classes 1-12, entrance and competitive exams, defence and civil services, admissions, spoken English, regional and foreign languages, drama, short movies, coffee, tea, cooking classes in Mysuru, corporate gifts, sales promotions, job consultancy, real estate, clothing, security staffing and the Candy International Animal Welfare Organization.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Kumarthestar - One Firm, Many Services",
    description:
      "A proprietorship firm running coaching, language training, drama and short films, coffee and tea, cooking classes in Mysuru, corporate services, real estate, security staffing and animal welfare.",
    url: "/about-us",
    type: "website",
  },
};

function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    alternateName: site.displayName,
    description: site.shortIntro,
    url: `${site.url}/about-us`,
    telephone: contact.phones.map((p) => `+${p.raw}`),
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      addressCountry: contact.address.country,
    },
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: `${founder.role} (${founder.qualification})`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Kumarthestar Services",
      itemListElement: divisions.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d.title, description: d.description },
        availability:
          d.status === "coming-soon"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/InStock",
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function AboutUsPage() {
  return (
    <>
      <StructuredData />
      <AboutContent />
    </>
  );
}

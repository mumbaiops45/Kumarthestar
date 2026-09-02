import ServicesContent from "./ServicesContent";
import { contact, site } from "../../data/site";
import { divisions, divisionCategories } from "../../data/divisions";

export const metadata = {
  title: "Our Services | Kumarthestar - Coaching, Languages, Media, Trading & More",
  description:
    "All 20 service lines Kumarthestar runs: online coaching for Classes 1-12, entrance and competitive exams, defence and civil services, school and college admissions, spoken English, regional and foreign languages, drama, short movies, coffee, tea, cooking classes in Mysuru, corporate gifts, sales promotions, job consultancy, real estate, clothing, security staffing and animal welfare.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Every Service Kumarthestar Offers, On One Page",
    description:
      "Coaching and admissions, language training, drama and short films, coffee and tea, cooking classes in Mysuru, corporate services, real estate, security staffing and animal welfare - one firm, one point of contact.",
    url: "/services",
    type: "website",
  },
};

function StructuredData() {
  const catalogue = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${site.name} Services`,
    url: `${site.url}/services`,
    numberOfItems: divisions.length,
    provider: {
      "@type": "ProfessionalService",
      name: site.name,
      url: site.url,
      telephone: contact.phones.map((p) => `+${p.raw}`),
      email: contact.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: contact.address.city,
        addressRegion: contact.address.state,
        addressCountry: contact.address.country,
      },
    },
    itemListElement: divisionCategories
      .filter((cat) => cat.key !== "all")
      .map((cat) => ({
        "@type": "OfferCatalog",
        name: cat.label,
        itemListElement: divisions
          .filter((d) => d.category === cat.key)
          .map((d) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: d.title,
              description: d.description,
              serviceType: cat.label,
              provider: { "@type": "ProfessionalService", name: site.name },
            },
            availability:
              d.status === "coming-soon"
                ? "https://schema.org/PreOrder"
                : "https://schema.org/InStock",
          })),
      })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogue) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}

export default function ServicesPage() {
  return (
    <>
      <StructuredData />
      <ServicesContent />
    </>
  );
}

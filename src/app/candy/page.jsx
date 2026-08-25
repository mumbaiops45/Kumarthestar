import CandyContent from "./CandyContent";

/* Same split as /books and /placement: the interactive body is a client
   component so this file can stay a server component and export real
   per-page metadata. */
export const metadata = {
  title: "Candy T-Shirts — Official Merchandise | Kumar The Star",
  description:
    "Campus t-shirts from Kumar The Star — heavyweight cotton tees in sizes XS to XXL, bulk pricing for batch orders, and ordering in one message on WhatsApp.",
  openGraph: {
    title: "Candy T-Shirts — Official Merchandise",
    description:
      "Heavyweight cotton campus tees, XS to XXL. Bulk pricing for batch orders. Order on WhatsApp.",
    type: "website",
  },
};

export default function CandyPage() {
  return <CandyContent />;
}

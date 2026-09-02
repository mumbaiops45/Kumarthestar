
export const site = {
  name: "Kumarthestar",
  displayName: "Kumar The Star",
  legalName: "Kumarthestar",
  entityType: "Proprietorship Firm",
  tagline: "One firm. Many services. One standard.",
  shortIntro:
    "Kumarthestar is a proprietorship firm running a group of service verticals — from online coaching for Classes 1–12 and every major competitive exam, to language training, media, trading, corporate services and animal welfare.",
  foundedIn: "Mysuru, Karnataka",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const founder = {
  name: "Kumara Swamy N",
  qualification: "MBA",
  role: "Founder & Proprietor",
  bio: "Kumara Swamy N founded Kumarthestar to bring one accountable standard to services families usually have to chase across a dozen different vendors — a teacher, a counsellor, a caterer, a recruiter, a broker. Every vertical below is run under that same single point of responsibility.",
  photo: "/owner.jpeg",
};

export const contact = {
  phones: [
    { label: "+91 96204 06020", raw: "919620406020", primary: true },
    { label: "+91 99163 75514", raw: "919916375514", primary: false },
  ],
  whatsapp: "919620406020",
  email: "info@kumarthestar.com",
  address: {
    line1: "Kumarthestar",
    city: "Mysuru",
    state: "Karnataka",
    country: "India",
    full: "Mysuru, Karnataka, India",
  },
  hours: "Monday – Saturday, 9:00 AM – 8:00 PM IST",
};

export const primaryPhone = contact.phones[0];


export const formEndpoint =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ??
  "https://formsubmit.co/ajax/mumbaiops45@gmail.com";

export const whatsappLink = (message = "Hello Kumarthestar, I would like to know more about your services.") =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const socials = [
  { label: "Facebook", href: "#", key: "facebook" },
  { label: "Instagram", href: "#", key: "instagram" },
  { label: "LinkedIn", href: "#", key: "linkedin" },
  { label: "YouTube", href: "#", key: "youtube" },
];


export const routes = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Our Services", href: "/services" },
  { name: "Tutoring", href: "/courses" },
  { name: "Placements", href: "/placement" },
  { name: "Candy T-Shirts", href: "/candy" },
  { name: "Contact", href: "/contact" },
];

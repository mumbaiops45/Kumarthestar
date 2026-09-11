// Ad entries shown on the /advertisement page.
// To list a new academic institution or company, add an object below —
// no other file needs to change. `logo` is a path under /public (or a
// full https:// URL); leave it null to show the initials badge instead.

export const adCategories = ["Academic Institution", "Company"];

export const ads = [
  {
    id: 1,
    name: "ABC University",
    category: "Academic Institution",
    tagline: "Build Your Future With Us",
    description: "Explore our undergraduate and postgraduate programs.",
    logo: null, // no logo file yet — was "/ads/abc-university.png"
    website: "https://example.com",
    featured: true,
  },
  {
    id: 2,
    name: "XYZ Company",
    category: "Company",
    tagline: "Grow With Innovation",
    description: "Learn more about our products and services.",
    logo: null, // no logo file yet — was "/ads/xyz-company.png"
    website: "https://example.com",
    featured: false,
  },
];

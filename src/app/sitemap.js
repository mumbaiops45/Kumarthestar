import { site } from "../data/site";

const paths = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about-us", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/courses", priority: 0.8, changeFrequency: "monthly" },
  { path: "/admission", priority: 0.8, changeFrequency: "monthly" },
  { path: "/placement", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faculty", priority: 0.6, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.5, changeFrequency: "monthly" },
  { path: "/books", priority: 0.5, changeFrequency: "monthly" },
  { path: "/candy", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap() {
  const lastModified = new Date();

  return paths.map((entry) => ({
    url: `${site.url}${entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

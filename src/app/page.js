import Home from "./component/Home";

export const metadata = {
  title: "Kumarthestar — Coaching, Languages, Media, Trading & Consultancy",
  description:
    "A proprietorship firm running online coaching for Classes 1–12, entrance and competitive exams, defence and civil services, admissions, spoken English and foreign languages, drama and short movies, coffee, tea, cooking classes in Mysuru, corporate gifts, sales promotions, job consultancy, real estate, clothing and security staffing.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <Home />;
}

import BooksContent from "./BooksContent";

export const metadata = {
  title: "MBA is Fun Da — A Book by Kumara Swamy N | Kumar The Star",
  description:
    "MBA is Fun Da, the first book by Kumara Swamy N, founder of Kumar The Star — management ideas retold in plain language, with case studies drawn from Indian campuses and workplaces.",
  openGraph: {
    title: "MBA is Fun Da — A Book by Kumara Swamy N",
    description:
      "Management ideas retold in plain language, by the founder of Kumar The Star.",
    images: ["/book.jpeg"],
    type: "book",
  },
};

export default function BooksPage() {
  return <BooksContent />;
}

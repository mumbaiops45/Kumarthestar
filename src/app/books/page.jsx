import BooksContent from "./BooksContent";

/* The interactive body lives in BooksContent (a client component) so that
   this file can stay a server component and export real per-page metadata.
   Every other page in this app is `use client` at the top level, which is
   why none of them can be indexed with their own title or description. */
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

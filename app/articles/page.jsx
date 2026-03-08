import { SITE_URL } from "@/lib/data";
import ArticleList from "@/components/ArticleList";

export const metadata = {
  title: "Articles",
  description: "Articles and notes by Shohbaxt Axmedov — hiking stories, running, and weekly digests.",
  alternates: { canonical: `${SITE_URL}/articles` },
  openGraph: {
    title: "Articles | Shohbaxt Axmedov",
    description: "Articles and notes by Shohbaxt Axmedov.",
    url: `${SITE_URL}/articles`,
  },
};

export default function ArticlesPage() {
  return (
    <div>
      <h2 className="section-title">
        Articles & Notes
        <span className="text-small" style={{ fontWeight: "normal", color: "var(--faint)", marginLeft: "8px" }}>
          from Substack
        </span>
      </h2>
      <ArticleList />
    </div>
  );
}

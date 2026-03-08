import { SITE_DATA, SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Articles",
  description:
    "Technical articles and notes by Shohbaxt Axmedov on CI/CD, payment integrations in Uzbekistan, SEO, Next.js, and running a business as YATT.",
  alternates: { canonical: `${SITE_URL}/articles` },
  openGraph: {
    title: "Articles | Shohbaxt Axmedov",
    description: "Technical articles on DevOps, payments, SEO, and business in Uzbekistan.",
    url: `${SITE_URL}/articles`,
  },
};

export default function ArticlesPage() {
  return (
    <div>
      <h2 className="section-title">Articles &amp; Notes</h2>
      {SITE_DATA.articles.map((a, i) => (
        <article key={i} className="mini-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <a href="#" style={{ fontSize: "13px", fontWeight: "bold" }}>{a.title}</a>
            <time
              dateTime={a.date}
              className="text-small"
              style={{ color: "var(--faint)", whiteSpace: "nowrap", marginLeft: "10px" }}
            >
              {a.date}
            </time>
          </div>
          <div style={{ marginTop: "4px" }}>
            {a.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
          </div>
        </article>
      ))}
    </div>
  );
}

import { SITE_DATA, SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Shohbaxt Axmedov — email, GitHub, Telegram. Open to freelance work, collaborations, and interesting conversations.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact | Shohbaxt Axmedov",
    description: "Reach out via email, GitHub, or Telegram. Based in Tashkent, Uzbekistan.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Shohbaxt Axmedov",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Shohbaxt Axmedov",
      email: SITE_DATA.email,
      url: `https://${SITE_DATA.github}`,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <h2 className="section-title">Contact</h2>
      <table className="data-table" style={{ maxWidth: "400px" }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold", width: "100px" }}>Email</td>
            <td><a href={`mailto:${SITE_DATA.email}`}>{SITE_DATA.email}</a></td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>GitHub</td>
            <td><a href={`https://${SITE_DATA.github}`} target="_blank" rel="noopener noreferrer">{SITE_DATA.github}</a></td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Telegram</td>
            <td><a href={`${SITE_DATA.telegram}`} target="_blank" rel="noopener noreferrer">{SITE_DATA.telegram}</a></td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Location</td>
            <td>{SITE_DATA.location}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ fontSize: "13px", margin: "14px 0 8px 0" }}>Elsewhere</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {[
          { label: "Instagram", href: "https://instagram.com/shohbaxt_axmedov" },
          { label: "Twitter", href: "https://x.com/shayboniy_" },
          { label: "Substack", href: "https://shohbaxt.substack.com" },
          { label: "Strava", href: "https://www.strava.com/athletes/139786925" }
        ].map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="tag" style={{ textDecoration: "none", padding: "3px 8px", fontSize: "11px" }}>
            {s.label}
          </a>
        ))}
      </div>

      <hr className="dashed" />
      <p style={{ fontSize: "12px" }}>
        {/* Open to freelance work, collaborations, and building something new.<br /> */}
        Best way to reach me is Telegram — I usually reply within a few hours.
      </p>
    </div>
  );
}

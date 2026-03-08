import { MOCK_MOVIES, SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Movies",
  description: "Shohbaxt's movie log — recently watched films with ratings.",
  alternates: { canonical: `${SITE_URL}/movies` },
};

export default function MoviesPage() {
  return (
    <div>
      <h2 className="section-title">
        Movie Log
        <span className="text-small" style={{ fontWeight: "normal", color: "var(--faint)", marginLeft: "8px" }}>
          from IMDb watchlist
        </span>
      </h2>

      {/* Mobile cards */}
      <div className="hide-desktop">
        {MOCK_MOVIES.map((m, i) => (
          <div key={i} className="mini-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>{m.title}</span>
              <span className="font-mono text-small">{m.rating}</span>
            </div>
            <div className="text-small" style={{ marginTop: "2px", color: "var(--muted)" }}>
              {m.year} &middot; watched {m.watched}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <table className="data-table hide-mobile">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>#</th>
            <th>Title</th>
            <th>Year</th>
            <th>My Rating</th>
            <th>Watched</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_MOVIES.map((m, i) => (
            <tr key={i}>
              <td style={{ color: "var(--faint)", textAlign: "center" }}>{i + 1}</td>
              <td style={{ fontWeight: "bold" }}>{m.title}</td>
              <td>{m.year}</td>
              <td className="font-mono">{m.rating}</td>
              <td className="text-small" style={{ color: "var(--faint)" }}>{m.watched}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

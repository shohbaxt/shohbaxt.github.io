import { MOCK_SPOTIFY, SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Now Playing",
  description: "What Shohbaxt is listening to — recently played tracks from Spotify.",
  alternates: { canonical: `${SITE_URL}/now-playing` },
};

export default function NowPlayingPage() {
  return (
    <div>
      <h2 className="section-title">
        Now Playing
        <span className="text-small" style={{ fontWeight: "normal", color: "var(--faint)", marginLeft: "8px" }}>
          via Spotify API
        </span>
      </h2>

      {/* Mobile cards */}
      <div className="hide-desktop">
        {MOCK_SPOTIFY.map((t, i) => (
          <div key={i} className="mini-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>{t.track}</span>
              <span className="text-small" style={{ color: "var(--faint)" }}>{t.played}</span>
            </div>
            <div className="text-small" style={{ marginTop: "2px" }}>
              {t.artist} — <span style={{ fontStyle: "italic", color: "var(--muted)" }}>{t.album}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <table className="data-table hide-mobile">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>#</th>
            <th>Track</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Played</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_SPOTIFY.map((t, i) => (
            <tr key={i}>
              <td style={{ color: "var(--faint)", textAlign: "center" }}>{i + 1}</td>
              <td style={{ fontWeight: "bold" }}>{t.track}</td>
              <td>{t.artist}</td>
              <td style={{ fontStyle: "italic", color: "var(--muted)" }}>{t.album}</td>
              <td className="text-small" style={{ color: "var(--faint)" }}>{t.played}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-small" style={{ color: "var(--faint)" }}>
        Data refreshes every 5 minutes. Connect your own via the{" "}
        <a href="https://developer.spotify.com/" target="_blank" rel="noopener noreferrer">Spotify Web API</a>.
      </p>
    </div>
  );
}

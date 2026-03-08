import { MOCK_STRAVA, SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Running",
  description: "Shohbaxt's running stats and recent activities tracked via Strava.",
  alternates: { canonical: `${SITE_URL}/running` },
};

export default function RunningPage() {
  return (
    <div>
      <h2 className="section-title">
        Running
        <span className="text-small" style={{ fontWeight: "normal", color: "var(--faint)", marginLeft: "8px" }}>
          via Strava API
        </span>
      </h2>
      <div style={{ marginBottom: "12px" }}>
        <div className="stat-box">
          <span className="stat-number">{MOCK_STRAVA.weeklyKm}</span>
          <span className="stat-label">km this week</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{MOCK_STRAVA.monthlyKm}</span>
          <span className="stat-label">km this month</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{MOCK_STRAVA.totalRuns}</span>
          <span className="stat-label">total runs</span>
        </div>
      </div>
      <h3 style={{ fontSize: "13px", margin: "10px 0 6px 0" }}>Recent Activities</h3>

      {/* Mobile cards */}
      <div className="hide-desktop">
        {MOCK_STRAVA.recentRuns.map((r, i) => (
          <div key={i} className="mini-card">
            <div style={{ fontWeight: "bold", fontSize: "13px" }}>{r.name}</div>
            <div className="text-small" style={{ marginTop: "2px", display: "flex", gap: "12px" }}>
              <span><strong>{r.distance}</strong></span>
              <span>{r.pace}</span>
              <span style={{ color: "var(--faint)" }}>{r.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <table className="data-table hide-mobile">
        <thead>
          <tr>
            <th>Run</th>
            <th>Distance</th>
            <th>Pace</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_STRAVA.recentRuns.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td style={{ fontWeight: "bold" }}>{r.distance}</td>
              <td>{r.pace}</td>
              <td className="text-small" style={{ color: "var(--faint)" }}>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

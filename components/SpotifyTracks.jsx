"use client";

import { useState, useEffect } from "react";

function timeAgo(dateStr) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function SpotifyTracks() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/spotify-data.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ color: "var(--muted)", padding: "20px 0" }}>Loading...</p>;
  }

  if (!data || !data.songs || data.songs.length === 0) {
    return <p style={{ color: "var(--muted)" }}>No tracks available yet.</p>;
  }

  const { songs, updated } = data;

  return (
    <>
      {/* Mobile cards */}
      <div className="hide-desktop">
        {songs.map((t, i) => (
          <a key={i} href={t.url} target="_blank" rel="noopener noreferrer" className="mini-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>{t.track}</span>
              <span className="text-small" style={{ color: "var(--faint)" }}>{timeAgo(t.added)}</span>
            </div>
            <div className="text-small" style={{ marginTop: "2px" }}>
              {t.artist} — <span style={{ fontStyle: "italic", color: "var(--muted)" }}>{t.album}</span>
            </div>
          </a>
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
            <th>Added</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((t, i) => (
            <tr key={i}>
              <td style={{ color: "var(--faint)", textAlign: "center" }}>{i + 1}</td>
              <td>
                <a href={t.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold", color: "inherit" }}>
                  {t.track}
                </a>
              </td>
              <td>{t.artist}</td>
              <td style={{ fontStyle: "italic", color: "var(--muted)" }}>{t.album}</td>
              <td className="text-small" style={{ color: "var(--faint)" }}>{timeAgo(t.added)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {updated && (
        <p className="text-small" style={{ color: "var(--faint)", marginTop: "4px" }}>
          Last updated: {new Date(updated).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
      )}
    </>
  );
}

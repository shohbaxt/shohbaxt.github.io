"use client";

import { useState, useEffect } from "react";
import { getSpotifyAuthUrl, parseHashToken, fetchRecentlyPlayed, fetchLikedSongs } from "@/lib/spotify";

export default function SpotifyTracks() {
  const [tracks, setTracks] = useState(null);
  const [mode, setMode] = useState("recent"); // "recent" or "liked"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for token in hash (redirect from Spotify)
    const hashToken = parseHashToken();
    if (hashToken) {
      sessionStorage.setItem("spotify_token", hashToken);
      setToken(hashToken);
      return;
    }
    // Check for existing token in sessionStorage
    const stored = sessionStorage.getItem("spotify_token");
    if (stored) {
      setToken(stored);
      return;
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!token) return;
    loadTracks(token, mode);
  }, [token, mode]);

  async function loadTracks(tkn, m) {
    setLoading(true);
    setError(null);
    try {
      const data = m === "liked" ? await fetchLikedSongs(tkn) : await fetchRecentlyPlayed(tkn);
      setTracks(data);
    } catch (e) {
      sessionStorage.removeItem("spotify_token");
      setToken(null);
      setError("Session expired. Please reconnect.");
    }
    setLoading(false);
  }

  // Not connected
  if (!token && !loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <p style={{ marginBottom: "16px", color: "var(--muted)" }}>
          Connect your Spotify account to see your listening activity.
        </p>
        <a
          href={getSpotifyAuthUrl()}
          className="spotify-btn"
        >
          Connect Spotify
        </a>
      </div>
    );
  }

  if (loading) {
    return <p style={{ color: "var(--muted)", padding: "20px 0" }}>Loading tracks from Spotify...</p>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <p style={{ color: "var(--muted)", marginBottom: "16px" }}>{error}</p>
        <a href={getSpotifyAuthUrl()} className="spotify-btn">
          Reconnect Spotify
        </a>
      </div>
    );
  }

  if (!tracks || tracks.length === 0) {
    return <p style={{ color: "var(--muted)" }}>No tracks found.</p>;
  }

  return (
    <>
      {/* Mode toggle */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          onClick={() => setMode("recent")}
          className={`tab-btn ${mode === "recent" ? "tab-active" : ""}`}
        >
          Recently Played
        </button>
        <button
          onClick={() => setMode("liked")}
          className={`tab-btn ${mode === "liked" ? "tab-active" : ""}`}
        >
          Liked Songs
        </button>
      </div>

      {/* Mobile cards */}
      <div className="hide-desktop">
        {tracks.map((t, i) => (
          <a key={i} href={t.url} target="_blank" rel="noopener noreferrer" className="mini-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>{t.track}</span>
              <span className="text-small" style={{ color: "var(--faint)" }}>{t.played}</span>
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
            <th>{mode === "recent" ? "Played" : "Added"}</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((t, i) => (
            <tr key={i}>
              <td style={{ color: "var(--faint)", textAlign: "center" }}>{i + 1}</td>
              <td>
                <a href={t.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold", color: "inherit" }}>
                  {t.track}
                </a>
              </td>
              <td>{t.artist}</td>
              <td style={{ fontStyle: "italic", color: "var(--muted)" }}>{t.album}</td>
              <td className="text-small" style={{ color: "var(--faint)" }}>{t.played}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-small" style={{ color: "var(--faint)", marginTop: "8px" }}>
        <button
          onClick={() => { sessionStorage.removeItem("spotify_token"); setToken(null); setTracks(null); }}
          style={{ background: "none", border: "none", color: "var(--faint)", cursor: "pointer", textDecoration: "underline", padding: 0, font: "inherit" }}
        >
          Disconnect
        </button>
      </p>
    </>
  );
}

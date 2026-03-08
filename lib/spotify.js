// Replace with your Spotify app's Client ID
export const SPOTIFY_CLIENT_ID = "fceeb93b54a14acb927d2ee44845e679";

export const SPOTIFY_SCOPES = "user-read-recently-played user-library-read";
export const SPOTIFY_REDIRECT_URI = "https://shohbaxt.github.io/now-playing";

export function getSpotifyAuthUrl() {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "token",
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: SPOTIFY_SCOPES,
    show_dialog: "false",
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export function parseHashToken() {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.substring(1);
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const token = params.get("access_token");
  if (token) {
    // Clean the hash from URL
    window.history.replaceState(null, "", window.location.pathname);
  }
  return token;
}

export async function fetchRecentlyPlayed(token) {
  const res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=20", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch recently played");
  const data = await res.json();
  return data.items.map((item) => ({
    track: item.track.name,
    artist: item.track.artists.map((a) => a.name).join(", "),
    album: item.track.album.name,
    played: timeAgo(item.played_at),
    url: item.track.external_urls.spotify,
  }));
}

export async function fetchLikedSongs(token) {
  const res = await fetch("https://api.spotify.com/v1/me/tracks?limit=20", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch liked songs");
  const data = await res.json();
  return data.items.map((item) => ({
    track: item.track.name,
    artist: item.track.artists.map((a) => a.name).join(", "),
    album: item.track.album.name,
    played: `Added ${timeAgo(item.added_at)}`,
    url: item.track.external_urls.spotify,
  }));
}

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
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

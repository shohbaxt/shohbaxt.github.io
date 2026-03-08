import { SITE_URL } from "@/lib/data";
import SpotifyTracks from "@/components/SpotifyTracks";

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

      <SpotifyTracks />
    </div>
  );
}

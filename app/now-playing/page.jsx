import { SITE_URL } from "@/lib/data";
import SpotifyTracks from "@/components/SpotifyTracks";

export const metadata = {
  title: "Liked Songs",
  description: "Shohbaxt's liked songs on Spotify — favorite tracks and music taste.",
  alternates: { canonical: `${SITE_URL}/now-playing` },
};

export default function NowPlayingPage() {
  return (
    <div>
      <h2 className="section-title">
        Liked Songs
        <span className="text-small" style={{ fontWeight: "normal", color: "var(--faint)", marginLeft: "8px" }}>
          via Spotify
        </span>
      </h2>

      <SpotifyTracks />
    </div>
  );
}

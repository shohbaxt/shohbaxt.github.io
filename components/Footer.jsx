import { SITE_DATA } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="site-footer">
      &copy; {new Date().getFullYear()} {SITE_DATA.shortName} &middot; Tashkent, Uzbekistan
    </footer>
  );
}

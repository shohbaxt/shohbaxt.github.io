import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div style={{ minHeight: "300px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <h2 className="section-title">404 — Page Not Found</h2>
      <p style={{ fontSize: "13px", marginBottom: "12px" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <p>
        <Link href="/">Go back home</Link>
      </p>
    </div>
  );
}

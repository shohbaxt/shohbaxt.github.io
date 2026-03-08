"use client";

import { useState, useEffect } from "react";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function ArticleList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/articles-data.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ color: "var(--muted)", padding: "20px 0" }}>Loading...</p>;
  }

  if (!data || !data.articles || data.articles.length === 0) {
    return <p style={{ color: "var(--muted)" }}>No articles yet.</p>;
  }

  return (
    <>
      {data.articles.map((a, i) => (
        <article key={i} className="mini-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", fontWeight: "bold" }}>
              {a.title}
            </a>
            <time
              dateTime={a.date}
              className="text-small"
              style={{ color: "var(--faint)", whiteSpace: "nowrap", marginLeft: "10px" }}
            >
              {formatDate(a.date)}
            </time>
          </div>
          {a.description && (
            <div className="text-small" style={{ marginTop: "4px", color: "var(--muted)" }}>
              {a.description.length > 120 ? a.description.slice(0, 120) + "..." : a.description}
            </div>
          )}
        </article>
      ))}
    </>
  );
}

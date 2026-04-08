import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./posts/index";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and insights on Google review management, reputation management, and growing your local business with AI-powered review responses.",
  alternates: {
    canonical: "https://www.replybasehq.com/blog",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0f0f0" }}>
      {/* Nav */}
      <nav
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "linear-gradient(135deg, #7c6aff 0%, #00d4aa 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
            }}
          >
            ✦
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#f0f0f0",
              letterSpacing: "-0.02em",
            }}
          >
            ReplyBase
          </span>
        </Link>
        <Link
          href="/signup"
          className="btn-primary"
          style={{ fontSize: "0.875rem", padding: "0.5rem 1.25rem" }}
        >
          Get Started
        </Link>
      </nav>

      {/* Header */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 1.5rem 2.5rem", textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            background: "rgba(124,106,255,0.12)",
            border: "1px solid rgba(124,106,255,0.25)",
            borderRadius: 100,
            padding: "0.3rem 1rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "#a78bfa",
            marginBottom: "1.25rem",
          }}
        >
          Resources
        </span>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#f5f5f7",
            lineHeight: 1.15,
            marginBottom: "1rem",
          }}
        >
          Google Review Management Blog
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.5)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          Guides, templates, and strategies to help local businesses master review
          management and grow their reputation on Google.
        </p>
      </div>

      {/* Posts grid */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "1rem 1.5rem 6rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
            <article
              className="blog-card"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "1.75rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
            >
              {/* Meta */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                  fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                <span>{formatDate(post.date)}</span>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                <span>{post.readTime}</span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#f0f0f0",
                  lineHeight: 1.4,
                  marginBottom: "0.75rem",
                }}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, flex: 1, marginBottom: "1.25rem" }}>
                {post.excerpt}
              </p>

              {/* Read link */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", fontWeight: 600, color: "#7c6aff" }}>
                Read article
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Footer CTA */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "3rem 1.5rem",
          textAlign: "center",
          background: "rgba(124,106,255,0.03)",
        }}
      >
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#f0f0f0", marginBottom: "0.625rem" }}>
          Ready to automate your Google review replies?
        </p>
        <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)", marginBottom: "1.5rem" }}>
          ReplyBase handles everything — from syncing reviews to posting replies.
        </p>
        <Link href="/signup" className="btn-primary" style={{ display: "inline-flex" }}>
          Get Started
        </Link>
      </div>
    </div>
  );
}

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
    <div style={{ background: "#050505", minHeight: "100vh", color: "#F0F0F0" }}>
      {/* Nav */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(5,5,5,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 2rem",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", gap: 0 }}>
          <span style={{ fontWeight: 700, fontSize: "1.0625rem", color: "#F0F0F0", letterSpacing: "-0.02em" }}>Reply</span>
          <span style={{ fontWeight: 700, fontSize: "1.0625rem", color: "#00E5CC", letterSpacing: "-0.02em" }}>Base</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>← Home</Link>
          <Link href="/help" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>Help</Link>
          <Link href="/signup" style={{
            fontSize: "0.875rem", fontWeight: 600, color: "#000",
            background: "#00E5CC", textDecoration: "none",
            padding: "0.5rem 1.25rem", borderRadius: 9999,
            display: "inline-flex", alignItems: "center",
          }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 1.5rem 2.5rem", textAlign: "center" }}>
        <span style={{
          display: "inline-block",
          background: "rgba(0,229,204,0.1)",
          border: "1px solid rgba(0,229,204,0.25)",
          borderRadius: 100,
          padding: "0.3rem 1rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: "#00E5CC",
          marginBottom: "1.25rem",
        }}>
          Resources
        </span>
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "#F0F0F0",
          lineHeight: 1.15,
          marginBottom: "1rem",
        }}>
          Google Review Management Blog
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "#6B7280", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          Guides, templates, and strategies to help local businesses master review
          management and grow their reputation on Google.
        </p>
      </div>

      {/* Posts grid */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "1rem 1.5rem 6rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1.25rem",
      }}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
            <article
              className="card-lift"
              style={{
                background: "#0D0D0D",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "1.75rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Meta */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
                fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.3)",
              }}>
                <span>{formatDate(post.date)}</span>
                <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
                <span>{post.readTime}</span>
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: "1.0625rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#F0F0F0",
                lineHeight: 1.4,
                marginBottom: "0.75rem",
              }}>
                {post.title}
              </h2>

              {/* Excerpt */}
              <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.65, flex: 1, marginBottom: "1.25rem" }}>
                {post.excerpt}
              </p>

              {/* Read link */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", fontWeight: 600, color: "#00E5CC" }}>
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
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "3rem 1.5rem",
        textAlign: "center",
        background: "#0D0D0D",
      }}>
        <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "#F0F0F0", marginBottom: "0.625rem" }}>
          Ready to automate your Google review replies?
        </p>
        <p style={{ fontSize: "0.9375rem", color: "#6B7280", marginBottom: "1.5rem" }}>
          ReplyBase handles everything — from syncing reviews to posting replies.
        </p>
        <Link href="/signup" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          background: "#00E5CC", color: "#000",
          fontWeight: 700, fontSize: "1rem",
          padding: "0.875rem 2rem", borderRadius: 9999,
          textDecoration: "none",
        }}>
          Get Started
        </Link>
      </div>
    </div>
  );
}

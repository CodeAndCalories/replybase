import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — ReplyBase",
  description:
    "Tips, guides, and insights on review management, reputation management, and growing your local business with AI.",
  alternates: {
    canonical: "https://replybase.io/blog",
  },
};

export default function BlogPage() {
  return (
    <main
      style={{
        background: "#0a0a0f",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem",
        textAlign: "center",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <span
          style={{
            display: "inline-block",
            background: "rgba(124,106,255,0.15)",
            border: "1px solid rgba(124,106,255,0.3)",
            borderRadius: "9999px",
            padding: "0.35rem 1rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#7c6aff",
            marginBottom: "2rem",
          }}
        >
          Blog
        </span>

        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 3.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#f5f5f7",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}
        >
          Coming Soon
        </h1>

        <p
          style={{
            fontSize: "1.0625rem",
            color: "#a0a0b0",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          We&apos;re working on guides, tips, and insights to help local
          businesses master review management and grow their reputation.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #7c6aff 0%, #00d4aa 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.9375rem",
            padding: "0.75rem 1.75rem",
            borderRadius: "9999px",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/app/blog/posts/index";
import ReadingProgress from "./ReadingProgress";

const SITE_URL = "https://www.replybasehq.com";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.date,
      authors: ["ReplyBase Team"],
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "ReplyBase Team",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "ReplyBase",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}/og-image.png`,
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgress />

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
            <Link href="/blog" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
              ← All articles
            </Link>
            <Link href="/help" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>Help</Link>
          </div>
        </nav>

        {/* Article */}
        <article style={{ maxWidth: 720, margin: "0 auto", padding: "3.5rem 1.5rem 5rem" }}>
          {/* Category badge */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(0,229,204,0.1)",
                border: "1px solid rgba(0,229,204,0.25)",
                borderRadius: 100,
                padding: "0.3rem 0.875rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "#00E5CC",
              }}
            >
              Blog
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              color: "#f5f5f7",
              marginBottom: "1.5rem",
            }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.4)",
              paddingBottom: "2rem",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              marginBottom: "2.5rem",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              ReplyBase Team
            </span>
            <span>{formatDate(post.date)}</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readTime}
            </span>
          </div>

          {/* Content */}
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div
            style={{
              marginTop: "3.5rem",
              padding: "2rem",
              background: "#0D0D0D",
              border: "1px solid rgba(0,229,204,0.2)",
              borderRadius: 16,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#F0F0F0",
                marginBottom: "0.625rem",
              }}
            >
              Stop managing reviews manually
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#6B7280",
                marginBottom: "1.25rem",
                lineHeight: 1.6,
              }}
            >
              ReplyBase generates professional AI replies to every Google review.
              Approve with one click or enable auto-send.
            </p>
            <Link href="/signup" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "#00E5CC", color: "#000",
              fontWeight: 700, fontSize: "0.9375rem",
              padding: "0.75rem 1.75rem", borderRadius: 9999,
              textDecoration: "none",
            }}>
              Get Started
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MINT = "#00E5CC";
const BG = "#050505";
const SURFACE = "rgba(255,255,255,0.03)";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#F0F0F0";
const MUTED = "#888";

export const metadata: Metadata = {
  title: "ReplyBase vs Competitors: Comparison Pages | ReplyBase",
  description:
    "See how ReplyBase compares to Birdeye, Podium, Grade.us, ReviewTrackers, Reputation.com, Yext, Broadly, and Vendasta for local business Google review management.",
  keywords: [
    "replybase vs birdeye",
    "replybase vs podium",
    "google review management comparison",
    "birdeye alternative",
    "podium alternative",
    "review management software comparison",
  ],
  alternates: { canonical: "https://www.replybasehq.com/compare" },
};

const COMPARISONS = [
  {
    slug: "birdeye",
    name: "Birdeye",
    tag: "Enterprise",
    tagColor: "rgba(248,113,113,0.2)",
    tagText: "rgba(248,113,113,0.9)",
    theirPrice: "$299+/mo",
    pitch: "Birdeye is built for enterprise chains. ReplyBase is built for local businesses — at a third of the price.",
  },
  {
    slug: "podium",
    name: "Podium",
    tag: "Messaging-first",
    tagColor: "rgba(251,191,36,0.15)",
    tagText: "rgba(251,191,36,0.9)",
    theirPrice: "$249–399/mo",
    pitch: "Podium leads with SMS and payments. ReplyBase leads with AI Google review replies — the thing you actually need.",
  },
  {
    slug: "grade-us",
    name: "Grade.us",
    tag: "Review generation",
    tagColor: "rgba(124,106,255,0.2)",
    tagText: "rgba(180,166,255,0.9)",
    theirPrice: "$110+/mo",
    pitch: "Grade.us helps you get reviews. ReplyBase helps you respond to them — automatically, with AI.",
  },
  {
    slug: "reviewtrackers",
    name: "ReviewTrackers",
    tag: "Analytics-first",
    tagColor: "rgba(59,130,246,0.2)",
    tagText: "rgba(147,197,253,0.9)",
    theirPrice: "$119+/mo",
    pitch: "ReviewTrackers tracks your reviews. ReplyBase responds to them — automatically, at scale.",
  },
  {
    slug: "reputation-com",
    name: "Reputation.com",
    tag: "Enterprise",
    tagColor: "rgba(248,113,113,0.2)",
    tagText: "rgba(248,113,113,0.9)",
    theirPrice: "$500+/mo",
    pitch: "Reputation.com is built for large chains with enterprise budgets. ReplyBase is built for local businesses at $99/mo.",
  },
  {
    slug: "yext",
    name: "Yext",
    tag: "Listings-first",
    tagColor: "rgba(52,211,153,0.15)",
    tagText: "rgba(110,231,183,0.9)",
    theirPrice: "$499+/mo",
    pitch: "Yext manages your listings across directories. ReplyBase manages your Google review replies — for 5× less.",
  },
  {
    slug: "broadly",
    name: "Broadly",
    tag: "Multi-channel",
    tagColor: "rgba(251,191,36,0.15)",
    tagText: "rgba(251,191,36,0.9)",
    theirPrice: "$149–299/mo",
    pitch: "Broadly bundles web chat, SMS, and reviews. ReplyBase focuses on AI Google review replies — and does it better.",
  },
  {
    slug: "vendasta",
    name: "Vendasta",
    tag: "Agency platform",
    tagColor: "rgba(124,106,255,0.2)",
    tagText: "rgba(180,166,255,0.9)",
    theirPrice: "Agency pricing",
    pitch: "Vendasta is a white-label platform for agencies. ReplyBase sells directly to local businesses — no markup, no middleman.",
  },
];

export default function ComparePage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "7rem 1.5rem 4rem", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: `${MINT}15`,
            border: `1px solid ${MINT}33`,
            borderRadius: 9999,
            padding: "0.3rem 0.875rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: MINT,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          Comparisons
        </div>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}
        >
          ReplyBase vs{" "}
          <span style={{ color: MINT }}>the Competition</span>
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            color: MUTED,
            lineHeight: 1.65,
            maxWidth: 580,
            margin: "0 auto 1rem",
          }}
        >
          Honest comparisons between ReplyBase and the most common alternatives local businesses consider — on price, features, and fit.
        </p>
      </section>

      {/* Summary strip */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem 3rem" }}>
        <div
          style={{
            background: `${MINT}08`,
            border: `1px solid ${MINT}22`,
            borderRadius: 14,
            padding: "1.25rem 1.75rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "1.25rem" }}>💡</span>
          <p style={{ color: TEXT, fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
            <strong>The short answer:</strong> ReplyBase is $99/month, takes 2 minutes to set up, and is built specifically for Google Business Profile review replies. Most alternatives cost 2–5× more and weren't built for this specific use case.
          </p>
        </div>
      </section>

      {/* Comparison cards */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          {COMPARISONS.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: "1.625rem",
                  height: "100%",
                  transition: "border-color 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor = `${MINT}44`)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor = BORDER)
                }
              >
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      color: TEXT,
                    }}
                  >
                    vs {comp.name}
                  </div>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      background: comp.tagColor,
                      color: comp.tagText,
                      borderRadius: 9999,
                      padding: "0.2rem 0.625rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {comp.tag}
                  </span>
                </div>

                {/* Price comparison */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      color: MINT,
                      background: `${MINT}12`,
                      borderRadius: 9999,
                      padding: "0.2rem 0.625rem",
                    }}
                  >
                    ReplyBase $99/mo
                  </span>
                  <span style={{ color: MUTED, fontSize: "0.75rem" }}>vs</span>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: MUTED,
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 9999,
                      padding: "0.2rem 0.625rem",
                    }}
                  >
                    {comp.name} {comp.theirPrice}
                  </span>
                </div>

                {/* Pitch */}
                <p
                  style={{
                    color: MUTED,
                    fontSize: "0.8125rem",
                    lineHeight: 1.65,
                    margin: "0 0 1rem 0",
                  }}
                >
                  {comp.pitch}
                </p>

                {/* CTA link */}
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: MINT,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  See full comparison →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 1.5rem 7rem", textAlign: "center" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${MINT}10 0%, rgba(124,106,255,0.08) 100%)`,
            border: `1px solid ${MINT}22`,
            borderRadius: 24,
            padding: "3rem 2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.375rem, 3vw, 1.875rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "0.875rem",
            }}
          >
            Ready to stop overpaying for review management?
          </h2>
          <p
            style={{
              color: MUTED,
              fontSize: "1rem",
              lineHeight: 1.6,
              maxWidth: 440,
              margin: "0 auto 2rem",
            }}
          >
            ReplyBase costs $99/month, sets up in 2 minutes, and automatically replies to every Google review your business receives.
          </p>
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              background: MINT,
              color: "#000",
              fontWeight: 700,
              fontSize: "0.9375rem",
              padding: "0.875rem 2.5rem",
              borderRadius: 9999,
              textDecoration: "none",
            }}
          >
            Try ReplyBase Free
          </Link>
          <p style={{ color: MUTED, fontSize: "0.8125rem", marginTop: "1rem" }}>
            14-day free trial · No credit card · Cancel anytime
          </p>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .compare-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

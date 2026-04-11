import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INDUSTRIES, CITIES, INDUSTRY_SLUGS, CITY_SLUGS } from "@/lib/pseo-data";

const MINT = "#00E5CC";
const BG = "#050505";
const SURFACE = "rgba(255,255,255,0.03)";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#F0F0F0";
const MUTED = "#888";

export async function generateStaticParams() {
  return INDUSTRY_SLUGS.map((industry) => ({ industry }));
}

export async function generateMetadata({
  params,
}: {
  params: { industry: string };
}): Promise<Metadata> {
  const data = INDUSTRIES[params.industry];
  if (!data) return { title: "Not Found" };

  const title = `Google Review Management for ${data.name} | ReplyBase`;
  const description = `ReplyBase helps ${data.namePlural} respond to every Google review automatically. ${data.tagline}. Start free today.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.replybasehq.com/industries/${data.slug}`,
      siteName: "ReplyBase",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.replybasehq.com/industries/${data.slug}`,
    },
  };
}

export default function IndustryPage({
  params,
}: {
  params: { industry: string };
}) {
  const data = INDUSTRIES[params.industry];
  if (!data) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ReplyBase",
    applicationCategory: "BusinessApplication",
    description: `AI-powered Google review management for ${data.name}. ${data.tagline}.`,
    url: `https://www.replybasehq.com/industries/${data.slug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free trial available",
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: data.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  };

  const topCities = CITY_SLUGS.slice(0, 12);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: BG, minHeight: "100vh", color: TEXT }}>
        <Navbar />

        {/* Hero */}
        <section
          style={{
            padding: "7rem 1.5rem 4rem",
            maxWidth: 860,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
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
            <span>{data.emoji}</span>
            <span>Built for {data.name}</span>
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              color: TEXT,
            }}
          >
            AI-Powered Google Review Replies
            <br />
            <span style={{ color: MINT }}>for {data.name}</span>
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              color: MUTED,
              lineHeight: 1.65,
              maxWidth: 620,
              margin: "0 auto 2.25rem",
            }}
          >
            {data.tagline}. ReplyBase reads every new Google review and sends a
            thoughtful, on-brand reply — automatically.
          </p>

          <Link
            href="/signup"
            style={{
              display: "inline-block",
              background: MINT,
              color: "#000",
              fontWeight: 700,
              fontSize: "0.9375rem",
              padding: "0.875rem 2.25rem",
              borderRadius: 9999,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Start Free — No Credit Card
          </Link>
        </section>

        {/* Stats bar */}
        <section
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 1.5rem 4rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: BORDER,
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: SURFACE,
                  padding: "1.5rem 1.25rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 800,
                    color: MINT,
                    letterSpacing: "-0.03em",
                    marginBottom: "0.375rem",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: MUTED,
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why reviews matter */}
        <section
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 1.5rem 4rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.5rem",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: MINT,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Why it matters
              </p>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                The Google Review Reality for {data.name}
              </h2>
              <p
                style={{
                  color: MUTED,
                  lineHeight: 1.7,
                  fontSize: "0.9375rem",
                  marginBottom: "1.25rem",
                }}
              >
                {data.whyMatter}
              </p>
              <p
                style={{
                  color: MUTED,
                  lineHeight: 1.7,
                  fontSize: "0.9375rem",
                }}
              >
                {data.painPoint}
              </p>
            </div>

            <div
              style={{
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: 18,
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: MINT,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                How ReplyBase helps {data.name}
              </p>
              {data.benefits.map((benefit) => (
                <div
                  key={benefit}
                  style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: `${MINT}20`,
                      border: `1px solid ${MINT}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.625rem",
                      color: MINT,
                      marginTop: 2,
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ color: TEXT, fontSize: "0.9375rem", lineHeight: 1.5 }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 1.5rem 4rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: MINT,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Features
            </p>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Everything {data.namePlural} Need
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.25rem",
            }}
          >
            {[
              {
                icon: "🤖",
                title: "AI That Sounds Like You",
                body: "ReplyBase reads each review and generates a unique reply in your chosen tone — professional, friendly, or concise. No templates. No boilerplate.",
              },
              {
                icon: "⚡",
                title: "Auto-Send or Approve",
                body: "Enable auto-send mode and every new review gets a reply within minutes. Or review each draft first — you're always in control.",
              },
              {
                icon: "📊",
                title: "Reply Analytics",
                body: "Track your reply rate, average response time, and review trends. See which locations need attention and prove ROI from your review strategy.",
              },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: "1.5rem",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.6 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 1.5rem 4rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Common Questions from {data.namePlural}
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {data.faq.map((item) => (
              <div
                key={item.q}
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 14,
                  padding: "1.5rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: "0.625rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.q}
                </h3>
                <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.65 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* City links */}
        <section
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 1.5rem 4rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8125rem",
              color: MUTED,
              marginBottom: "1rem",
            }}
          >
            Serving {data.namePlural} across the US:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
            {topCities.map((citySlug) => {
              const cityData = CITIES[citySlug];
              if (!cityData) return null;
              return (
                <Link
                  key={citySlug}
                  href={`/industries/${data.slug}/${citySlug}`}
                  style={{
                    fontSize: "0.8125rem",
                    color: MUTED,
                    textDecoration: "none",
                    background: SURFACE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 9999,
                    padding: "0.3rem 0.75rem",
                  }}
                >
                  {data.name} in {cityData.name}
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "0 1.5rem 7rem",
            textAlign: "center",
          }}
        >
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
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "0.875rem",
              }}
            >
              Start Replying to Reviews in Minutes
            </h2>
            <p
              style={{
                color: MUTED,
                fontSize: "1rem",
                lineHeight: 1.6,
                marginBottom: "2rem",
                maxWidth: 460,
                margin: "0 auto 2rem",
              }}
            >
              Join {data.namePlural} who use ReplyBase to respond to every review, rank higher on
              Google, and turn feedback into growth.
            </p>
            <Link
              href="/signup"
              style={{
                display: "inline-block",
                background: MINT,
                color: "#000",
                fontWeight: 700,
                fontSize: "0.9375rem",
                padding: "0.875rem 2.25rem",
                borderRadius: 9999,
                textDecoration: "none",
              }}
            >
              Get Started Free
            </Link>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .industry-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .industry-why { grid-template-columns: 1fr !important; }
          .industry-features { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

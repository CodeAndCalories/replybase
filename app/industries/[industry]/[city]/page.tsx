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
  return INDUSTRY_SLUGS.flatMap((industry) =>
    CITY_SLUGS.map((city) => ({ industry, city }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { industry: string; city: string };
}): Promise<Metadata> {
  const industry = INDUSTRIES[params.industry];
  const city = CITIES[params.city];
  if (!industry || !city) return { title: "Not Found" };

  const title = `Google Review Management for ${industry.name} in ${city.name} | ReplyBase`;
  const description = `ReplyBase helps ${industry.name.toLowerCase()} in ${city.name}, ${city.stateAbbr} respond to every Google review automatically. ${industry.tagline}. Start free today.`;
  const keywords = [
    `google review management ${industry.name.toLowerCase()} ${city.name}`,
    `review replies ${industry.name.toLowerCase()} ${city.name}`,
    `ai review responses ${city.name} ${industry.name.toLowerCase()}`,
    `${industry.name.toLowerCase()} google reviews ${city.name} ${city.stateAbbr}`,
    `automate review replies ${industry.name.toLowerCase()} ${city.name}`,
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://www.replybasehq.com/industries/${industry.slug}/${city.slug}`,
      siteName: "ReplyBase",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.replybasehq.com/industries/${industry.slug}/${city.slug}`,
    },
  };
}

export default function IndustryCityPage({
  params,
}: {
  params: { industry: string; city: string };
}) {
  const industry = INDUSTRIES[params.industry];
  const city = CITIES[params.city];
  if (!industry || !city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ReplyBase",
    applicationCategory: "BusinessApplication",
    description: `AI-powered Google review management for ${industry.name} in ${city.name}, ${city.stateAbbr}.`,
    url: `https://www.replybasehq.com/industries/${industry.slug}/${city.slug}`,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: city.state,
      },
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free trial available",
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: industry.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  };

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
            <span>{industry.emoji}</span>
            <span>
              {industry.name} · {city.name}, {city.stateAbbr}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.875rem, 4.5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              color: TEXT,
            }}
          >
            Google Review Management
            <br />
            <span style={{ color: MINT }}>
              for {industry.name} in {city.name}
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.0625rem",
              color: MUTED,
              lineHeight: 1.65,
              maxWidth: 620,
              margin: "0 auto 2.25rem",
            }}
          >
            {industry.tagline}. {city.competitionNote} ReplyBase automates your Google review
            replies so every customer feels heard — without pulling you from the work that matters.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
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
          </div>
        </section>

        {/* Stats */}
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
            {industry.stats.map((stat) => (
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
                <div style={{ fontSize: "0.8125rem", color: MUTED, lineHeight: 1.4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Combined copy */}
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
              alignItems: "start",
            }}
          >
            {/* Industry context */}
            <div
              style={{
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: 18,
                padding: "1.75rem",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{industry.emoji}</div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: MINT,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.625rem",
                }}
              >
                {industry.name} in {city.name}
              </p>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  marginBottom: "0.875rem",
                  lineHeight: 1.3,
                }}
              >
                The Review Problem Facing {industry.name} in {city.name}
              </h2>
              <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7 }}>
                {industry.whyMatter}
              </p>
            </div>

            {/* City context */}
            <div
              style={{
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: 18,
                padding: "1.75rem",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>📍</div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: MINT,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.625rem",
                }}
              >
                The {city.name} Market
              </p>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  marginBottom: "0.875rem",
                  lineHeight: 1.3,
                }}
              >
                Why Reputation Matters More in {city.name}
              </h2>
              <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7 }}>
                {city.localCopy} {city.competitionNote}
              </p>
            </div>
          </div>
        </section>

        {/* Pain point + Benefits */}
        <section
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 1.5rem 4rem",
          }}
        >
          <div
            style={{
              background: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: "2.25rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.5rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "rgba(248,113,113,0.8)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                The challenge
              </p>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  marginBottom: "0.875rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Why Most {industry.name} in {city.name} Don't Reply
              </h3>
              <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7 }}>
                {industry.painPoint}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: MINT,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                The solution
              </p>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  marginBottom: "0.875rem",
                  letterSpacing: "-0.01em",
                }}
              >
                ReplyBase for {industry.name} in {city.name}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {industry.benefits.map((benefit) => (
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
                    <span style={{ color: TEXT, fontSize: "0.875rem", lineHeight: 1.5 }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Questions from {industry.name} in {city.name}
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {industry.faq.map((item) => (
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
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    marginBottom: "0.625rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.q}
                </h3>
                <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.65 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Breadcrumb nav */}
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
              gap: "1rem",
            }}
          >
            <div>
              <p style={{ fontSize: "0.75rem", color: MUTED, marginBottom: "0.75rem" }}>
                More cities for {industry.name}:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {CITY_SLUGS.slice(0, 8).map((cs) => {
                  if (cs === city.slug) return null;
                  const c = CITIES[cs];
                  if (!c) return null;
                  return (
                    <Link
                      key={cs}
                      href={`/industries/${industry.slug}/${cs}`}
                      style={{
                        fontSize: "0.75rem",
                        color: MUTED,
                        textDecoration: "none",
                        background: SURFACE,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 9999,
                        padding: "0.25rem 0.625rem",
                      }}
                    >
                      {c.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <p style={{ fontSize: "0.75rem", color: MUTED, marginBottom: "0.75rem" }}>
                More industries in {city.name}:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {INDUSTRY_SLUGS.map((is) => {
                  if (is === industry.slug) return null;
                  const ind = INDUSTRIES[is];
                  if (!ind) return null;
                  return (
                    <Link
                      key={is}
                      href={`/industries/${is}/${city.slug}`}
                      style={{
                        fontSize: "0.75rem",
                        color: MUTED,
                        textDecoration: "none",
                        background: SURFACE,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 9999,
                        padding: "0.25rem 0.625rem",
                      }}
                    >
                      {ind.emoji} {ind.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href={`/industries/${industry.slug}`}
              style={{ fontSize: "0.8125rem", color: MINT, textDecoration: "none" }}
            >
              ← All cities for {industry.name}
            </Link>
            <Link
              href={`/locations/${city.slug}`}
              style={{ fontSize: "0.8125rem", color: MINT, textDecoration: "none" }}
            >
              ← All industries in {city.name}
            </Link>
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
                fontSize: "clamp(1.375rem, 3vw, 1.875rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "0.875rem",
              }}
            >
              The Easiest Way to Manage Google Reviews
              <br />
              for {industry.name} in {city.name}
            </h2>
            <p
              style={{
                color: MUTED,
                fontSize: "1rem",
                lineHeight: 1.6,
                maxWidth: 460,
                margin: "0 auto 2rem",
              }}
            >
              Join {industry.namePlural} across {city.name} who use ReplyBase to respond to every
              review, rank higher on Google Maps, and turn customer feedback into growth.
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
          .combo-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .combo-cards { grid-template-columns: 1fr !important; }
          .combo-pain { grid-template-columns: 1fr !important; }
          .combo-links { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CITIES, INDUSTRIES, CITY_SLUGS, INDUSTRY_SLUGS } from "@/lib/pseo-data";

const MINT = "#00E5CC";
const BG = "#050505";
const SURFACE = "rgba(255,255,255,0.03)";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#F0F0F0";
const MUTED = "#888";

export async function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> {
  const data = CITIES[params.city];
  if (!data) return { title: "Not Found" };

  const title = `Google Review Management in ${data.name}, ${data.stateAbbr} | ReplyBase`;
  const description = `ReplyBase helps ${data.name} businesses respond to every Google review automatically. ${data.localCopy} Start free today.`;
  const keywords = [
    `google review management ${data.name}`,
    `review replies ${data.name} ${data.stateAbbr}`,
    `ai review responses ${data.name}`,
    `google reviews ${data.name} businesses`,
    `automate review replies ${data.name}`,
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://www.replybasehq.com/locations/${data.slug}`,
      siteName: "ReplyBase",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.replybasehq.com/locations/${data.slug}`,
    },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const data = CITIES[params.city];
  if (!data) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ReplyBase",
    description: `AI-powered Google review management for businesses in ${data.name}, ${data.stateAbbr}.`,
    url: `https://www.replybasehq.com/locations/${data.slug}`,
    areaServed: {
      "@type": "City",
      name: data.name,
      containedInPlace: {
        "@type": "State",
        name: data.state,
      },
    },
    serviceType: "Google Review Management Software",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free trial available",
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
            📍 {data.name}, {data.stateAbbr}
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
            AI Google Review Replies
            <br />
            <span style={{ color: MINT }}>for {data.name} Businesses</span>
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
            {data.localCopy} ReplyBase automates your Google review responses so every customer
            feels heard — without taking you away from running your business.
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
            {[
              { value: "87%", label: "of consumers read Google reviews" },
              { value: "73%", label: "trust businesses that respond to reviews" },
              { value: "1.4×", label: "more likely to visit after seeing replies" },
              { value: "4.0★", label: "minimum rating most consumers require" },
            ].map((stat) => (
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

        {/* Local competition section */}
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
                Local competition
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
                Why {data.name} Businesses Can't Afford to Ignore Reviews
              </h2>
              <p
                style={{
                  color: MUTED,
                  lineHeight: 1.7,
                  fontSize: "0.9375rem",
                  marginBottom: "1.25rem",
                }}
              >
                {data.competitionNote}
              </p>
              <p
                style={{
                  color: MUTED,
                  lineHeight: 1.7,
                  fontSize: "0.9375rem",
                }}
              >
                Businesses in {data.name} that respond to every review rank higher in "near me"
                searches, convert more profile visitors into customers, and retain those customers
                at higher rates. ReplyBase makes it happen automatically.
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
                What {data.name} business owners get
              </p>
              {[
                "Auto-generated replies that sound human, not robotic",
                "Replies sent in minutes — while you focus on the business",
                "Higher Google Maps ranking from consistent engagement",
                "Recover unhappy customers before they leave for a competitor",
              ].map((benefit) => (
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

        {/* Industry links for this city */}
        <section
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 1.5rem 4rem",
          }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: MINT,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Industry-specific solutions in {data.name}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.625rem" }}>
            {INDUSTRY_SLUGS.map((industrySlug) => {
              const ind = INDUSTRIES[industrySlug];
              if (!ind) return null;
              return (
                <Link
                  key={industrySlug}
                  href={`/industries/${industrySlug}/${data.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.375rem",
                    background: SURFACE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 12,
                    padding: "1rem 0.75rem",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: "1.25rem" }}>{ind.emoji}</span>
                  <span style={{ color: MUTED, fontSize: "0.75rem", lineHeight: 1.3 }}>
                    {ind.name}
                  </span>
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
              The Easiest Way to Manage Google Reviews
              <br />
              in {data.name}
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
              Join {data.name} business owners who use ReplyBase to respond to every review,
              rank higher on Google Maps, and turn customer feedback into growth.
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
          .city-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .city-why { grid-template-columns: 1fr !important; }
          .city-industries { grid-template-columns: repeat(5, 1fr) !important; }
        }
      `}</style>
    </>
  );
}

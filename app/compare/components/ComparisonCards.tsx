"use client";

const MINT = "#00E5CC";
const SURFACE = "rgba(255,255,255,0.03)";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#F0F0F0";
const MUTED = "#888";

interface Comparison {
  slug: string;
  name: string;
  tag: string;
  tagColor: string;
  tagText: string;
  theirPrice: string;
  pitch: string;
}

import Link from "next/link";

export default function ComparisonCards({ comparisons }: { comparisons: Comparison[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1rem",
      }}
    >
      {comparisons.map((comp) => (
        <Link key={comp.slug} href={`/compare/${comp.slug}`} style={{ textDecoration: "none" }}>
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
  );
}

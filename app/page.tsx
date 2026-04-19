"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── Design tokens ─────────────────────────────────────────────────────────
const MINT      = "#00E5CC";
const BG        = "#050505";
const SURFACE   = "#0D0D0D";
const BORDER    = "rgba(255,255,255,0.07)";
const TEXT      = "#F0F0F0";
const MUTED     = "#6B7280";

// ── Smooth scroll helper ──────────────────────────────────────────────────
function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── JSON-LD ───────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "ReplyBase",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://replybasehq.com",
      description:
        "AI-powered review reply management for local businesses. Automate Google review responses and approve replies with one click.",
      offers: {
        "@type": "Offer",
        price: "175",
        priceCurrency: "USD",
        priceValidUntil: "2026-12-31",
        description: "Onboarding support included",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "124",
      },
    },
    {
      "@type": "Organization",
      name: "ReplyBase",
      url: "https://replybasehq.com",
      description: "ReplyBase helps local businesses manage and automate their Google review replies using AI.",
    },
  ],
};

// ── Inline Navbar ─────────────────────────────────────────────────────────
function PageNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Features",     href: "#features"      },
    { label: "Pricing",      href: "#pricing"        },
    { label: "Blog",         href: "/blog"           },
    { label: "Help",         href: "/help"           },
  ];

  return (
    <nav style={{
      position:          "fixed",
      top: 0, left: 0, right: 0,
      zIndex:            100,
      height:            64,
      display:           "flex",
      alignItems:        "center",
      justifyContent:    "space-between",
      padding:           "0 2rem",
      background:        "rgba(5,5,5,0.88)",
      backdropFilter:    "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom:      "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 0 }}>
        <span style={{ fontWeight: 700, fontSize: "1.125rem", color: TEXT,  letterSpacing: "-0.02em" }}>Reply</span>
        <span style={{ fontWeight: 700, fontSize: "1.125rem", color: MINT, letterSpacing: "-0.02em" }}>Base</span>
      </Link>

      {/* Desktop nav links */}
      <div className="lp-hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {navLinks.map((link) =>
          link.href.startsWith("#") ? (
            <a key={link.label} href={link.href}
              onClick={(e) => smoothScroll(e, link.href)}
              style={{ fontSize: "0.9rem", fontWeight: 500, color: MUTED, textDecoration: "none", transition: "color 0.2s ease", cursor: "pointer" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = TEXT)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = MUTED)}
            >{link.label}</a>
          ) : (
            <Link key={link.label} href={link.href}
              style={{ fontSize: "0.9rem", fontWeight: 500, color: MUTED, textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = TEXT)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = MUTED)}
            >{link.label}</Link>
          )
        )}
      </div>

      {/* Desktop CTAs */}
      <div className="lp-hide-mobile" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Link href="/login" style={{ fontSize: "0.9rem", fontWeight: 500, color: TEXT, textDecoration: "none", padding: "0.5rem 1rem" }}>
          Log in
        </Link>
        <Link href="/signup" style={{
          fontSize: "0.875rem", fontWeight: 600, color: "#000",
          background: MINT, textDecoration: "none",
          padding: "0.5rem 1.25rem", borderRadius: 9999,
          display: "inline-flex", alignItems: "center",
          transition: "filter 0.2s ease",
        }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(108%)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "none")}
        >
          Get Started
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button className="lp-show-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)}
        style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: TEXT, padding: "0.25rem" }}
        aria-label="Toggle menu">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          {mobileOpen
            ? <path d="M4 4l14 14M4 18L18 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            : <path d="M3 7h16M3 11h16M3 15h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          }
        </svg>
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(5,5,5,0.98)", backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${BORDER}`,
          padding: "1.25rem 1.5rem 1.5rem",
          display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a key={link.label} href={link.href}
                onClick={(e) => { smoothScroll(e, link.href); setMobileOpen(false); }}
                style={{ fontSize: "1rem", fontWeight: 500, color: TEXT, textDecoration: "none" }}
              >{link.label}</a>
            ) : (
              <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                style={{ fontSize: "1rem", fontWeight: 500, color: TEXT, textDecoration: "none" }}
              >{link.label}</Link>
            )
          )}
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link href="/login" onClick={() => setMobileOpen(false)}
              style={{ fontSize: "1rem", color: MUTED, textDecoration: "none" }}>Log in</Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)} style={{
              fontSize: "1rem", fontWeight: 600, color: "#000", background: MINT,
              padding: "0.75rem 1.5rem", borderRadius: 9999,
              textAlign: "center", textDecoration: "none", display: "block",
            }}>Get Started</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .lp-hide-mobile { display: none !important; }
          .lp-show-mobile-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

// ── Hero dashboard mockup ─────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div style={{ position: "relative" }}>
      {/* Live indicator */}
      <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2, display: "flex", alignItems: "center", gap: "0.375rem" }}>
        <div className="pulse-green" style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
        <span style={{ fontSize: "0.75rem", color: "#4ade80", fontWeight: 600 }}>Live</span>
      </div>

      {/* Container */}
      <div style={{
        background: SURFACE, border: `1px solid ${BORDER}`,
        borderRadius: 18, padding: 32,
        boxShadow: "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
      }}>
        {/* Window chrome */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: 16 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ flex: 1, textAlign: "center", fontSize: "0.6875rem", color: "#444", marginRight: 28 }}>
            ReplyBase Dashboard
          </span>
        </div>

        {/* Review card */}
        <div style={{
          background: "#111", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12, padding: 20,
        }}>
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Google G */}
              <div style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #4285F4 0%, #34A853 45%, #FBBC05 70%, #EA4335 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.625rem", fontWeight: 800, color: "#fff",
              }}>G</div>
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: TEXT }}>New Review</span>
            </div>
            <span style={{
              fontSize: "0.625rem", fontWeight: 600, color: MINT,
              background: `${MINT}18`, padding: "0.2rem 0.625rem", borderRadius: 9999,
            }}>NEW</span>
          </div>

          {/* Reviewer + stars */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: 6 }}>
            <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: TEXT }}>Sarah Chen</span>
            <span style={{ fontSize: "0.875rem", color: "#FBBF24" }}>★★★★★</span>
          </div>

          {/* Review text */}
          <p style={{ fontSize: "0.875rem", color: MUTED, lineHeight: 1.55, marginBottom: 12 }}>
            &ldquo;Absolutely fantastic service! Will definitely recommend to everyone.&rdquo;
          </p>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", margin: "0 0 12px" }} />

          {/* AI draft label */}
          <p style={{ fontSize: "0.75rem", fontWeight: 600, color: MINT, marginBottom: 6, letterSpacing: "0.04em" }}>
            AI Reply Draft
          </p>
          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.6, marginBottom: 14 }}>
            &ldquo;Thank you so much, Sarah! We&rsquo;re thrilled you had a great experience and truly appreciate you taking the time to share this...&rdquo;
          </p>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button style={{
              background: MINT, color: "#000", fontSize: "0.6875rem",
              fontWeight: 700, borderRadius: 7, padding: "0.375rem 0.875rem",
              border: "none", cursor: "pointer",
            }}>Approve &amp; Send</button>
            <button style={{
              background: "transparent", color: MUTED, fontSize: "0.6875rem",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 7, padding: "0.375rem 0.875rem", cursor: "pointer",
            }}>Edit Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mini reply mockup (for features bento) ────────────────────────────────
function MiniReplyMockup() {
  return (
    <div style={{
      marginTop: 20, background: "#111", borderRadius: 10, padding: 14,
      border: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: 10 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: MINT, flexShrink: 0 }} />
        <span style={{ fontSize: "0.6875rem", color: MINT, fontWeight: 600 }}>Generating reply…</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {[85, 70, 52].map((w, i) => (
          <div key={i} style={{
            height: 5, borderRadius: 3,
            background: i < 2 ? "rgba(255,255,255,0.07)" : `${MINT}28`,
            width: `${w}%`,
          }} />
        ))}
      </div>
      <button style={{
        marginTop: 12, background: MINT, color: "#000",
        fontSize: "0.625rem", fontWeight: 700,
        borderRadius: 6, padding: "0.3rem 0.75rem", border: "none", cursor: "pointer",
      }}>Approve &amp; Send →</button>
    </div>
  );
}

// ── Home page ─────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main style={{ background: BG, minHeight: "100vh", overflowX: "hidden", color: TEXT }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageNavbar />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: "120px", paddingBottom: "80px", paddingLeft: "2rem", paddingRight: "2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="lp-hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "50fr 50fr",
            gap: "4rem",
            alignItems: "center",
            width: "100%",
          }}>
            {/* Left col */}
            <div>
              {/* Badge */}
              <div style={{ marginBottom: "1.75rem" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  border: `1px solid ${MINT}33`, color: MINT,
                  fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em",
                  padding: "0.375rem 1rem", borderRadius: 9999,
                  background: `${MINT}0a`,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: MINT, display: "inline-block" }} />
                  AI-POWERED REVIEW MANAGEMENT
                </span>
              </div>

              {/* Headline */}
              <h1 style={{
                fontSize: "clamp(44px, 5.5vw, 72px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: TEXT,
                maxWidth: 540,
                margin: 0,
              }}>
                Stop ignoring reviews. Start winning customers.
              </h1>

              {/* Subheadline */}
              <p style={{
                fontSize: "1.125rem", color: MUTED,
                maxWidth: 480, lineHeight: 1.7, marginTop: 24,
              }}>
                ReplyBase monitors your Google Business Profile and writes high-quality, on-brand AI replies in seconds. Review before sending — or enable smart auto-send for consistent responses.
              </p>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: "1rem", marginTop: 40, flexWrap: "wrap" }}>
                <Link href="/signup" style={{
                  background: MINT, color: "#000",
                  fontWeight: 700, fontSize: "1rem",
                  padding: "1rem 2rem", borderRadius: 9999,
                  textDecoration: "none", display: "inline-flex", alignItems: "center",
                  transition: "filter 0.2s ease", whiteSpace: "nowrap",
                }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(110%)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "none")}
                >
                  Get Started — $175/mo
                </Link>
                <a href="#how-it-works" onClick={(e) => smoothScroll(e, "#how-it-works")} style={{
                  border: "1px solid rgba(255,255,255,0.16)", color: TEXT,
                  fontWeight: 500, fontSize: "1rem",
                  padding: "1rem 1.5rem", borderRadius: 9999,
                  textDecoration: "none", display: "inline-flex", alignItems: "center",
                  transition: "background 0.2s ease", whiteSpace: "nowrap",
                  background: "transparent",
                }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  See how it works ↓
                </a>
              </div>

              {/* Trust strip */}
              <div style={{ display: "flex", gap: "1rem", marginTop: 28, flexWrap: "nowrap" }}>
                {["✓ Up to 500 reviews/mo", "✓ Setup in 2 minutes", "✓ Cancel anytime", "✓ Never miss a review again"].map((t) => (
                  <span key={t} style={{ fontSize: "0.75rem", color: MUTED, whiteSpace: "nowrap" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Right col — mockup */}
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ───────────────────────────────────────────── */}
      <section style={{
        background: SURFACE,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "4.5rem 2rem",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.875rem", color: MUTED, marginBottom: "2.25rem" }}>
            Built for local businesses across the US
          </p>
          <div className="lp-stats-grid" style={{
            display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap",
          }}>
            {[
              { value: "10,000+",  label: "Reviews Replied" },
              { value: "< 30 sec", label: "Reply Time"      },
              { value: "2 min",    label: "Average Setup"  },
              { value: "4.9★",     label: "Avg Rating"      },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.25rem", fontWeight: 700, color: TEXT, lineHeight: 1.1 }}>{stat.value}</div>
                <div style={{ fontSize: "1rem", color: MUTED, marginTop: "0.4rem" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.14em", color: MINT, marginBottom: "0.875rem" }}>
              HOW IT WORKS
            </p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, color: TEXT, letterSpacing: "-0.02em" }}>
              From review to reply in three steps
            </h2>
          </div>

          {/* 3 cards */}
          <div className="lp-three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {[
              {
                step: "01",
                title: "Connect your Google Business",
                desc:  "Link your Google Business Profile in seconds. ReplyBase instantly starts monitoring all incoming reviews.",
              },
              {
                step: "02",
                title: "AI drafts the perfect reply",
                desc:  "Our AI reads the review, analyzes the sentiment, and crafts a personalized, professional response. No templates.",
              },
              {
                step: "03",
                title: "Approve or auto-send",
                desc:  "Review and approve from your dashboard, or enable auto-send for fully hands-free review management.",
              },
            ].map((item) => (
              <div key={item.step} className="card-lift" style={{
                background: SURFACE, border: `1px solid ${BORDER}`,
                borderRadius: 16, padding: "2rem", overflow: "hidden",
              }}>
                <div style={{
                  fontSize: "4.5rem", fontWeight: 800, color: MINT, opacity: 0.13,
                  lineHeight: 1, marginBottom: "1rem",
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, color: TEXT, marginBottom: "0.625rem", letterSpacing: "-0.01em" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: MUTED, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────── */}
      <section id="features" style={{ padding: "2rem 2rem 6rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.14em", color: MINT, marginBottom: "0.875rem" }}>
              FEATURES
            </p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, color: TEXT, letterSpacing: "-0.02em" }}>
              Everything you need to own your reputation
            </h2>
          </div>

          {/* Bento grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Row 1 */}
            <div className="lp-bento-r1" style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "1rem" }}>
              {/* AI Replies — large */}
              <div className="card-lift" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "1.75rem" }}>
                <div style={{ fontSize: "1.875rem", marginBottom: "0.875rem" }}>🤖</div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: TEXT, marginBottom: "0.5rem" }}>AI-Powered Replies</h3>
                <p style={{ fontSize: "0.9rem", color: MUTED, lineHeight: 1.65, maxWidth: 360 }}>
                  Recover negative reviews before they cost you customers. Every reply sounds human, on-brand, and personal — never robotic.
                </p>
                <MiniReplyMockup />
              </div>

              {/* Instant Notifications */}
              <div className="card-lift" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "1.75rem" }}>
                <div style={{ fontSize: "1.875rem", marginBottom: "0.875rem" }}>📬</div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: TEXT, marginBottom: "0.5rem" }}>Instant Notifications</h3>
                <p style={{ fontSize: "0.9rem", color: MUTED, lineHeight: 1.65 }}>
                  Businesses that respond faster win more customers. Know the moment a review lands — and respond before your competitors do.
                </p>
                {/* Notification pill */}
                <div style={{ marginTop: 20, padding: "0.875rem 1rem", background: "#111", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: MINT, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: TEXT }}>New 5★ review</div>
                    <div style={{ fontSize: "0.6875rem", color: MUTED, marginTop: 2 }}>The Brew Room · just now</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="lp-bento-r2" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              {[
                { icon: "🔄", title: "Auto-Send Mode",    desc: "ReplyBase handles safe, consistent responses while you run your business." },
                { icon: "📍", title: "Multi-Location",    desc: "Manage up to 3 locations from one dashboard. One login, complete visibility." },
                { icon: "📊", title: "Reply Analytics",   desc: "Track response rates, sentiment trends, and rating changes over time." },
              ].map((f) => (
                <div key={f.title} className="card-lift" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "1.625rem" }}>
                  <div style={{ fontSize: "1.625rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                  <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, color: TEXT, marginBottom: "0.375rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: MUTED, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: "6rem 2rem", background: SURFACE }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.14em", color: MINT, marginBottom: "0.875rem" }}>
              PRICING
            </p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
              Simple pricing. No surprises.
            </h2>
            <p style={{ fontSize: "1rem", color: MUTED }}>One plan. Everything included. Cancel anytime.</p>
          </div>

          {/* ROI line */}
          <p style={{ textAlign: "center", fontSize: "0.875rem", color: MUTED, marginBottom: "2rem" }}>
            A single unanswered negative review can cost you customers. At $175/mo, ReplyBase pays for itself with one saved relationship.
          </p>

          {/* Single card */}
          <div style={{ maxWidth: 460, margin: "0 auto" }}>
            <div style={{
              background: BG, border: `1px solid ${MINT}30`,
              borderRadius: 18, padding: "2.5rem",
            }}>
              {/* Badge */}
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center",
                  background: `${MINT}15`, color: MINT,
                  fontSize: "0.75rem", fontWeight: 600,
                  padding: "0.3rem 0.875rem", borderRadius: 9999,
                }}>Everything Included</span>
              </div>

              {/* Price */}
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.25rem" }}>
                  <span style={{ fontSize: "4rem", fontWeight: 800, color: TEXT, lineHeight: 1 }}>$175</span>
                  <span style={{ fontSize: "1.125rem", color: MUTED }}>/mo</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: MUTED, marginTop: "0.5rem" }}>Everything included. Cancel anytime.</p>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "1.5rem 0" }} />

              {/* Feature list */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
                {[
                  "AI reply generation",
                  "Auto-send mode",
                  "Custom reply tone settings",
                  "Multi-location (up to 3)",
                  "Up to 500 reviews/month included",
                  "Email & push notifications",
                  "Reply analytics",
                  "Priority support",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9375rem", color: "rgba(255,255,255,0.82)" }}>
                    <span style={{ color: MINT, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/signup" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                background: MINT, color: "#000",
                fontWeight: 700, fontSize: "1rem",
                padding: "1rem", borderRadius: 9999,
                textDecoration: "none", transition: "filter 0.2s ease",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(110%)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "none")}
              >
                Get Started
              </Link>
              <p style={{ textAlign: "center", fontSize: "0.75rem", color: MUTED, marginTop: "0.875rem" }}>
                First month includes full onboarding support.
              </p>
            </div>

            {/* Comparison */}
            <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#374151", marginTop: "2rem" }}>
              Compare: Virtual assistant $500+/mo · Reputation agency $1,000+/mo
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, color: TEXT, letterSpacing: "-0.02em" }}>
              Businesses love ReplyBase
            </h2>
          </div>

          <div className="lp-three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {[
              {
                initials: "SC", name: "Sarah Chen",        biz: "Coffee Shop Owner, Cleveland OH",
                quote: "We went from replying to maybe 20% of reviews to 100%. Our rating went from 4.2 to 4.7 in 60 days.",
              },
              {
                initials: "MW", name: "Marcus Williams",   biz: "Dental Practice Manager, Austin TX",
                quote: "The replies sound genuinely human. Patients have commented that they appreciate how personal our responses are. Response rate went from 20% to 100%.",
              },
              {
                initials: "JC", name: "Jennifer Clarke",   biz: "Home Services, 6 locations",
                quote: "I manage 6 locations. Before ReplyBase it took me hours a week. Saves me 3+ hours every week.",
              },
            ].map((t) => (
              <div key={t.name} className="card-lift" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: `${MINT}1a`, color: MINT,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.875rem", fontWeight: 700, flexShrink: 0,
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: TEXT }}>{t.name}</div>
                    <div style={{ fontSize: "0.8rem", color: MUTED, marginTop: 2 }}>{t.biz}</div>
                  </div>
                </div>
                <div style={{ fontSize: "0.875rem", color: "#FBBF24", marginBottom: "0.75rem" }}>★★★★★</div>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
      <section style={{
        background: SURFACE,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "6rem 2rem",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.12, color: TEXT }}>
            Your reputation is on the line.
          </h2>
          <p style={{ color: MUTED, marginTop: "1rem", fontSize: "1.0625rem", lineHeight: 1.65 }}>
            Join hundreds of local businesses that never miss a review. Start replying today.
          </p>
          <Link href="/signup" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            marginTop: "2.5rem",
            background: MINT, color: "#000",
            fontWeight: 700, fontSize: "1.125rem",
            padding: "1.125rem 2.5rem", borderRadius: 9999,
            textDecoration: "none", transition: "filter 0.2s ease",
          }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(110%)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "none")}
          >
            Start Replying Today →
          </Link>
          <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: MUTED }}>
            Setup in 2 minutes. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer style={{ background: BG, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="lp-footer-grid" style={{
            display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: "2.5rem", marginBottom: "2.5rem",
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "0.875rem" }}>
                <span style={{ fontWeight: 700, fontSize: "1.0625rem", color: TEXT }}>Reply</span>
                <span style={{ fontWeight: 700, fontSize: "1.0625rem", color: MINT }}>Base</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: MUTED, lineHeight: 1.65, maxWidth: 220, marginBottom: "1rem" }}>
                AI-powered review management for local businesses.
              </p>
              <p style={{ fontSize: "0.8125rem", color: "#374151" }}>© 2026 ReplyBase</p>
            </div>

            {/* Product */}
            <div>
              <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>Product</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Pricing",   href: "#pricing"    },
                  { label: "Blog",      href: "/blog"        },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} style={{ fontSize: "0.875rem", color: MUTED, textDecoration: "none", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = TEXT)}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = MUTED)}
                    >{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>Company</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <li>
                  <Link href="#" style={{ fontSize: "0.875rem", color: MUTED, textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = TEXT)}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = MUTED)}
                  >About</Link>
                </li>
                <li>
                  <a href="mailto:hello@replybasehq.com" style={{ fontSize: "0.875rem", color: MUTED, textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = TEXT)}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = MUTED)}
                  >Contact</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>Legal</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  { label: "Privacy Policy", href: "/privacy"       },
                  { label: "Terms",          href: "/terms"          },
                  { label: "Data Deletion",  href: "/data-deletion"  },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} style={{ fontSize: "0.875rem", color: MUTED, textDecoration: "none", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = TEXT)}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = MUTED)}
                    >{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Responsive overrides ────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .lp-hero-grid   { grid-template-columns: 1fr !important; }
          .lp-three-col   { grid-template-columns: 1fr !important; }
          .lp-bento-r1    { grid-template-columns: 1fr !important; }
          .lp-bento-r2    { grid-template-columns: 1fr !important; }
          .lp-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .lp-footer-grid { grid-template-columns: 1fr !important; }
          .lp-stats-grid  { display: grid !important; grid-template-columns: 1fr 1fr; gap: 1.5rem !important; }
        }
      `}</style>
    </main>
  );
}

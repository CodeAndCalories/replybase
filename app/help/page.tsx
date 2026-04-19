"use client";

import { useState } from "react";
import Link from "next/link";

const MINT = "#00E5CC";
const BG = "#050505";
const SURFACE = "#0D0D0D";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#F0F0F0";
const MUTED = "#6B7280";

function PageNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Help", href: "/help" },
  ];

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2rem",
      background: "rgba(5,5,5,0.88)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 0 }}>
        <span style={{ fontWeight: 700, fontSize: "1.125rem", color: TEXT, letterSpacing: "-0.02em" }}>Reply</span>
        <span style={{ fontWeight: 700, fontSize: "1.125rem", color: MINT, letterSpacing: "-0.02em" }}>Base</span>
      </Link>

      <div className="help-hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            style={{
              fontSize: "0.9rem",
              fontWeight: link.label === "Help" ? 600 : 500,
              color: link.label === "Help" ? MINT : MUTED,
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = TEXT)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = link.label === "Help" ? MINT : MUTED)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="help-hide-mobile" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
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

      <button className="help-show-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)}
        style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: TEXT, padding: "0.25rem" }}
        aria-label="Toggle menu">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          {mobileOpen
            ? <path d="M4 4l14 14M4 18L18 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            : <path d="M3 7h16M3 11h16M3 15h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          }
        </svg>
      </button>

      {mobileOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(5,5,5,0.98)", backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${BORDER}`,
          padding: "1.25rem 1.5rem 1.5rem",
          display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
              style={{ fontSize: "1rem", fontWeight: 500, color: link.label === "Help" ? MINT : TEXT, textDecoration: "none" }}
            >{link.label}</Link>
          ))}
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
          .help-hide-mobile { display: none !important; }
          .help-show-mobile-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const steps = [
  {
    title: "Create your ReplyBase account",
    items: [
      "Go to replybasehq.com/signup",
      "Enter your email and password",
      "Check your inbox for a confirmation email",
      'Click "Confirm my email" in the email',
      "You'll be redirected to complete payment ($175/mo)",
      "After payment you'll land on your dashboard",
    ],
  },
  {
    title: "Connect your Google Business Profile",
    items: [
      'From your dashboard click "Connect Google Business Profile"',
      "Sign in with the Google account that manages your business",
      "Grant ReplyBase permission to read reviews and post replies",
      "You'll be redirected back to your dashboard",
      "Your reviews will sync automatically within 60 seconds",
    ],
    warning: "You must be an Owner or Manager of the Google Business Profile",
    warningType: "important" as const,
  },
  {
    title: "Generate your first AI reply",
    items: [
      "Go to the Reviews tab in your dashboard",
      "You'll see your recent Google reviews listed",
      'Click "Generate Reply" on any review',
      "The AI will draft a professional reply in seconds",
      "Review the draft — edit if needed",
      'Click "Approve & Send" to post the reply to Google',
    ],
  },
  {
    title: "Enable Auto-Reply (optional)",
    items: [
      "Go to Settings in your dashboard",
      'Find "Auto-reply mode" and toggle it ON',
      "Choose your reply tone (Professional, Friendly, etc.)",
      "ReplyBase will now automatically reply to new reviews daily",
      "You'll receive email notifications when new reviews arrive",
    ],
    warning: "Auto-replies post publicly to Google — review your tone settings first",
    warningType: "warning" as const,
  },
  {
    title: "Manage your subscription",
    items: [
      "Go to Settings → Subscription",
      'Click "Manage" to access the Stripe customer portal',
      "From there you can update payment method or cancel anytime",
      "Cancellation takes effect at end of billing period",
    ],
  },
];

const faqs = [
  {
    q: "What Google account do I need?",
    a: "You need to sign in with the Google account that is listed as an Owner or Manager on your Google Business Profile. Editor access is not sufficient.",
  },
  {
    q: "How long does it take for reviews to appear?",
    a: "Reviews sync automatically when you first connect. After that, new reviews are checked daily at 8am UTC. You can also manually sync from the Businesses page.",
  },
  {
    q: "Can I edit AI replies before sending?",
    a: 'Yes — every generated reply has an "Edit Reply" button. You can modify the text before clicking "Approve & Send." Nothing is posted to Google without your approval unless you have auto-reply enabled.',
  },
  {
    q: "What happens with auto-reply enabled?",
    a: "ReplyBase will automatically generate and post replies to all new pending reviews during the daily sync. You'll receive an email notification. You can disable it anytime in Settings.",
  },
  {
    q: "How many reviews can I manage?",
    a: "Your plan includes up to 500 reviews per month. This covers the vast majority of local businesses.",
  },
  {
    q: "Can I manage multiple locations?",
    a: "Yes — your plan supports up to 3 Google Business Profile locations. Go to the Businesses page and connect each one separately.",
  },
  {
    q: "What if a review contains inappropriate content?",
    a: "Our AI is trained to handle difficult reviews professionally. For reviews with inappropriate content it will respond with a neutral, professional message suggesting direct contact.",
  },
  {
    q: "How do I cancel?",
    a: "Go to Settings → Subscription → Manage → Cancel subscription. Your access continues until the end of your billing period. No cancellation fees.",
  },
  {
    q: "Is my Google account data secure?",
    a: "Yes. We only request the minimum permissions needed to read reviews and post replies. We never access your other Google data. Your OAuth token is encrypted in our database.",
  },
  {
    q: "What if I get an error connecting Google?",
    a: "Make sure you are signed into the correct Google account (the one that manages your business). If the error persists email us at hello@replybasehq.com with a screenshot.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid ${BORDER}`,
      borderRadius: 12,
      overflow: "hidden",
      transition: "border-color 0.2s ease",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: open ? "rgba(0,229,204,0.04)" : SURFACE,
          border: "none",
          padding: "1.125rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: TEXT, lineHeight: 1.4 }}>{q}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          style={{
            flexShrink: 0,
            transition: "transform 0.25s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: MINT,
          }}
        >
          <path d="M4 6l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{
          padding: "0 1.5rem 1.25rem",
          background: "rgba(0,229,204,0.04)",
          fontSize: "0.9rem",
          color: "rgba(240,240,240,0.7)",
          lineHeight: 1.7,
        }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT }}>
      <PageNavbar />

      {/* ── SECTION 1: Hero ─────────────────────────────────────────────── */}
      <section style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "5rem 1.5rem 4rem",
        textAlign: "center",
      }}>
        <span style={{
          display: "inline-block",
          background: "rgba(0,229,204,0.1)",
          border: "1px solid rgba(0,229,204,0.2)",
          borderRadius: 9999,
          padding: "0.3rem 1rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: MINT,
          marginBottom: "1.5rem",
        }}>
          Help Center
        </span>
        <h1 style={{
          fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: "1.25rem",
          color: TEXT,
        }}>
          Setup Guide &amp; Help Center
        </h1>
        <p style={{
          fontSize: "1.125rem",
          color: "rgba(240,240,240,0.55)",
          lineHeight: 1.65,
          maxWidth: 560,
          margin: "0 auto 2.5rem",
        }}>
          Everything you need to get ReplyBase working in minutes.
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.875rem", flexWrap: "wrap" }}>
          <button
            onClick={() => scrollTo("quick-start")}
            style={{
              background: MINT,
              color: "#000",
              border: "none",
              borderRadius: 9999,
              padding: "0.6875rem 1.5rem",
              fontSize: "0.9375rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "filter 0.2s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(108%)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "none")}
          >
            Quick Start (5 min)
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo("faq")}
            style={{
              background: "transparent",
              color: TEXT,
              border: `1px solid ${BORDER}`,
              borderRadius: 9999,
              padding: "0.6875rem 1.5rem",
              fontSize: "0.9375rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.color = TEXT;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = BORDER;
            }}
          >
            FAQ
          </button>
        </div>
      </section>

      {/* ── SECTION 2: Quick Start ───────────────────────────────────────── */}
      <section id="quick-start" style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "1rem 1.5rem 5rem",
      }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: MINT, marginBottom: "0.625rem",
          }}>
            Step by step
          </p>
          <h2 style={{
            fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: TEXT,
          }}>
            Quick Start Guide
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              background: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              padding: "1.75rem 1.75rem 1.75rem 1.5rem",
              display: "flex",
              gap: "1.5rem",
            }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "rgba(0,229,204,0.1)",
                  border: "1px solid rgba(0,229,204,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.9375rem",
                  color: MINT,
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {i + 1}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: TEXT,
                  marginBottom: "0.875rem",
                  letterSpacing: "-0.01em",
                }}>
                  {step.title}
                </h3>
                <ul style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  marginBottom: step.warning ? "1rem" : 0,
                }}>
                  {step.items.map((item, j) => (
                    <li key={j} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.625rem",
                      fontSize: "0.9rem",
                      color: "rgba(240,240,240,0.7)",
                      lineHeight: 1.55,
                    }}>
                      <span style={{ color: MINT, marginTop: "0.25rem", flexShrink: 0, fontSize: "0.75rem" }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {step.warning && (
                  <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.625rem",
                    background: step.warningType === "warning"
                      ? "rgba(251,191,36,0.08)"
                      : "rgba(0,229,204,0.07)",
                    border: `1px solid ${step.warningType === "warning" ? "rgba(251,191,36,0.2)" : "rgba(0,229,204,0.2)"}`,
                    borderRadius: 8,
                    padding: "0.75rem 1rem",
                    marginTop: "0.25rem",
                  }}>
                    <span style={{ fontSize: "0.875rem", flexShrink: 0 }}>
                      {step.warningType === "warning" ? "⚠️" : "ℹ️"}
                    </span>
                    <span style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: step.warningType === "warning" ? "#FBBF24" : MINT,
                      lineHeight: 1.5,
                    }}>
                      {step.warningType === "warning" ? "WARNING: " : "IMPORTANT: "}{step.warning}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: FAQ ──────────────────────────────────────────────── */}
      <section id="faq" style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "1rem 1.5rem 5rem",
      }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: MINT, marginBottom: "0.625rem",
          }}>
            FAQ
          </p>
          <h2 style={{
            fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: TEXT,
          }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ── SECTION 4: Contact Support ──────────────────────────────────── */}
      <section style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "1rem 1.5rem 6rem",
      }}>
        <div style={{
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 20,
          padding: "3rem 2rem",
          textAlign: "center",
        }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "rgba(0,229,204,0.1)",
            border: "1px solid rgba(0,229,204,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.375rem",
            margin: "0 auto 1.25rem",
          }}>
            💬
          </div>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            color: TEXT,
            marginBottom: "0.625rem",
          }}>
            Still need help?
          </h2>
          <p style={{
            fontSize: "0.9375rem",
            color: "rgba(240,240,240,0.55)",
            lineHeight: 1.65,
            maxWidth: 420,
            margin: "0 auto 2rem",
          }}>
            Email us at{" "}
            <a href="mailto:hello@replybasehq.com" style={{ color: MINT, textDecoration: "none" }}>
              hello@replybasehq.com
            </a>{" "}
            and we'll respond within 24 hours.
          </p>
          <a
            href="mailto:hello@replybasehq.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: MINT,
              color: "#000",
              fontWeight: 700,
              fontSize: "0.9375rem",
              textDecoration: "none",
              padding: "0.75rem 1.75rem",
              borderRadius: 9999,
              transition: "filter 0.2s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(108%)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "none")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Email Support
          </a>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "3rem 1.5rem",
        background: "rgba(255,255,255,0.01)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="help-footer-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "0.875rem" }}>
                <span style={{ fontWeight: 700, fontSize: "1rem", color: TEXT, letterSpacing: "-0.02em" }}>Reply</span>
                <span style={{ fontWeight: 700, fontSize: "1rem", color: MINT, letterSpacing: "-0.02em" }}>Base</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 220 }}>
                AI-powered review reply management for Google Business. Never miss a review again.
              </p>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                Product
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  { label: "Features", href: "/#features" },
                  { label: "Pricing", href: "/#pricing" },
                  { label: "How it Works", href: "/#how-it-works" },
                  { label: "Help & Setup Guide", href: "/help" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = TEXT)}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")}
                    >{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                Company
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {["Blog"].map((item) => (
                  <li key={item}>
                    <Link href={item === "Blog" ? "/blog" : "#"} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = TEXT)}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")}
                    >{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                Legal
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Data Deletion", href: "/data-deletion" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = TEXT)}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")}
                    >{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} ReplyBase. All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: MINT }} />
              <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>
                Works with Google Business Profile
              </span>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .help-footer-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 480px) {
            .help-footer-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </footer>
    </div>
  );
}

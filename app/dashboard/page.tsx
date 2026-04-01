import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const stats = [
  {
    label: "Total Reviews",
    value: "0",
    change: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    color: "#7c6aff",
    glow: "rgba(124,106,255,0.2)",
  },
  {
    label: "Pending Replies",
    value: "0",
    change: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.2)",
  },
  {
    label: "Response Rate",
    value: "—",
    change: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: "#00d4aa",
    glow: "rgba(0,212,170,0.2)",
  },
  {
    label: "Businesses",
    value: "0",
    change: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.2)",
  },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const firstName = user.email?.split("@")[0] ?? "there";

  return (
    <div style={{ padding: "2.5rem", maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#7c6aff",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          Overview
        </p>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.875rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#f0f0f0",
            marginBottom: "0.375rem",
          }}
        >
          Welcome back, {firstName}
        </h1>
        <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)" }}>
          {user.email} &middot; Here&rsquo;s what&rsquo;s happening with your reviews today.
        </p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "1.375rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "rgba(255,255,255,0.45)" }}>
                {stat.label}
              </p>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: stat.glow,
                  border: `1px solid ${stat.color}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
            </div>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#f0f0f0",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Connect Business CTA */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(124,106,255,0.1) 0%, rgba(0,212,170,0.07) 100%)",
          border: "1px solid rgba(124,106,255,0.2)",
          borderRadius: 20,
          padding: "2.5rem",
          marginBottom: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background orb */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "rgba(124,106,255,0.08)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  background: "rgba(124,106,255,0.12)",
                  border: "1px solid rgba(124,106,255,0.25)",
                  color: "#a78bfa",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "0.25rem 0.75rem",
                  borderRadius: 100,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c6aff", display: "inline-block" }} />
                Get Started
              </div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "#f0f0f0",
                  letterSpacing: "-0.025em",
                  marginBottom: "0.5rem",
                }}
              >
                Connect your first business
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)", maxWidth: 480, lineHeight: 1.6 }}>
                Link your Google Business Profile to start monitoring reviews and generating AI-powered replies automatically.
              </p>
            </div>
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.875rem 1.75rem",
                borderRadius: 10,
                background: "#7c6aff",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9375rem",
                textDecoration: "none",
                boxShadow: "0 0 32px rgba(124,106,255,0.4), 0 4px 16px rgba(0,0,0,0.4)",
                transition: "all 0.2s ease",
                flexShrink: 0,
                alignSelf: "flex-start",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Connect Google Business Profile
            </a>
          </div>

          {/* Feature bullets */}
          <div style={{ display: "flex", gap: "2rem", marginTop: "1.75rem", flexWrap: "wrap" }}>
            {["Auto-monitor new reviews", "AI-generated reply drafts", "One-click approve & send"].map((feat) => (
              <div key={feat} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)" }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#f0f0f0",
              letterSpacing: "-0.015em",
            }}
          >
            Recent Reviews
          </h3>
          <a
            href="/dashboard/reviews"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "#7c6aff",
              textDecoration: "none",
            }}
          >
            View all →
          </a>
        </div>

        {/* Empty state */}
        <div
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(124,106,255,0.1)",
              border: "1px solid rgba(124,106,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(124,106,255,0.6)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "0.375rem" }}>
              No reviews yet
            </p>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.3)" }}>
              Connect a business to start monitoring reviews.
            </p>
          </div>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.5625rem 1.25rem",
              borderRadius: 8,
              border: "1px solid rgba(124,106,255,0.3)",
              color: "#a78bfa",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              background: "rgba(124,106,255,0.08)",
              marginTop: "0.25rem",
            }}
          >
            Connect a business →
          </a>
        </div>
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName = user.user_metadata?.full_name || user.email;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        padding: "2rem 1.5rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "3rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #7c6aff 0%, #00d4aa 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              boxShadow: "0 0 20px rgba(124,106,255,0.3)",
            }}
          >
            ✦
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#f0f0f0",
              letterSpacing: "-0.02em",
            }}
          >
            ReplyBase
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>{user.email}</span>
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              style={{
                fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "0.375rem 0.875rem",
                cursor: "pointer",
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.875rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "0.5rem",
            }}
          >
            Welcome, {displayName} 👋
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)" }}>
            Your review management dashboard is being set up.
          </p>
        </div>

        {/* Stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          {[
            { label: "Total Reviews", value: "—", icon: "★" },
            { label: "Pending Replies", value: "—", icon: "⏳" },
            { label: "Replies Sent", value: "—", icon: "✓" },
            { label: "Avg. Rating", value: "—", icon: "◎" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "1.5rem",
              }}
            >
              <div style={{ fontSize: "1.375rem", marginBottom: "0.75rem" }}>{stat.icon}</div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.625rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.25rem",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Coming soon panel */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "3rem 2.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #7c6aff 0%, #00d4aa 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              margin: "0 auto 1.5rem",
              boxShadow: "0 0 30px rgba(124,106,255,0.3)",
            }}
          >
            ✦
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.375rem",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              marginBottom: "0.75rem",
            }}
          >
            Connect your Google Business Profile
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: 460, margin: "0 auto 2rem" }}>
            Link your Google Business account to start monitoring reviews and generating AI replies automatically.
          </p>
          <button
            className="btn-primary"
            disabled
            style={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            Connect Google Business — Coming Soon
          </button>
        </div>
      </div>
    </main>
  );
}

export default function BusinessesPage() {
  return (
    <div style={{ padding: "2.5rem", maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
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
          Connected
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.875rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#f0f0f0",
            }}
          >
            Businesses
          </h1>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1.25rem",
              borderRadius: 9,
              background: "#7c6aff",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(124,106,255,0.35)",
              transition: "all 0.2s ease",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Business
          </a>
        </div>
      </div>

      {/* How it works strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[
          {
            step: "01",
            title: "Connect",
            desc: "Link your Google Business Profile with one click",
            icon: "🔗",
          },
          {
            step: "02",
            title: "Monitor",
            desc: "We watch for new reviews 24/7 automatically",
            icon: "👁️",
          },
          {
            step: "03",
            title: "Reply",
            desc: "Approve AI drafts and send in seconds",
            icon: "⚡",
          },
        ].map((item) => (
          <div
            key={item.step}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "1.25rem",
              display: "flex",
              gap: "0.875rem",
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: "1.25rem", flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "rgba(124,106,255,0.7)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                Step {item.step}
              </p>
              <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#f0f0f0", marginBottom: "0.25rem" }}>
                {item.title}
              </p>
              <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18,
          padding: "5rem 2rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "rgba(124,106,255,0.08)",
            border: "1px solid rgba(124,106,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(124,106,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: "1.0625rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>
            No businesses connected yet
          </p>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", maxWidth: 380, margin: "0 auto", lineHeight: 1.6 }}>
            Connect your Google Business Profile to start managing reviews with AI-powered replies.
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
            boxShadow: "0 0 32px rgba(124,106,255,0.4)",
            marginTop: "0.25rem",
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
    </div>
  );
}

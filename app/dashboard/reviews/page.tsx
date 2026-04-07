export default function ReviewsPage() {
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
          Inbox
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
            Reviews
          </h1>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["All", "Pending", "Replied"].map((filter) => (
              <button
                key={filter}
                style={{
                  padding: "0.4375rem 1rem",
                  borderRadius: 8,
                  border: filter === "All" ? "1px solid rgba(124,106,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  background: filter === "All" ? "rgba(124,106,255,0.12)" : "transparent",
                  color: filter === "All" ? "#a78bfa" : "rgba(255,255,255,0.4)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
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
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: "1.0625rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>
            No reviews yet
          </p>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", maxWidth: 380, margin: "0 auto", lineHeight: 1.6 }}>
            Connect a Google Business Profile to start seeing reviews here.
          </p>
        </div>
      </div>
    </div>
  );
}

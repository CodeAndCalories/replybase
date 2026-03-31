import Link from "next/link";

export default function DashboardPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "3rem 2.5rem",
          maxWidth: 480,
          width: "100%",
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
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.625rem",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            marginBottom: "0.75rem",
          }}
        >
          Dashboard
        </h1>
        <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: "2rem" }}>
          The full dashboard is coming soon. Connect your Google Business Profile, manage reviews, and approve AI replies — all from one place.
        </p>
        <Link href="/" className="btn-ghost" style={{ display: "inline-flex" }}>
          ← Back to home
        </Link>
      </div>
    </main>
  );
}

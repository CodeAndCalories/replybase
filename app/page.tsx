import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8rem 1.5rem 6rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div className="grid-overlay" />

        {/* Orb 1 — purple */}
        <div
          className="orb"
          style={{
            width: 600,
            height: 600,
            top: "-100px",
            left: "calc(50% - 500px)",
            background: "radial-gradient(circle, rgba(124,106,255,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Orb 2 — teal */}
        <div
          className="orb"
          style={{
            width: 500,
            height: 500,
            top: "100px",
            right: "calc(50% - 500px)",
            background: "radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 70%)",
            animationDelay: "3s",
            animationDuration: "11s",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          {/* Badge */}
          <div style={{ marginBottom: "1.75rem" }}>
            <span className="badge">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="#00d4aa" />
              </svg>
              Works with Google Business Profile
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.6rem, 7vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
            }}
          >
            Never miss a{" "}
            <span className="gradient-text">review reply</span>
            {" "}again.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(1.0625rem, 2.5vw, 1.25rem)",
              color: "var(--text-muted)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
              maxWidth: 580,
              margin: "0 auto 2.5rem",
            }}
          >
            ReplyBase monitors your Google Business reviews and writes professional AI replies in seconds.
            Approve with one click or let it run on autopilot.
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/signup" className="btn-primary" style={{ fontSize: "1.0625rem", padding: "1rem 2.25rem" }}>
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Trust row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.75rem",
              marginTop: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "★★★★★", text: "4.9 avg reply rating" },
              { icon: "✓", text: "No credit card required" },
              { icon: "✓", text: "Setup in 5 minutes" },
            ].map((item) => (
              <div
                key={item.text}
                style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", color: "var(--text-muted)" }}
              >
                <span style={{ color: "#00d4aa", fontWeight: 600 }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual — review card mockup */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "5rem",
            width: "100%",
            maxWidth: 700,
          }}
        >
          <HeroMockup />
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "2rem 1.5rem",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "50,000+", label: "Reviews Replied" },
            { value: "< 30s", label: "Reply Generated" },
            { value: "98%", label: "Owner Approval Rate" },
            { value: "4.9★", label: "Avg Reply Rating" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #7c6aff, #00d4aa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
      <section style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="badge" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>How it works</span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
              }}
            >
              From review to reply in{" "}
              <span className="gradient-text">three steps</span>
            </h2>
          </div>

          {/* Steps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                step: "01",
                icon: "🔗",
                title: "Connect your Google Business",
                desc: "Link your Google Business Profile in seconds. ReplyBase immediately starts monitoring all incoming reviews across your locations.",
                color: "var(--primary)",
              },
              {
                step: "02",
                icon: "✨",
                title: "AI drafts the perfect reply",
                desc: "Our AI reads the review, analyzes the sentiment, and crafts a personalized, on-brand response. No templates — real, human-sounding replies.",
                color: "var(--accent)",
              },
              {
                step: "03",
                icon: "✓",
                title: "Approve or auto-send",
                desc: "Review and approve from your dashboard, or enable auto-send for hands-free management. Get email or push alerts for every new review.",
                color: "#a78bfa",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card"
                style={{ padding: "2rem", position: "relative", overflow: "hidden" }}
              >
                {/* Step number */}
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "3.5rem",
                    fontWeight: 800,
                    color: item.color,
                    opacity: 0.12,
                    position: "absolute",
                    top: "1rem",
                    right: "1.5rem",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {item.step}
                </div>
                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${item.color}20`,
                    border: `1px solid ${item.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.375rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────────── */}
      <section style={{ padding: "2rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="badge" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>Features</span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
              }}
            >
              Everything you need to{" "}
              <span className="gradient-text">own your reputation</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {[
              {
                icon: "🤖",
                title: "AI-Powered Replies",
                desc: "Context-aware responses that match your tone. Positive, negative, or neutral — the AI handles every type of review correctly.",
                accent: "var(--primary)",
              },
              {
                icon: "📬",
                title: "Instant Notifications",
                desc: "Email alerts and in-app notifications the moment a new review lands. Never be the last to know about customer feedback.",
                accent: "var(--accent)",
              },
              {
                icon: "🔄",
                title: "Auto-Send Mode",
                desc: "Fully hands-off review management. Set it, trust it, and let ReplyBase keep your profile active 24/7.",
                accent: "#a78bfa",
              },
              {
                icon: "📍",
                title: "Multi-Location",
                desc: "Manage reviews for all your locations from a single dashboard. Perfect for franchises and multi-site businesses.",
                accent: "#f59e0b",
              },
              {
                icon: "📊",
                title: "Reply Analytics",
                desc: "Track response rates, reply times, and review trends over time. See what's working and where to improve.",
                accent: "var(--accent)",
              },
              {
                icon: "🎨",
                title: "Brand Voice",
                desc: "Train the AI on your tone, language, and style. Replies always sound like your team — not a robot.",
                accent: "var(--primary)",
              },
            ].map((f, i) => (
              <div key={i} className="glass-card" style={{ padding: "1.75rem" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${f.accent}15`,
                    border: `1px solid ${f.accent}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    marginBottom: "1rem",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
        {/* Background orb */}
        <div
          className="orb"
          style={{
            width: 600,
            height: 600,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(124,106,255,0.08) 0%, transparent 70%)",
          }}
        />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="badge" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>Pricing</span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              Simple pricing. No surprises.
            </h2>
            <p style={{ fontSize: "1.0625rem", color: "var(--text-muted)" }}>
              One plan. Everything included. Cancel anytime.
            </p>
          </div>

          {/* Single pricing card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="shimmer-border"
              style={{
                background: "linear-gradient(145deg, rgba(124,106,255,0.12) 0%, rgba(0,212,170,0.06) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "var(--radius)",
                padding: "2.5rem",
                position: "relative",
                width: "100%",
                maxWidth: 480,
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "4rem", fontWeight: 800 }}>$175</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "1rem" }}>/mo</span>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                  Everything included. Cancel anytime.
                </p>
              </div>

              <ul style={{ listStyle: "none", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {[
                  "AI reply generation",
                  "Auto-send mode",
                  "Brand voice training",
                  "Multi-location dashboard (up to 3 locations)",
                  "Unlimited reviews",
                  "Email & push notifications",
                  "Reply analytics",
                  "Priority support",
                  "14-day free trial",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", gap: "0.625rem", fontSize: "0.9375rem", alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="rgba(124,106,255,0.3)" strokeWidth="1" />
                      <path d="M5 8l2 2 4-4" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "1.0625rem", padding: "1rem" }}>
                Get Started
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
            14-day free trial included. No credit card required.
          </p>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────── */}
      <section style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="badge" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>Testimonials</span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
              }}
            >
              Businesses love ReplyBase
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {[
              {
                quote: "We went from replying to maybe 30% of reviews to 100%. Our Google rating went up half a star in two months.",
                name: "Sarah Chen",
                role: "Owner, The Brew Room",
                stars: 5,
              },
              {
                quote: "The replies sound genuinely human. Customers have actually commented that they appreciated how personal our responses are.",
                name: "Marcus Williams",
                role: "GM, Westside Auto Group",
                stars: 5,
              },
              {
                quote: "I manage 8 locations. Before ReplyBase, reviews just piled up. Now I spend 10 minutes a week on all of them.",
                name: "Jennifer Okafor",
                role: "Director, Pure Dental Group",
                stars: 5,
              },
            ].map((t, i) => (
              <div key={i} className="glass-card" style={{ padding: "1.75rem" }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem" }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <span key={si} style={{ color: "#f59e0b", fontSize: "0.875rem" }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: "0.9375rem", color: "#d4d4d4", lineHeight: 1.7, marginBottom: "1.25rem", fontStyle: "italic" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div
            className="shimmer-border"
            style={{
              background: "linear-gradient(145deg, rgba(124,106,255,0.1) 0%, rgba(0,212,170,0.05) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "var(--radius-lg)",
              padding: "4.5rem 3rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Mini orbs */}
            <div
              style={{
                position: "absolute",
                width: 300,
                height: 300,
                top: "-80px",
                left: "-60px",
                background: "radial-gradient(circle, rgba(124,106,255,0.15) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 250,
                height: 250,
                bottom: "-60px",
                right: "-40px",
                background: "radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <span className="badge" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
                Start today — free for 14 days
              </span>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.12,
                  marginBottom: "1.25rem",
                }}
              >
                Your reputation is{" "}
                <span className="gradient-text">on the line</span>.
                <br />Start replying today.
              </h2>
              <p style={{ fontSize: "1.0625rem", color: "var(--text-muted)", marginBottom: "2.5rem", maxWidth: 480, margin: "0 auto 2.5rem" }}>
                Join hundreds of businesses that never let a review go unanswered. Start your free trial — no credit card needed.
              </p>
              <Link href="/signup" className="btn-primary" style={{ fontSize: "1.0625rem", padding: "1rem 2.5rem" }}>
                Start Free Trial — It&apos;s Free
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <p style={{ marginTop: "1.25rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                14-day free trial · Cancel anytime · Setup in 5 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ─── HERO MOCKUP COMPONENT ──────────────────────────────────── */
function HeroMockup() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: "1.5rem",
        maxWidth: 680,
        margin: "0 auto",
        boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Window chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)", marginLeft: "0.5rem" }} />
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>replybase.io/dashboard</span>
      </div>

      {/* New review notification */}
      <div
        style={{
          background: "rgba(124,106,255,0.1)",
          border: "1px solid rgba(124,106,255,0.25)",
          borderRadius: 12,
          padding: "0.875rem 1.125rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c6aff", marginTop: 4, flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#a78bfa", marginBottom: "0.25rem" }}>New 4★ review — The Brew Room</div>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
            &ldquo;Great coffee but the wait was a bit long on Saturday morning...&rdquo;
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            background: "#00d4aa",
            color: "#000",
            fontSize: "0.6875rem",
            fontWeight: 700,
            padding: "0.2rem 0.6rem",
            borderRadius: "100px",
            flexShrink: 0,
          }}
        >
          NEW
        </div>
      </div>

      {/* AI Reply */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "1rem 1.125rem",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: "linear-gradient(135deg, #7c6aff, #00d4aa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.625rem",
            }}
          >
            ✨
          </div>
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>AI REPLY DRAFT</span>
        </div>
        <p style={{ fontSize: "0.8375rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
          Thank you so much for the kind words about our coffee! We&apos;re sorry to hear Saturday mornings have been busier than usual — we&apos;re actively working on improving wait times. We hope to see you again soon!
        </p>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "0.625rem" }}>
        <button
          style={{
            flex: 1,
            background: "var(--primary)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.625rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(124,106,255,0.3)",
          }}
        >
          Approve &amp; Send
        </button>
        <button
          style={{
            flex: 1,
            background: "transparent",
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            padding: "0.625rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Edit Reply
        </button>
      </div>
    </div>
  );
}

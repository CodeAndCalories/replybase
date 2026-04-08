import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Data Deletion — ReplyBase",
  description: "How to request deletion of your ReplyBase account and data.",
};

export default function DataDeletionPage() {
  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0f0f0" }}>
      <Navbar />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "9rem 1.5rem 5rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", color: "#7c6aff", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Legal
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            Data Deletion
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)" }}>
            Effective date: April 2026 · ReplyBase (<a href="https://replybasehq.com" style={{ color: "#a78bfa", textDecoration: "none" }}>replybasehq.com</a>)
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", fontSize: "0.9375rem", lineHeight: 1.75, color: "rgba(255,255,255,0.7)" }}>

          <div>
            <p>ReplyBase is committed to respecting your right to control your personal data. If you would like to delete your account and all associated data, you have two options:</p>
          </div>

          {/* Option 1 */}
          <div
            style={{
              background: "rgba(124,106,255,0.06)",
              border: "1px solid rgba(124,106,255,0.15)",
              borderRadius: 16,
              padding: "1.75rem",
            }}
          >
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.125rem", fontWeight: 700, color: "#f0f0f0", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>
              Option 1 — Delete from your dashboard
            </h2>
            <p>If you have an active ReplyBase account, you can delete it directly from the Settings page:</p>
            <ol style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>Log in to your account at <a href="https://replybasehq.com/login" style={{ color: "#a78bfa", textDecoration: "none" }}>replybasehq.com/login</a>.</li>
              <li>Go to <Link href="/dashboard/settings" style={{ color: "#a78bfa", textDecoration: "none" }}>Dashboard → Settings</Link>.</li>
              <li>Scroll to the <strong style={{ color: "#f0f0f0" }}>Danger Zone</strong> section.</li>
              <li>Click <strong style={{ color: "#f0f0f0" }}>Delete account</strong> and confirm.</li>
            </ol>
            <p style={{ marginTop: "0.75rem" }}>
              Before deleting, please cancel your subscription via the <strong style={{ color: "#f0f0f0" }}>Manage</strong> button in the Subscription section to avoid future charges.
            </p>
          </div>

          {/* Option 2 */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "1.75rem",
            }}
          >
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.125rem", fontWeight: 700, color: "#f0f0f0", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>
              Option 2 — Email us
            </h2>
            <p>If you are unable to access your account, or prefer to request deletion by email, send a request to:</p>
            <p style={{ marginTop: "0.75rem" }}>
              <a
                href="mailto:hello@replybasehq.com?subject=Data Deletion Request"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#a78bfa",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
              >
                hello@replybasehq.com
              </a>
            </p>
            <p style={{ marginTop: "0.75rem" }}>Please include the email address associated with your account in your request. We will confirm receipt and process your deletion within <strong style={{ color: "#f0f0f0" }}>30 days</strong>.</p>
          </div>

          {/* What gets deleted */}
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.125rem", fontWeight: 700, color: "#f0f0f0", marginBottom: "0.875rem", letterSpacing: "-0.01em" }}>
              What data is deleted
            </h2>
            <p>Upon deletion of your account, we will remove:</p>
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>Your email address and account credentials.</li>
              <li>Your Google OAuth refresh token and Business Profile connection.</li>
              <li>Your subscription record and associated Stripe customer data held by ReplyBase.</li>
              <li>Any stored review and reply data associated with your account.</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>Note: Stripe may retain payment transaction records as required by applicable financial regulations. Google retains data within its own systems independently of ReplyBase.</p>
          </div>

          <div>
            <p>For any questions about your data or this process, contact us at <a href="mailto:hello@replybasehq.com" style={{ color: "#a78bfa", textDecoration: "none" }}>hello@replybasehq.com</a>.</p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}

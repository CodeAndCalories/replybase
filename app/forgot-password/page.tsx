"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.replybasehq.com/reset-password",
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  }

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
      }}
    >
      {/* Orb */}
      <div
        style={{
          position: "fixed",
          width: 500,
          height: 500,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(0,212,170,0.09) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #7c6aff 0%, #00d4aa 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                boxShadow: "0 0 24px rgba(124,106,255,0.35)",
              }}
            >
              ✦
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.125rem",
                color: "#f0f0f0",
                letterSpacing: "-0.02em",
              }}
            >
              ReplyBase
            </span>
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "2.5rem",
          }}
        >
          {success ? (
            /* ── Success state ── */
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(0,212,170,0.12)",
                  border: "1px solid rgba(0,212,170,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.375rem",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  marginBottom: "0.625rem",
                }}
              >
                Check your email
              </h1>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: "1.75rem" }}>
                We&apos;ve sent a password reset link to <strong style={{ color: "rgba(255,255,255,0.75)" }}>{email}</strong>. Click the link in the email to set a new password.
              </p>
              <Link
                href="/login"
                style={{
                  display: "inline-block",
                  fontSize: "0.875rem",
                  color: "#a78bfa",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                ← Back to login
              </Link>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.625rem",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  marginBottom: "0.5rem",
                }}
              >
                Forgot password?
              </h1>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
                Enter your email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: 8,
                    padding: "0.75rem 1rem",
                    color: "#f87171",
                    fontSize: "0.875rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="jane@yourbusiness.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      padding: "0.75rem 1rem",
                      fontSize: "0.9375rem",
                      color: "#f0f0f0",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? "Sending..." : "Send reset link"}
                </button>
              </form>

              <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>
                <Link href="/login" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 500 }}>
                  ← Back to login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

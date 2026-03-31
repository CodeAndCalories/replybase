"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  }

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "0.75rem 1rem",
    fontSize: "0.9375rem",
    color: "#f0f0f0",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box" as const,
  };

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
          background: "radial-gradient(circle, rgba(124,106,255,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 440 }}>
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
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #7c6aff 0%, #00d4aa 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  margin: "0 auto 1.25rem",
                  boxShadow: "0 0 24px rgba(124,106,255,0.35)",
                }}
              >
                ✓
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
                Check your email
              </h2>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
                We sent a confirmation link to <strong style={{ color: "rgba(255,255,255,0.75)" }}>{email}</strong>.
                Click it to activate your account, then log in.
              </p>
              <Link
                href="/login"
                className="btn-primary"
                style={{ display: "inline-flex", justifyContent: "center", marginTop: "1.75rem" }}
              >
                Go to login
              </Link>
            </div>
          ) : (
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
                Start your free trial
              </h1>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
                14 days free · No credit card required
              </p>

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
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(124,106,255,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

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
                    Work email
                  </label>
                  <input
                    type="email"
                    placeholder="jane@yourbusiness.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(124,106,255,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

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
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(124,106,255,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {error && (
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#f87171",
                      background: "rgba(248,113,113,0.08)",
                      border: "1px solid rgba(248,113,113,0.2)",
                      borderRadius: 8,
                      padding: "0.625rem 0.875rem",
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                  style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "Creating account…" : "Create Account"}
                </button>
              </form>

              <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 500 }}>
                  Log in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

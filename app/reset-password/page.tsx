"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);   // session established from reset link
  const [tokenError, setTokenError] = useState(false);

  // Supabase sends either:
  //   PKCE flow  → ?code=<code>   (default with @supabase/ssr)
  //   Legacy     → #access_token=<token>&type=recovery
  // Handle both so the page works regardless of Supabase project config.
  useEffect(() => {
    const supabase = createClient();

    // 1. PKCE: exchange the code query param for a session
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      supabase.auth
        .exchangeCodeForSession(code)
        .then(({ error }) => {
          if (error) {
            console.error("Reset password: code exchange failed", error);
            setTokenError(true);
          } else {
            setReady(true);
          }
        });
      return;
    }

    // 2. Legacy hash: listen for PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    // If neither a code nor a hash recovery event arrives within a short
    // window, treat the link as invalid/expired.
    const timeout = setTimeout(() => {
      if (!ready) setTokenError(true);
    }, 4000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/login?reset=success");
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
          background: "radial-gradient(circle, rgba(124,106,255,0.09) 0%, transparent 70%)",
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
          {tokenError ? (
            /* ── Invalid / expired link ── */
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
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
                Link expired
              </h1>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: "1.75rem" }}>
                This password reset link is invalid or has expired. Please request a new one.
              </p>
              <Link
                href="/forgot-password"
                className="btn-primary"
                style={{ display: "inline-flex", justifyContent: "center" }}
              >
                Request new link
              </Link>
            </div>
          ) : !ready ? (
            /* ── Loading / exchanging token ── */
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)" }}>Verifying reset link…</p>
            </div>
          ) : (
            /* ── Password form ── */
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
                Set new password
              </h1>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
                Choose a strong password for your account.
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
                {[
                  { label: "New password", placeholder: "At least 8 characters", value: password, onChange: setPassword },
                  { label: "Confirm password", placeholder: "Repeat your new password", value: confirm, onChange: setConfirm },
                ].map((field) => (
                  <div key={field.label}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "0.375rem",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type="password"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
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
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.6 : 1, marginTop: "0.25rem" }}
                >
                  {loading ? "Saving..." : "Update password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

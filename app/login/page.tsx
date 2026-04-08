"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("reset") === "success") {
      setResetSuccess(true);
    }
  }, [searchParams]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420 }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", gap: 0 }}>
          <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "#F0F0F0", letterSpacing: "-0.02em" }}>Reply</span>
          <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "#00E5CC", letterSpacing: "-0.02em" }}>Base</span>
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
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.625rem",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            marginBottom: "0.5rem",
          }}
        >
          Welcome back
        </h1>
        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
          Log in to your ReplyBase account
        </p>

        {resetSuccess && (
          <div
            style={{
              background: "rgba(0,212,170,0.08)",
              border: "1px solid rgba(0,212,170,0.25)",
              borderRadius: 8,
              padding: "0.75rem 1rem",
              color: "#00d4aa",
              fontSize: "0.875rem",
              marginBottom: "1.25rem",
            }}
          >
            Password updated successfully. Log in with your new password.
          </div>
        )}

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

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { label: "Email", type: "email", placeholder: "jane@yourbusiness.com", value: email, onChange: setEmail },
            { label: "Password", type: "password", placeholder: "Your password", value: password, onChange: setPassword },
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
                type={field.type}
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

          <div style={{ textAlign: "right", marginTop: "-0.5rem" }}>
            <Link href="/forgot-password" style={{ fontSize: "0.8125rem", color: "#00E5CC", textDecoration: "none" }}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.6 : 1, display: "flex", alignItems: "center", background: "#00E5CC", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "0.875rem 2rem", borderRadius: 9999, border: "none", cursor: loading ? "default" : "pointer" }}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "#00E5CC", textDecoration: "none", fontWeight: 500 }}>
            Get Started
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
      }}
    >
      <Suspense fallback={<div />}>
        <LoginContent />
      </Suspense>
    </main>
  );
}

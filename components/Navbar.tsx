"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 1.5rem",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        background: scrolled ? "rgba(10,10,15,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: "linear-gradient(135deg, #7c6aff 0%, #00d4aa 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.875rem",
            boxShadow: "0 0 20px rgba(124,106,255,0.35)",
          }}
        >
          ✦
        </div>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "1.0625rem",
            color: "#f0f0f0",
            letterSpacing: "-0.02em",
          }}
        >
          ReplyBase
        </span>
      </Link>

      {/* Desktop nav links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
        className="hidden md:flex"
      >
        {[
          { label: "How it Works", href: "#how-it-works" },
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => smoothScroll(e, link.href)}
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "rgba(240,240,240,0.7)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#f0f0f0")}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(240,240,240,0.7)")}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Link
          href="/login"
          style={{
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "rgba(240,240,240,0.7)",
            textDecoration: "none",
            padding: "0.5rem 1rem",
          }}
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="btn-primary"
          style={{ padding: "0.5625rem 1.25rem", fontSize: "0.9rem" }}
        >
          Get Started
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#f0f0f0",
            padding: "0.25rem",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {mobileOpen ? (
              <path d="M4 4l14 14M4 18L18 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 7h16M3 11h16M3 15h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(10,10,15,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "1.25rem 1.5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {[
            { label: "How it Works", href: "#how-it-works" },
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { smoothScroll(e, link.href); setMobileOpen(false); }}
              style={{ fontSize: "1rem", fontWeight: 500, color: "#f0f0f0", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          <Link href="/login" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
            Log in
          </Link>
          <Link href="/signup" className="btn-primary" style={{ textAlign: "center" }}>
            Get Started
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

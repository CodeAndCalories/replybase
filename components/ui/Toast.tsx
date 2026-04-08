"use client";

import { useEffect, useState } from "react";
import type { Toast as ToastType } from "@/lib/hooks/useToast";

const VARIANTS = {
  success: { color: "#00d4aa", bg: "rgba(0,212,170,0.1)",    border: "rgba(0,212,170,0.25)"    },
  error:   { color: "#f87171", bg: "rgba(248,113,113,0.1)",  border: "rgba(248,113,113,0.25)"  },
  info:    { color: "#a78bfa", bg: "rgba(167,139,250,0.1)",  border: "rgba(167,139,250,0.25)"  },
};

function SuccessIcon({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ErrorIcon({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function InfoIcon({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastType; onRemove: () => void }) {
  const [visible, setVisible] = useState(false);
  const v = VARIANTS[toast.variant];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 16);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      role="alert"
      style={{
        display:        "flex",
        alignItems:     "center",
        gap:            "0.75rem",
        padding:        "0.875rem 1rem",
        background:     "#14141f",
        border:         `1px solid ${v.border}`,
        borderRadius:   12,
        boxShadow:      "0 8px 32px rgba(0,0,0,0.45)",
        minWidth:       260,
        maxWidth:       360,
        opacity:        visible ? 1 : 0,
        transform:      visible ? "translateY(0) scale(1)" : "translateY(6px) scale(0.97)",
        transition:     "opacity 0.2s ease, transform 0.2s ease",
      }}
    >
      <div
        style={{
          width:          26,
          height:         26,
          borderRadius:   7,
          background:     v.bg,
          border:         `1px solid ${v.border}`,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
        }}
      >
        {toast.variant === "success" && <SuccessIcon color={v.color} />}
        {toast.variant === "error"   && <ErrorIcon   color={v.color} />}
        {toast.variant === "info"    && <InfoIcon    color={v.color} />}
      </div>

      <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#f0f0f0", flex: 1, lineHeight: 1.4, margin: 0 }}>
        {toast.message}
      </p>

      <button
        onClick={onRemove}
        aria-label="Dismiss"
        style={{
          background:  "none",
          border:      "none",
          cursor:      "pointer",
          color:       "rgba(255,255,255,0.3)",
          padding:     "2px",
          display:     "flex",
          alignItems:  "center",
          flexShrink:  0,
          borderRadius: 4,
          transition:  "color 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export default function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts:   ToastType[];
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position:      "fixed",
        bottom:        "1.5rem",
        right:         "1.5rem",
        zIndex:        200,
        display:       "flex",
        flexDirection: "column",
        gap:           "0.5rem",
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <div key={t.id} style={{ pointerEvents: "auto" }}>
          <ToastItem toast={t} onRemove={() => onRemove(t.id)} />
        </div>
      ))}
    </div>
  );
}

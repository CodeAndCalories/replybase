"use client";

import { useState } from "react";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 100,
        background: checked ? "#7c6aff" : "rgba(255,255,255,0.1)",
        border: checked ? "1px solid rgba(124,106,255,0.5)" : "1px solid rgba(255,255,255,0.12)",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.2s ease",
        flexShrink: 0,
        boxShadow: checked ? "0 0 12px rgba(124,106,255,0.4)" : "none",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 22 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s ease",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18,
        overflow: "hidden",
        marginBottom: "1.25rem",
      }}
    >
      <div
        style={{
          padding: "1.125rem 1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.9375rem",
            fontWeight: 700,
            color: "#f0f0f0",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
      </div>
      <div style={{ padding: "0.25rem 0" }} className="dash-settings-section-body">{children}</div>
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
  danger,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div
      className="dash-settings-row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        padding: "1rem 1.5rem",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div>
        <p style={{ fontSize: "0.9rem", fontWeight: 500, color: danger ? "#f87171" : "#f0f0f0", marginBottom: description ? "0.25rem" : 0 }}>
          {label}
        </p>
        {description && (
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{description}</p>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

export default function SettingsClient({
  email,
  autoReplyEnabled,
}: {
  email: string;
  autoReplyEnabled: boolean;
}) {
  const [autoReply, setAutoReply] = useState(autoReplyEnabled);
  const [autoReplyLoading, setAutoReplyLoading] = useState(false);
  const [autoReplyError, setAutoReplyError] = useState("");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [lowRatingAlerts, setLowRatingAlerts] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  async function handleAutoReplyToggle(enabled: boolean) {
    setAutoReplyLoading(true);
    setAutoReplyError("");
    try {
      const res = await fetch("/api/settings/auto-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "Unknown error" }));
        setAutoReplyError(error ?? "Failed to save setting");
        return;
      }
      setAutoReply(enabled);
    } catch {
      setAutoReplyError("Network error — please try again");
    } finally {
      setAutoReplyLoading(false);
    }
  }

  async function handleManage() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } finally {
      setPortalLoading(false);
    }
  }

  async function handleDeleteConfirm() {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="dash-settings-page" style={{ padding: "2.5rem", maxWidth: 720 }}>
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
          Preferences
        </p>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.875rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#f0f0f0",
          }}
        >
          Settings
        </h1>
      </div>

      {/* Account */}
      <Section title="Account">
        <SettingRow label="Email address" description="Your login email">
          <div
            style={{
              padding: "0.4375rem 0.875rem",
              borderRadius: 8,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {email}
          </div>
        </SettingRow>
        <SettingRow label="Password" description="Last changed 30 days ago">
          <button
            style={{
              padding: "0.4375rem 1rem",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              color: "rgba(255,255,255,0.55)",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Change password
          </button>
        </SettingRow>
      </Section>

      {/* Subscription */}
      <Section title="Subscription">
        <SettingRow
          label="Current plan"
          description="Your subscription renews on April 30, 2026"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.3125rem 0.875rem",
                borderRadius: 100,
                background: "rgba(0,212,170,0.1)",
                border: "1px solid rgba(0,212,170,0.25)",
                color: "#00d4aa",
                fontSize: "0.8125rem",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#00d4aa",
                  boxShadow: "0 0 6px #00d4aa",
                  display: "inline-block",
                }}
              />
              Pro — Active
            </span>
            <button
              onClick={handleManage}
              disabled={portalLoading}
              style={{
                padding: "0.375rem 0.875rem",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent",
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                cursor: portalLoading ? "default" : "pointer",
                opacity: portalLoading ? 0.6 : 1,
              }}
            >
              {portalLoading ? "Loading..." : "Manage"}
            </button>
          </div>
        </SettingRow>
        <SettingRow label="Usage this month" description="Reviews processed">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 120,
                height: 6,
                borderRadius: 100,
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "8%",
                  height: "100%",
                  background: "linear-gradient(90deg, #7c6aff, #00d4aa)",
                  borderRadius: 100,
                }}
              />
            </div>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)" }}>0 / 500</span>
          </div>
        </SettingRow>
      </Section>

      {/* Auto-reply */}
      <Section title="AI Replies">
        <SettingRow
          label="Auto-reply mode"
          description="Automatically send AI-generated replies without manual approval"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            {autoReplyLoading ? (
              <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>
                Saving…
              </span>
            ) : (
              <span style={{ fontSize: "0.8125rem", color: autoReply ? "#a78bfa" : "rgba(255,255,255,0.3)", fontWeight: 500 }}>
                {autoReply ? "On" : "Off"}
              </span>
            )}
            <Toggle
              checked={autoReply}
              onChange={(v) => {
                if (!autoReplyLoading) handleAutoReplyToggle(v);
              }}
            />
          </div>
        </SettingRow>
        {autoReplyError && (
          <div
            style={{
              margin: "0 1.5rem 0.75rem",
              padding: "0.75rem 1rem",
              borderRadius: 10,
              background: "rgba(248,113,113,0.08)",
              border: "1px solid rgba(248,113,113,0.2)",
              fontSize: "0.8125rem",
              color: "#f87171",
            }}
          >
            {autoReplyError}
          </div>
        )}
        {autoReply && (
          <div
            style={{
              margin: "0 1.5rem 0.75rem",
              padding: "0.875rem 1rem",
              borderRadius: 10,
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
              display: "flex",
              gap: "0.625rem",
              alignItems: "flex-start",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p style={{ fontSize: "0.8125rem", color: "rgba(245,158,11,0.8)", lineHeight: 1.55 }}>
              Auto-reply is enabled. Replies will be sent automatically. We recommend reviewing a few manually first to tune the AI tone.
            </p>
          </div>
        )}
        <SettingRow
          label="Reply tone"
          description="How the AI sounds in generated replies"
        >
          <select
            style={{
              padding: "0.4375rem 0.75rem",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.65)",
              fontSize: "0.875rem",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="concise">Concise</option>
            <option value="enthusiastic">Enthusiastic</option>
          </select>
        </SettingRow>
      </Section>

      {/* Notifications */}
      <Section title="Notifications">
        <SettingRow label="Email notifications" description="Get notified when new reviews arrive">
          <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
        </SettingRow>
        <SettingRow label="Weekly digest" description="Summary of reviews and replies every Monday">
          <Toggle checked={weeklyDigest} onChange={setWeeklyDigest} />
        </SettingRow>
        <SettingRow label="Low rating alerts" description="Instant alert for 1–2 star reviews">
          <Toggle checked={lowRatingAlerts} onChange={setLowRatingAlerts} />
        </SettingRow>
      </Section>

      {/* Danger zone */}
      <Section title="Danger Zone">
        <SettingRow
          label="Delete account"
          description="Permanently delete your account and all data. This cannot be undone."
          danger
        >
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              padding: "0.4375rem 1rem",
              borderRadius: 8,
              border: "1px solid rgba(248,113,113,0.25)",
              background: "rgba(248,113,113,0.08)",
              color: "#f87171",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Delete account
          </button>
        </SettingRow>
      </Section>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              background: "#13131a",
              border: "1px solid rgba(248,113,113,0.2)",
              borderRadius: 18,
              padding: "2rem",
              maxWidth: 420,
              width: "100%",
            }}
          >
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#f87171",
                marginBottom: "0.875rem",
              }}
            >
              Delete account
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
              This will permanently delete your account. Please cancel your subscription first at{" "}
              <button
                onClick={handleManage}
                style={{ color: "#a78bfa", background: "none", border: "none", cursor: "pointer", fontSize: "0.9rem", padding: 0, textDecoration: "underline" }}
              >
                Manage Subscription
              </button>{" "}
              to avoid future charges.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: 8,
                  border: "1px solid rgba(248,113,113,0.3)",
                  background: "rgba(248,113,113,0.12)",
                  color: "#f87171",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

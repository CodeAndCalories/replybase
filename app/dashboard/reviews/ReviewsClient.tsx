"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/useToast";
import { ToastContainer } from "@/components/ui/Toast";

type Review = {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  review_date: string;
  reply_status: string;
  reply_text: string | null;
};

type Props = {
  reviews: Review[];
  businessName: string;
  hasConnectedBusiness: boolean;
  lastSyncedAt: string | null;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= rating ? "#f59e0b" : "none"}
          stroke={star <= rating ? "#f59e0b" : "rgba(255,255,255,0.2)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ratingColor(rating: number) {
  if (rating >= 4) return { color: "#00d4aa", bg: "rgba(0,212,170,0.1)", border: "rgba(0,212,170,0.2)" };
  if (rating === 3) return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" };
  return { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" };
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function formatRelative(iso: string): string {
  try {
    const diffMs  = Date.now() - new Date(iso).getTime();
    const diffMin = Math.floor(diffMs / 60_000);
    if (diffMin < 1)   return "just now";
    if (diffMin < 60)  return `${diffMin}m ago`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24)    return `${diffH}h ago`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 30)    return `${diffD}d ago`;
    return formatDate(iso);
  } catch {
    return iso;
  }
}

function EmptyIllustration() {
  return (
    <div
      className="empty-state-icon"
      style={{ position: "relative", width: 80, height: 80, margin: "0 auto" }}
    >
      {/* Central icon */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 22,
          background: "rgba(124,106,255,0.08)",
          border: "1px solid rgba(124,106,255,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(124,106,255,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
      {/* Decorative dots */}
      {[0, 120, 240].map((deg) => (
        <div
          key={deg}
          style={{
            position:  "absolute",
            top:       "50%",
            left:      "50%",
            width:     6,
            height:    6,
            borderRadius: "50%",
            background: "rgba(124,106,255,0.35)",
            transform: `rotate(${deg}deg) translateX(46px) translateY(-50%)`,
          }}
        />
      ))}
    </div>
  );
}

export default function ReviewsClient({ reviews, businessName, hasConnectedBusiness, lastSyncedAt }: Props) {
  const router = useRouter();
  const { toasts, addToast, removeToast } = useToast();

  const [replyDrafts, setReplyDrafts]     = useState<Record<string, string>>({});
  const [showReply, setShowReply]         = useState<Record<string, boolean>>({});
  const [generating, setGenerating]       = useState<Record<string, boolean>>({});
  const [posting, setPosting]             = useState<Record<string, boolean>>({});
  const [published, setPublished]         = useState<Record<string, boolean>>({});
  const [syncing, setSyncing]             = useState(false);
  const [filter, setFilter]               = useState<"All" | "Pending" | "Replied">("All");

  async function handleSync() {
    setSyncing(true);
    try {
      const res  = await fetch("/api/reviews/sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        addToast(`Sync failed: ${data.error}`, "error");
      } else {
        addToast(`Synced ${data.synced} review${data.synced !== 1 ? "s" : ""}`, "success");
        router.refresh();
      }
    } catch {
      addToast("Sync failed. Please try again.", "error");
    } finally {
      setSyncing(false);
    }
  }

  async function handleGenerate(review: Review) {
    setGenerating((p) => ({ ...p, [review.id]: true }));
    setShowReply((p) => ({ ...p, [review.id]: true }));
    try {
      const res  = await fetch("/api/generate-reply", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewerName: review.reviewer_name,
          rating:       review.rating,
          reviewText:   review.review_text,
          businessName,
        }),
      });
      const data = await res.json();
      setReplyDrafts((p) => ({ ...p, [review.id]: data.reply ?? "" }));
      addToast("Reply generated — edit if needed, then send.", "success");
    } catch {
      setReplyDrafts((p) => ({ ...p, [review.id]: "" }));
      addToast("Failed to generate reply. Please try again.", "error");
    } finally {
      setGenerating((p) => ({ ...p, [review.id]: false }));
    }
  }

  async function handleApproveAndSend(reviewId: string) {
    const reply = replyDrafts[reviewId]?.trim();
    if (!reply) return;
    setPosting((p) => ({ ...p, [reviewId]: true }));
    try {
      const res = await fetch("/api/reviews/reply", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId, reply }),
      });
      if (res.ok) {
        setPublished((p) => ({ ...p, [reviewId]: true }));
        setShowReply((p) => ({ ...p, [reviewId]: false }));
        addToast("Reply posted to Google.", "success");
      } else {
        const data = await res.json();
        addToast(`Failed to post reply: ${data.error}`, "error");
      }
    } catch {
      addToast("Failed to post reply. Please try again.", "error");
    } finally {
      setPosting((p) => ({ ...p, [reviewId]: false }));
    }
  }

  const filteredReviews = reviews.filter((r) => {
    const isPublished = r.reply_status === "published" || published[r.id];
    if (filter === "Replied")  return isPublished;
    if (filter === "Pending")  return !isPublished;
    return true;
  });

  return (
    <div style={{ padding: "2.5rem", maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", color: "#7c6aff", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Inbox
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f0f0" }}>
            Reviews
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            {/* Filter buttons */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {(["All", "Pending", "Replied"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding:    "0.4375rem 1rem",
                    borderRadius: 8,
                    border:     filter === f ? "1px solid rgba(124,106,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    background: filter === f ? "rgba(124,106,255,0.12)" : "transparent",
                    color:      filter === f ? "#a78bfa" : "rgba(255,255,255,0.4)",
                    fontSize:   "0.8125rem",
                    fontWeight: 500,
                    cursor:     "pointer",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            {/* Sync button */}
            {hasConnectedBusiness && (
              <button
                onClick={handleSync}
                disabled={syncing}
                style={{
                  display:    "inline-flex",
                  alignItems: "center",
                  gap:        "0.4rem",
                  padding:    "0.4375rem 1rem",
                  borderRadius: 8,
                  border:     "1px solid rgba(124,106,255,0.3)",
                  background: "rgba(124,106,255,0.1)",
                  color:      "#a78bfa",
                  fontSize:   "0.8125rem",
                  fontWeight: 500,
                  cursor:     syncing ? "default" : "pointer",
                  opacity:    syncing ? 0.6 : 1,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ animation: syncing ? "spin 1s linear infinite" : "none" }}>
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
                {syncing ? "Syncing…" : "Sync Reviews"}
              </button>
            )}
          </div>
        </div>

        {/* Last synced indicator */}
        {lastSyncedAt && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", marginTop: "0.625rem" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.28)" }}>
              Last synced {formatRelative(lastSyncedAt)}
            </span>
          </div>
        )}
      </div>

      {/* No connected business */}
      {!hasConnectedBusiness && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "5rem 2rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
          <EmptyIllustration />
          <div>
            <p style={{ fontSize: "1.0625rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>
              No Google Business Profile connected
            </p>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", maxWidth: 380, margin: "0 auto", lineHeight: 1.6 }}>
              Connect your Google Business Profile to start managing and replying to reviews with AI.
            </p>
          </div>
          <a
            href="/dashboard/businesses"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", padding: "0.75rem 1.625rem", borderRadius: 10, background: "#7c6aff", color: "#fff", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", boxShadow: "0 0 28px rgba(124,106,255,0.38)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Connect Google Business Profile
          </a>
        </div>
      )}

      {/* Empty state — connected but no reviews */}
      {hasConnectedBusiness && reviews.length === 0 && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "5rem 2rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
          <EmptyIllustration />
          <div>
            <p style={{ fontSize: "1.0625rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>No reviews yet</p>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", maxWidth: 380, margin: "0 auto", lineHeight: 1.6 }}>
              Fetch your latest reviews from Google Business Profile.
            </p>
          </div>
          <button
            onClick={handleSync}
            disabled={syncing}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.625rem", borderRadius: 10, border: "none", background: "#7c6aff", color: "#fff", fontWeight: 600, fontSize: "0.9rem", cursor: syncing ? "default" : "pointer", opacity: syncing ? 0.7 : 1, boxShadow: "0 0 28px rgba(124,106,255,0.38)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ animation: syncing ? "spin 1s linear infinite" : "none" }}>
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
            {syncing ? "Syncing…" : "Sync Reviews"}
          </button>
        </div>
      )}

      {/* Empty filtered state */}
      {hasConnectedBusiness && reviews.length > 0 && filteredReviews.length === 0 && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "3rem 2rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)" }}>No {filter.toLowerCase()} reviews.</p>
        </div>
      )}

      {/* Reviews list */}
      {filteredReviews.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filteredReviews.map((review) => {
            const rc           = ratingColor(review.rating);
            const isPublished  = review.reply_status === "published" || published[review.id];
            const isGenerating = generating[review.id];
            const isPosting    = posting[review.id];
            const draft        = replyDrafts[review.id];

            return (
              <div
                key={review.id}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}
              >
                <div style={{ padding: "1.375rem 1.5rem" }}>
                  {/* Review header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.875rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${rc.color}30 0%, rgba(124,106,255,0.2) 100%)`, border: `1px solid ${rc.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 700, color: rc.color, flexShrink: 0 }}>
                        {review.reviewer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#f0f0f0", marginBottom: "0.25rem" }}>
                          {review.reviewer_name}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                          <StarRating rating={review.rating} />
                          <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: rc.color, background: rc.bg, border: `1px solid ${rc.border}`, padding: "0.125rem 0.5rem", borderRadius: 100 }}>
                            {review.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0 }}>
                      <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>
                        {review.review_date ? formatDate(review.review_date) : ""}
                      </span>
                      {isPublished && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", fontWeight: 600, color: "#00d4aa", background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)", padding: "0.25rem 0.625rem", borderRadius: 100 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Replied
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Review text */}
                  <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: isPublished ? 0 : "1.125rem" }}>
                    {review.review_text || <em style={{ color: "rgba(255,255,255,0.3)" }}>No written review</em>}
                  </p>

                  {/* Published reply preview */}
                  {isPublished && (review.reply_text || draft) && (
                    <div style={{ marginTop: "1rem", padding: "0.875rem 1rem", background: "rgba(0,212,170,0.05)", border: "1px solid rgba(0,212,170,0.12)", borderRadius: 10 }}>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#00d4aa", marginBottom: "0.375rem" }}>Your reply</p>
                      <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                        {published[review.id] ? draft : review.reply_text}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {!isPublished && (
                    <div className="dash-review-actions" style={{ display: "flex", gap: "0.625rem" }}>
                      <button
                        onClick={() => handleGenerate(review)}
                        disabled={isGenerating}
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5625rem 1.125rem", borderRadius: 8, border: "1px solid rgba(124,106,255,0.3)", background: "rgba(124,106,255,0.1)", color: "#a78bfa", fontSize: "0.875rem", fontWeight: 500, cursor: isGenerating ? "default" : "pointer", opacity: isGenerating ? 0.7 : 1, transition: "all 0.15s ease" }}
                      >
                        {isGenerating ? (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Generating…
                          </>
                        ) : (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 8v4l3 3" />
                            </svg>
                            Generate Reply
                          </>
                        )}
                      </button>

                      {draft && !isGenerating && (
                        <button
                          onClick={() => handleApproveAndSend(review.id)}
                          disabled={isPosting}
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5625rem 1.125rem", borderRadius: 8, border: "1px solid rgba(0,212,170,0.3)", background: "rgba(0,212,170,0.1)", color: "#00d4aa", fontSize: "0.875rem", fontWeight: 500, cursor: isPosting ? "default" : "pointer", opacity: isPosting ? 0.7 : 1, transition: "all 0.15s ease" }}
                        >
                          {isPosting ? (
                            <>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                              </svg>
                              Posting…
                            </>
                          ) : (
                            <>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Approve &amp; Send
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Reply draft textarea */}
                {showReply[review.id] && !isPublished && (
                  <div style={{ padding: "1.25rem 1.5rem", background: "rgba(124,106,255,0.05)", borderTop: "1px solid rgba(124,106,255,0.12)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg, #7c6aff 0%, #00d4aa 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.625rem" }}>✦</div>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#a78bfa" }}>AI Draft</span>
                      <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginLeft: "auto" }}>Edit before sending</span>
                    </div>
                    <textarea
                      value={isGenerating ? "Generating reply…" : (draft ?? "")}
                      onChange={(e) => setReplyDrafts((p) => ({ ...p, [review.id]: e.target.value }))}
                      readOnly={isGenerating}
                      rows={4}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "0.875rem 1rem", color: isGenerating ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.75)", fontSize: "0.9rem", lineHeight: 1.65, resize: "vertical", fontFamily: "inherit", outline: "none" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

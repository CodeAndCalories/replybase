"use client";

import { useState } from "react";

const mockReviews = [
  {
    id: 1,
    name: "Sarah Chen",
    rating: 5,
    text: "Absolutely fantastic service! The team went above and beyond to make sure everything was perfect. Will definitely be coming back and recommending to all my friends.",
    date: "2 hours ago",
    business: "The Coffee Spot",
    replied: false,
  },
  {
    id: 2,
    name: "Marcus Williams",
    rating: 4,
    text: "Great experience overall. The staff was friendly and the product quality was excellent. Only minor issue was a slight wait time but completely understandable.",
    date: "Yesterday",
    business: "The Coffee Spot",
    replied: false,
  },
  {
    id: 3,
    name: "Priya Patel",
    rating: 2,
    text: "Disappointed with my recent visit. The service was slow and the product wasn't up to the usual standards. Hope this improves next time.",
    date: "3 days ago",
    business: "The Coffee Spot",
    replied: false,
  },
  {
    id: 4,
    name: "James Thornton",
    rating: 5,
    text: "Best in the city! Consistent quality every single time. Been a loyal customer for 2 years and never had a bad experience.",
    date: "1 week ago",
    business: "The Coffee Spot",
    replied: true,
  },
];

const mockReplies: Record<number, string> = {
  1: "Thank you so much for your kind words, Sarah! We're thrilled to hear you had such a wonderful experience with us. Our team works hard to go the extra mile, and it means the world to us that it shows. We can't wait to welcome you back — and your friends too! ☕",
  2: "Hi Marcus, thank you for taking the time to leave a review! We're so glad you enjoyed the quality and our team's service. We appreciate your patience regarding the wait time — we're always working on improving our speed without compromising quality. Hope to see you again soon!",
  3: "Hi Priya, we're truly sorry to hear about your recent experience. This is not the standard we hold ourselves to, and we completely understand your disappointment. We'd love the chance to make it right — please reach out to us directly so we can address this personally.",
  4: "Thank you James! Loyal customers like you are the heart of what we do. Two years of trust means everything to us, and we're committed to keeping that standard high for many more to come. See you soon!",
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

export default function ReviewsPage() {
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});
  const [generating, setGenerating] = useState<Record<number, boolean>>({});
  const [approved, setApproved] = useState<Record<number, boolean>>({});
  const [showReply, setShowReply] = useState<Record<number, boolean>>({});

  const handleGenerate = async (id: number) => {
    const review = mockReviews.find((r) => r.id === id);
    if (!review) return;

    setGenerating((prev) => ({ ...prev, [id]: true }));
    setShowReply((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewerName: review.name,
          rating: review.rating,
          reviewText: review.text,
          businessName: review.business,
        }),
      });
      const data = await res.json();
      setReplyDrafts((prev) => ({ ...prev, [id]: data.reply ?? "" }));
    } catch {
      setReplyDrafts((prev) => ({ ...prev, [id]: mockReplies[id] ?? "" }));
    } finally {
      setGenerating((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleApprove = (id: number) => {
    setApproved((prev) => ({ ...prev, [id]: true }));
  };

  const ratingColor = (rating: number) => {
    if (rating >= 4) return { color: "#00d4aa", bg: "rgba(0,212,170,0.1)", border: "rgba(0,212,170,0.2)" };
    if (rating === 3) return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" };
    return { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" };
  };

  return (
    <div style={{ padding: "2.5rem", maxWidth: 900 }}>
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
          Inbox
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.875rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#f0f0f0",
            }}
          >
            Reviews
          </h1>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["All", "Pending", "Replied"].map((filter) => (
              <button
                key={filter}
                style={{
                  padding: "0.4375rem 1rem",
                  borderRadius: 8,
                  border: filter === "All" ? "1px solid rgba(124,106,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  background: filter === "All" ? "rgba(124,106,255,0.12)" : "transparent",
                  color: filter === "All" ? "#a78bfa" : "rgba(255,255,255,0.4)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {mockReviews.map((review) => {
          const rc = ratingColor(review.rating);
          const isApproved = approved[review.id] || review.replied;
          return (
            <div
              key={review.id}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "1.375rem 1.5rem" }}>
                {/* Review header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.875rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${rc.color}30 0%, rgba(124,106,255,0.2) 100%)`,
                        border: `1px solid ${rc.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: rc.color,
                        flexShrink: 0,
                      }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#f0f0f0", marginBottom: "0.25rem" }}>
                        {review.name}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <StarRating rating={review.rating} />
                        <span
                          style={{
                            fontSize: "0.6875rem",
                            fontWeight: 600,
                            color: rc.color,
                            background: rc.bg,
                            border: `1px solid ${rc.border}`,
                            padding: "0.125rem 0.5rem",
                            borderRadius: 100,
                          }}
                        >
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>{review.date}</span>
                    {isApproved && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#00d4aa",
                          background: "rgba(0,212,170,0.1)",
                          border: "1px solid rgba(0,212,170,0.2)",
                          padding: "0.25rem 0.625rem",
                          borderRadius: 100,
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Sent
                      </span>
                    )}
                  </div>
                </div>

                {/* Review text */}
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.65,
                    marginBottom: "1.125rem",
                  }}
                >
                  {review.text}
                </p>

                {/* Actions */}
                {!isApproved && (
                  <div style={{ display: "flex", gap: "0.625rem" }}>
                    <button
                      onClick={() => handleGenerate(review.id)}
                      disabled={!!generating[review.id]}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5625rem 1.125rem",
                        borderRadius: 8,
                        border: "1px solid rgba(124,106,255,0.3)",
                        background: "rgba(124,106,255,0.1)",
                        color: "#a78bfa",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        cursor: generating[review.id] ? "default" : "pointer",
                        opacity: generating[review.id] ? 0.7 : 1,
                        transition: "all 0.15s ease",
                      }}
                    >
                      {generating[review.id] ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          Generating…
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a10 10 0 1 0 10 10" />
                            <path d="M12 8v4l3 3" />
                          </svg>
                          Generate Reply
                        </>
                      )}
                    </button>
                    {replyDrafts[review.id] && (
                      <button
                        onClick={() => handleApprove(review.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.5625rem 1.125rem",
                          borderRadius: 8,
                          border: "1px solid rgba(0,212,170,0.3)",
                          background: "rgba(0,212,170,0.1)",
                          color: "#00d4aa",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Approve &amp; Send
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Reply draft area */}
              {showReply[review.id] && !isApproved && (
                <div
                  style={{
                    padding: "1.25rem 1.5rem",
                    background: "rgba(124,106,255,0.05)",
                    borderTop: "1px solid rgba(124,106,255,0.12)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #7c6aff 0%, #00d4aa 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.625rem",
                      }}
                    >
                      ✦
                    </div>
                    <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#a78bfa" }}>AI Draft</span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginLeft: "auto" }}>Edit before sending</span>
                  </div>
                  <textarea
                    value={generating[review.id] ? "Generating reply…" : (replyDrafts[review.id] ?? "")}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({ ...prev, [review.id]: e.target.value }))
                    }
                    readOnly={generating[review.id]}
                    rows={4}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "0.875rem 1rem",
                      color: generating[review.id] ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.75)",
                      fontSize: "0.9rem",
                      lineHeight: 1.65,
                      resize: "vertical",
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

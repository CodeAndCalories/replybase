import Skeleton from "@/components/ui/Skeleton";

export default function BusinessesLoading() {
  return (
    <div style={{ padding: "2.5rem", maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <Skeleton width={70} height={11} style={{ marginBottom: 10 }} />
        <Skeleton width={150} height={32} borderRadius={8} />
      </div>

      {/* 3-step grid */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 "1rem",
          marginBottom:        "2rem",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              background:   "rgba(255,255,255,0.03)",
              border:       "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding:      "1.25rem",
            }}
          >
            <Skeleton width={32} height={32} borderRadius={8} style={{ marginBottom: 12 }} />
            <Skeleton width="50%" height={12} style={{ marginBottom: 8 }} />
            <Skeleton height={12} style={{ marginBottom: 6 }} />
            <Skeleton width="70%" height={12} />
          </div>
        ))}
      </div>

      {/* Business card */}
      <div
        style={{
          background:   "rgba(255,255,255,0.03)",
          border:       "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18,
          overflow:     "hidden",
        }}
      >
        <div style={{ padding: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Skeleton width={48} height={48} borderRadius={14} />
            <div>
              <Skeleton width={180} height={16} style={{ marginBottom: 8 }} />
              <Skeleton width={100} height={22} borderRadius={100} />
            </div>
          </div>
          <Skeleton width={120} height={38} borderRadius={9} />
        </div>
        <div style={{ padding: "0.875rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <Skeleton width={200} height={12} />
        </div>
      </div>
    </div>
  );
}

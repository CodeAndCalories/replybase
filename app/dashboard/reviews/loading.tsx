import Skeleton from "@/components/ui/Skeleton";

function ReviewCardSkeleton() {
  return (
    <div
      style={{
        background:   "rgba(255,255,255,0.03)",
        border:       "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding:      "1.375rem 1.5rem",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
        <Skeleton width={40} height={40} borderRadius="50%" />
        <div style={{ flex: 1 }}>
          <Skeleton width="35%" height={14} style={{ marginBottom: 8 }} />
          <Skeleton width="22%" height={12} />
        </div>
        <Skeleton width={70} height={24} borderRadius={100} />
      </div>
      {/* Body */}
      <Skeleton height={14} style={{ marginBottom: 8 }} />
      <Skeleton height={14} width="80%" style={{ marginBottom: 8 }} />
      <Skeleton height={14} width="60%" style={{ marginBottom: 20 }} />
      {/* Action */}
      <Skeleton width={140} height={36} borderRadius={8} />
    </div>
  );
}

export default function ReviewsLoading() {
  return (
    <div style={{ padding: "2.5rem", maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <Skeleton width={60} height={11} style={{ marginBottom: 10 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Skeleton width={120} height={32} borderRadius={8} />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Skeleton width={60}  height={34} borderRadius={8} />
            <Skeleton width={60}  height={34} borderRadius={8} />
            <Skeleton width={60}  height={34} borderRadius={8} />
            <Skeleton width={120} height={34} borderRadius={8} />
          </div>
        </div>
        <Skeleton width={160} height={12} style={{ marginTop: 10 }} />
      </div>

      {/* Review cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[0, 1, 2].map((i) => (
          <ReviewCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

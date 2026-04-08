import type { CSSProperties } from "react";

interface SkeletonProps {
  width?:        string | number;
  height?:       string | number;
  borderRadius?: string | number;
  style?:        CSSProperties;
}

export default function Skeleton({ width, height, borderRadius, style }: SkeletonProps) {
  return (
    <div
      className="skeleton-pulse"
      style={{
        width:        width        ?? "100%",
        height:       height       ?? "1rem",
        borderRadius: borderRadius ?? 6,
        background:   "rgba(255,255,255,0.08)",
        ...style,
      }}
    />
  );
}

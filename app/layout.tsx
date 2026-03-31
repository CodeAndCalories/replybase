import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReplyBase — AI Review Replies for Google Business",
  description:
    "ReplyBase monitors your Google Business reviews and generates professional AI replies instantly. Approve with one click or auto-send. Never miss a review again.",
  keywords: "google business review replies, ai review management, review response automation, google reviews",
  openGraph: {
    title: "ReplyBase — Never Miss a Review Reply Again",
    description:
      "AI-powered review reply management for Google Business. Auto-generate professional responses, approve with one click, and protect your reputation on autopilot.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

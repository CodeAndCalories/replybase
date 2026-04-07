import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://replybasehq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ReplyBase — AI Review Reply Management for Local Businesses",
  description:
    "ReplyBase automates Google review replies for local businesses. AI-powered review management, reputation management, and one-click approval. Never miss a Google review again.",
  keywords:
    "review management, Google review replies, reputation management, AI review responses, local business reviews, Google Business Profile, review reply automation",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "ReplyBase — AI Review Reply Management for Local Businesses",
    description:
      "Automate Google review replies for your local business. AI-powered reputation management — approve with one click or auto-send. Protect your reputation on autopilot.",
    type: "website",
    url: siteUrl,
    siteName: "ReplyBase",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ReplyBase — AI Review Reply Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReplyBase — AI Review Reply Management for Local Businesses",
    description:
      "Automate Google review replies for your local business. AI-powered reputation management — approve with one click or auto-send.",
    images: ["/og-image.png"],
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

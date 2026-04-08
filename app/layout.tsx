import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.replybasehq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | ReplyBase",
    default: "ReplyBase — AI Google Review Replies for Local Businesses",
  },
  description:
    "ReplyBase automatically generates professional AI replies to your Google Business reviews. Approve with one click or enable auto-send. $175/mo.",
  keywords:
    "google review management, reply to google reviews, google business profile management, review response software, local business reputation management, ai review replies, automate google reviews",
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
    title: "ReplyBase — AI Google Review Replies for Local Businesses",
    description:
      "ReplyBase automatically generates professional AI replies to your Google Business reviews. Approve with one click or enable auto-send. $175/mo.",
    type: "website",
    url: siteUrl,
    siteName: "ReplyBase",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ReplyBase — AI Google Review Replies for Local Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReplyBase — AI Google Review Replies for Local Businesses",
    description:
      "Automatically generate professional AI replies to your Google Business reviews. Approve with one click or enable auto-send.",
    images: [`${siteUrl}/og-image.png`],
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

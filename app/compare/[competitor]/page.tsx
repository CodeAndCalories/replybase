import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MINT = "#00E5CC";
const BG = "#050505";
const SURFACE = "rgba(255,255,255,0.03)";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#F0F0F0";
const MUTED = "#888";
const RED_MUTED = "rgba(248,113,113,0.85)";

interface CompetitorData {
  name: string;
  tagline: string;
  metaDescription: string;
  table: {
    price: string;
    aiReplies: string;
    aiRepliesPositive: boolean;
    autoSend: string;
    autoSendPositive: boolean;
    multiLocation: string;
    multiLocationPositive: boolean;
    setupTime: string;
    setupPositive: boolean;
    gbpFocus: string;
    gbpPositive: boolean;
  };
  switchReasons: { title: string; body: string }[];
  bestFor: string;
}

const COMPETITORS: Record<string, CompetitorData> = {
  "birdeye": {
    name: "Birdeye",
    tagline: "Enterprise review management built for large chains — not independent local businesses.",
    metaDescription: "Comparing ReplyBase vs Birdeye for local business review management? See why small businesses switch from Birdeye to ReplyBase — at a third of the price.",
    table: {
      price: "$299+/mo",
      aiReplies: "Template-based only",
      aiRepliesPositive: false,
      autoSend: "Add-on only",
      autoSendPositive: false,
      multiLocation: "Yes (enterprise tier)",
      multiLocationPositive: true,
      setupTime: "1–3 days",
      setupPositive: false,
      gbpFocus: "One of many platforms",
      gbpPositive: false,
    },
    switchReasons: [
      {
        title: "Birdeye costs 3× more — for features most local businesses don't use",
        body: "Birdeye starts at $299/month and quickly climbs higher with add-ons. The platform is packed with enterprise features — sentiment dashboards, survey tools, social listening — that a restaurant owner or plumber doesn't need. ReplyBase does one thing exceptionally well at $99/month.",
      },
      {
        title: "Birdeye's setup takes days, not minutes",
        body: "Birdeye requires onboarding calls, account configuration, and platform training before you can start responding to reviews. ReplyBase connects to your Google Business Profile in under 2 minutes and starts generating replies immediately — no calls, no demos, no waiting.",
      },
      {
        title: "Birdeye wasn't built specifically for Google Business Profile replies",
        body: "Birdeye aggregates reviews from dozens of platforms. That breadth comes at the cost of depth — the Google-specific reply features that actually move your local search ranking are an afterthought. ReplyBase is built from the ground up for Google Business Profile, so every feature serves that specific purpose.",
      },
    ],
    bestFor: "Birdeye works best for enterprise brands managing reviews across 50+ locations with a dedicated marketing team and budget to match. For independent local businesses, it's significant overkill.",
  },

  "podium": {
    name: "Podium",
    tagline: "A messaging and payments platform that added review management — not the other way around.",
    metaDescription: "ReplyBase vs Podium for Google review management. See why local businesses switching from Podium to ReplyBase save $150+/mo and get better review reply automation.",
    table: {
      price: "$249–399/mo",
      aiReplies: "Limited AI replies",
      aiRepliesPositive: false,
      autoSend: "No auto-send",
      autoSendPositive: false,
      multiLocation: "Yes",
      multiLocationPositive: true,
      setupTime: "1–2 days",
      setupPositive: false,
      gbpFocus: "Messaging-first product",
      gbpPositive: false,
    },
    switchReasons: [
      {
        title: "Podium charges 2–4× more for a product centered on SMS, not reviews",
        body: "Podium's core product is two-way text messaging and payments — review management is a secondary feature built on top. You're paying for a full messaging platform whether you use it or not. If Google review replies are your priority, you're overpaying significantly.",
      },
      {
        title: "Podium has no AI auto-send for Google review replies",
        body: "Podium can help you collect reviews, but it doesn't auto-generate and send thoughtful, specific replies to every incoming review. ReplyBase does exactly that — reading each review and sending a contextually appropriate response without any manual work on your end.",
      },
      {
        title: "Most local businesses only need the review part of what Podium sells",
        body: "Web chat, SMS campaigns, contactless payments — Podium bundles a lot of tools that many local business owners simply won't use. ReplyBase charges only for what you actually need: professional AI replies to every Google review your business receives.",
      },
    ],
    bestFor: "Podium works well for businesses that genuinely need two-way SMS communication with customers alongside review management. If SMS messaging isn't a workflow you're building, you're paying for features you'll never touch.",
  },

  "grade-us": {
    name: "Grade.us",
    tagline: "A review generation tool — useful for getting reviews, but not built for replying to them.",
    metaDescription: "ReplyBase vs Grade.us compared. Grade.us focuses on review generation; ReplyBase focuses on AI-powered review replies. See which is right for your business.",
    table: {
      price: "$110+/mo",
      aiReplies: "No AI reply generation",
      aiRepliesPositive: false,
      autoSend: "No",
      autoSendPositive: false,
      multiLocation: "Add-on pricing",
      multiLocationPositive: false,
      setupTime: "~30 minutes",
      setupPositive: true,
      gbpFocus: "Review generation focus",
      gbpPositive: false,
    },
    switchReasons: [
      {
        title: "Grade.us helps you get reviews — it doesn't help you respond to them",
        body: "Grade.us is primarily a review generation and monitoring tool. It's good at helping you ask customers for reviews via email and SMS campaigns. But once those reviews arrive, you're on your own — there's no AI reply generation, no auto-send, no way to close the loop at scale.",
      },
      {
        title: "Manual replies defeat the purpose of automation",
        body: "With Grade.us, you still need to sit down and write every review response yourself. For a business receiving 20–30 reviews per month, that's hours of work. ReplyBase eliminates that entirely — every review gets a professional, specific AI-generated reply that sounds like you wrote it.",
      },
      {
        title: "ReplyBase handles both sides of the review equation",
        body: "Getting reviews matters. But responding to reviews is what improves your Google Maps ranking and converts profile visitors into customers. ReplyBase makes the response side — the side most businesses neglect — completely automatic. You can have both: a tool that generates reviews and one that replies to them, for less than Grade.us alone.",
      },
    ],
    bestFor: "Grade.us is the right choice if review generation campaigns are your primary focus and you have the team bandwidth to respond to reviews manually. If you need replies automated, you'll need a different tool.",
  },

  "reviewtrackers": {
    name: "ReviewTrackers",
    tagline: "An analytics and reporting platform — great for tracking reviews, not for replying to them automatically.",
    metaDescription: "ReplyBase vs ReviewTrackers compared. ReviewTrackers is an analytics tool; ReplyBase is an AI reply tool. Find out which fits your business needs.",
    table: {
      price: "$119+/mo",
      aiReplies: "No AI reply generation",
      aiRepliesPositive: false,
      autoSend: "No auto-send",
      autoSendPositive: false,
      multiLocation: "Yes (enterprise)",
      multiLocationPositive: true,
      setupTime: "Several days",
      setupPositive: false,
      gbpFocus: "Analytics and reporting first",
      gbpPositive: false,
    },
    switchReasons: [
      {
        title: "ReviewTrackers tracks your reviews — it doesn't reply to them for you",
        body: "ReviewTrackers excels at aggregating review data, showing sentiment trends, and generating reports across locations. But it doesn't generate AI replies or auto-send responses. You still need to write every reply manually, which is where most businesses fall behind.",
      },
      {
        title: "You're paying for dashboards, not outcomes",
        body: "Knowing that your average rating dropped 0.2 points last month is interesting. Having every review automatically answered with a professional reply is what actually fixes it. ReplyBase focuses on the action, not the analysis — and for most local businesses, the action is what moves the needle.",
      },
      {
        title: "ReviewTrackers is built for marketing teams, not business owners",
        body: "The platform's strength is its reporting infrastructure — useful if you have a marketing analyst who needs to present review data to stakeholders. Most local business owners don't need that layer of complexity. They need reviews handled without adding to their workload.",
      },
    ],
    bestFor: "ReviewTrackers is the right tool for multi-location brands with marketing teams who need centralized review analytics and reporting. For independent businesses that want replies automated, it's the wrong tool for the job.",
  },

  "reputation-com": {
    name: "Reputation.com",
    tagline: "An enterprise reputation management platform priced and built for large organizations.",
    metaDescription: "ReplyBase vs Reputation.com (Reputation) compared. Enterprise pricing vs $99/mo. See why local businesses choose ReplyBase over Reputation.com.",
    table: {
      price: "$500+/mo (enterprise)",
      aiReplies: "Yes (enterprise add-on)",
      aiRepliesPositive: true,
      autoSend: "Enterprise plans only",
      autoSendPositive: false,
      multiLocation: "Yes",
      multiLocationPositive: true,
      setupTime: "Weeks",
      setupPositive: false,
      gbpFocus: "Multi-platform enterprise tool",
      gbpPositive: false,
    },
    switchReasons: [
      {
        title: "Reputation.com is priced for enterprise — starting at $500+/month",
        body: "Reputation.com (now Reputation) targets large brands, franchises, and healthcare systems with enterprise contracts. The pricing structure, onboarding timeline, and contract requirements are designed for organizations with dedicated reputation management teams and large budgets — not independent local businesses.",
      },
      {
        title: "Setup takes weeks, not minutes",
        body: "Getting Reputation.com configured for your business involves enterprise onboarding, account setup, and platform training that can take several weeks from contract signing to active use. ReplyBase takes 2 minutes to connect and starts working immediately — no contract, no onboarding calls.",
      },
      {
        title: "Most of the platform is irrelevant for single-location businesses",
        body: "Reputation.com includes competitor benchmarking, customer experience scoring, operational insights, and enterprise reporting — features built for chains with hundreds of locations and dedicated operations teams. A restaurant owner or contractor doesn't need any of that. They need their Google reviews answered professionally and automatically.",
      },
    ],
    bestFor: "Reputation.com serves large enterprise clients — healthcare networks, auto dealer groups, franchise systems — with the budget and operational structure to fully leverage an enterprise platform. It's not the right fit for local businesses.",
  },

  "yext": {
    name: "Yext",
    tagline: "A listings management platform that treats review replies as a secondary feature.",
    metaDescription: "ReplyBase vs Yext for Google review management. Yext starts at $499/mo for listings. ReplyBase is $99/mo built specifically for review replies.",
    table: {
      price: "$499+/mo",
      aiReplies: "Limited — not the core product",
      aiRepliesPositive: false,
      autoSend: "No auto-send",
      autoSendPositive: false,
      multiLocation: "Yes",
      multiLocationPositive: true,
      setupTime: "Days",
      setupPositive: false,
      gbpFocus: "Listings management first",
      gbpPositive: false,
    },
    switchReasons: [
      {
        title: "Yext costs 5× more because it's primarily a listings tool",
        body: "Yext's core value proposition is syncing your business information (name, address, hours) across dozens of directories. Review management was added later and isn't the primary focus. You'd be paying $499+/month for a listings platform to get a review feature that's not best-in-class.",
      },
      {
        title: "Yext doesn't auto-generate or auto-send AI review replies",
        body: "Yext can notify you when reviews arrive and provide a response interface, but it doesn't generate AI replies automatically or send them without your manual action. Every review still requires manual effort — the exact problem ReplyBase was built to eliminate.",
      },
      {
        title: "The platform complexity adds overhead without adding value for review management",
        body: "Yext is a powerful platform for enterprises managing listings at scale. That power comes with complexity — dashboards, integrations, training, and a learning curve that doesn't serve a business owner who just needs Google reviews answered consistently and professionally.",
      },
    ],
    bestFor: "Yext is a strong choice for businesses where directory listing accuracy across dozens of platforms is a critical business problem. If you already have listings sorted and just need Google reviews handled, Yext is significant overkill.",
  },

  "broadly": {
    name: "Broadly",
    tagline: "A local business communication platform — web chat, SMS, and reviews bundled together.",
    metaDescription: "ReplyBase vs Broadly compared. Broadly bundles reviews with web chat and SMS at $149–299/mo. ReplyBase focuses entirely on AI Google review replies at $99/mo.",
    table: {
      price: "$149–299/mo",
      aiReplies: "No AI reply generation",
      aiRepliesPositive: false,
      autoSend: "No",
      autoSendPositive: false,
      multiLocation: "Add-on pricing",
      multiLocationPositive: false,
      setupTime: "Several hours",
      setupPositive: false,
      gbpFocus: "Multi-channel communication tool",
      gbpPositive: false,
    },
    switchReasons: [
      {
        title: "Broadly bundles tools together — you pay for web chat and SMS even if you don't use them",
        body: "Broadly combines web chat, SMS campaigns, appointment reminders, and review management into a single platform. It's a reasonable bundle for some businesses — but if Google review replies are your main need, you're paying for significant overhead that doesn't serve that specific goal.",
      },
      {
        title: "Broadly has no AI-generated replies — every response is still manual",
        body: "Broadly can alert you to new reviews and provide a convenient place to respond, but it doesn't generate the replies for you. The time cost of writing individual review responses remains the same. ReplyBase eliminates that cost entirely with AI that reads each review and writes a specific, professional response.",
      },
      {
        title: "More tools means more complexity — and more things that can go wrong",
        body: "A platform that covers six different communication channels requires more configuration, more maintenance, and more ongoing management than a focused tool. ReplyBase does one thing — handles your Google review replies — and it does it so well that the whole problem goes away in minutes.",
      },
    ],
    bestFor: "Broadly is a reasonable fit for local businesses that genuinely need a unified communication hub: web chat, two-way SMS, and review management together. If reviews are the primary need, the added complexity and cost aren't justified.",
  },

  "vendasta": {
    name: "Vendasta",
    tagline: "A white-label platform sold through marketing agencies — not directly to local businesses.",
    metaDescription: "ReplyBase vs Vendasta for review management. Vendasta is an agency reseller platform. ReplyBase is a direct-to-business tool at $99/mo with no agency markup.",
    table: {
      price: "Agency pricing (variable)",
      aiReplies: "Partial — varies by reseller",
      aiRepliesPositive: false,
      autoSend: "No direct auto-send",
      autoSendPositive: false,
      multiLocation: "Yes (agency model)",
      multiLocationPositive: true,
      setupTime: "Days (agency setup required)",
      setupPositive: false,
      gbpFocus: "White-label multi-tool platform",
      gbpPositive: false,
    },
    switchReasons: [
      {
        title: "Vendasta is sold through agencies — you're paying a markup on top of the platform cost",
        body: "Vendasta doesn't sell directly to local businesses. It sells to marketing agencies and resellers who then package and resell the tools to their clients. If you're accessing Vendasta features through an agency, you're paying the agency's markup on top of the platform cost — often significantly more than the $99/month you'd pay directly for ReplyBase.",
      },
      {
        title: "The feature set is determined by your agency, not by your needs",
        body: "Because Vendasta is a white-label platform, what you actually get depends on how your agency has configured and packaged the tools. You may not have access to all features, or you may be paying for ones you don't need. ReplyBase gives every customer the same full product, directly.",
      },
      {
        title: "There's no direct support — you go through your agency for everything",
        body: "With a Vendasta-powered product, your support relationship is with your reseller agency, not the platform itself. If you need help or have a technical issue, you're in the agency's queue. ReplyBase provides direct support to every customer — no intermediary, no delay.",
      },
    ],
    bestFor: "Vendasta is the right infrastructure choice for marketing agencies building white-label service packages for local business clients. For local business owners who want to manage their own review replies directly, it's an unnecessarily complex path.",
  },
};

const TABLE_ROWS = [
  { key: "price" as const, label: "Monthly Price" },
  { key: "aiReplies" as const, label: "AI Reply Generation", positiveKey: "aiRepliesPositive" as const },
  { key: "autoSend" as const, label: "Auto-Send Replies", positiveKey: "autoSendPositive" as const },
  { key: "multiLocation" as const, label: "Multi-Location", positiveKey: "multiLocationPositive" as const },
  { key: "setupTime" as const, label: "Setup Time", positiveKey: "setupPositive" as const },
  { key: "gbpFocus" as const, label: "Google Business Profile Focus", positiveKey: "gbpPositive" as const },
];

const REPLYBASE_VALUES = {
  price: "$99/mo",
  aiReplies: "✓ Yes — every review",
  autoSend: "✓ Yes — configurable",
  multiLocation: "✓ Up to 3 locations",
  setupTime: "✓ 2 minutes",
  gbpFocus: "✓ Built specifically for GBP",
};

export async function generateStaticParams() {
  return Object.keys(COMPETITORS).map((competitor) => ({ competitor }));
}

export async function generateMetadata({
  params,
}: {
  params: { competitor: string };
}): Promise<Metadata> {
  const data = COMPETITORS[params.competitor];
  if (!data) return { title: "Not Found" };

  const title = `ReplyBase vs ${data.name}: Which Is Better for Local Businesses?`;
  return {
    title,
    description: data.metaDescription,
    keywords: [
      `${params.competitor} alternative`,
      `${data.name} alternative for local business`,
      `replybase vs ${data.name.toLowerCase()}`,
      `${data.name.toLowerCase()} competitor`,
      `google review management instead of ${data.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description: data.metaDescription,
      url: `https://www.replybasehq.com/compare/${params.competitor}`,
      siteName: "ReplyBase",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description: data.metaDescription },
    alternates: { canonical: `https://www.replybasehq.com/compare/${params.competitor}` },
  };
}

export default function ComparePage({ params }: { params: { competitor: string } }) {
  const data = COMPETITORS[params.competitor];
  if (!data) notFound();

  return (
    <>
      <div style={{ background: BG, minHeight: "100vh", color: TEXT }}>
        <Navbar />

        {/* Hero */}
        <section style={{ padding: "7rem 1.5rem 4rem", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: `${MINT}15`,
              border: `1px solid ${MINT}33`,
              borderRadius: 9999,
              padding: "0.3rem 0.875rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: MINT,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Comparison
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.875rem, 4.5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            ReplyBase vs {data.name}:{" "}
            <span style={{ color: MINT }}>The Honest Comparison</span>
          </h1>

          <p
            style={{
              fontSize: "1.0625rem",
              color: MUTED,
              lineHeight: 1.65,
              maxWidth: 600,
              margin: "0 auto 2.25rem",
            }}
          >
            {data.tagline}
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/signup"
              style={{
                display: "inline-block",
                background: MINT,
                color: "#000",
                fontWeight: 700,
                fontSize: "0.9375rem",
                padding: "0.875rem 2.25rem",
                borderRadius: 9999,
                textDecoration: "none",
              }}
            >
              Try ReplyBase Free
            </Link>
            <Link
              href="/compare"
              style={{
                display: "inline-block",
                background: SURFACE,
                color: TEXT,
                fontWeight: 600,
                fontSize: "0.9375rem",
                padding: "0.875rem 2.25rem",
                borderRadius: 9999,
                textDecoration: "none",
                border: `1px solid ${BORDER}`,
              }}
            >
              All Comparisons
            </Link>
          </div>
        </section>

        {/* Comparison Table */}
        <section style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
          <div
            style={{
              background: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              <div style={{ padding: "1.25rem 1.5rem" }} />
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  background: `${MINT}10`,
                  borderLeft: `1px solid ${MINT}33`,
                  borderRight: `1px solid ${MINT}33`,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    color: MINT,
                  }}
                >
                  ReplyBase
                </div>
                <div style={{ fontSize: "0.75rem", color: MUTED, marginTop: "0.25rem" }}>
                  Built for local GBP
                </div>
              </div>
              <div style={{ padding: "1.25rem 1.5rem", textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    color: TEXT,
                  }}
                >
                  {data.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: MUTED, marginTop: "0.25rem" }}>
                  Competitor
                </div>
              </div>
            </div>

            {/* Table rows */}
            {TABLE_ROWS.map((row, i) => {
              const compValue = data.table[row.key];
              const compPositive = row.positiveKey ? data.table[row.positiveKey] : true;
              const isLast = i === TABLE_ROWS.length - 1;

              return (
                <div
                  key={row.key}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    borderBottom: isLast ? "none" : `1px solid ${BORDER}`,
                  }}
                >
                  {/* Feature label */}
                  <div
                    style={{
                      padding: "1rem 1.5rem",
                      fontSize: "0.875rem",
                      color: TEXT,
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {row.label}
                  </div>

                  {/* ReplyBase value */}
                  <div
                    style={{
                      padding: "1rem 1.5rem",
                      background: `${MINT}06`,
                      borderLeft: `1px solid ${MINT}22`,
                      borderRight: `1px solid ${MINT}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.875rem",
                      color: MINT,
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    {REPLYBASE_VALUES[row.key]}
                  </div>

                  {/* Competitor value */}
                  <div
                    style={{
                      padding: "1rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.875rem",
                      color: compPositive === false ? RED_MUTED : MUTED,
                      textAlign: "center",
                    }}
                  >
                    {compValue}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why businesses switch */}
        <section style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
            }}
          >
            Why businesses switch from {data.name} to ReplyBase
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {data.switchReasons.map((reason, i) => (
              <div
                key={i}
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: "1.75rem",
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: `${MINT}18`,
                    border: `1px solid ${MINT}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    color: MINT,
                    fontWeight: 700,
                    marginTop: 2,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      marginBottom: "0.625rem",
                      color: TEXT,
                    }}
                  >
                    {reason.title}
                  </h3>
                  <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
                    {reason.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best for / context */}
        <section style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
          <div
            style={{
              background: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              padding: "1.75rem",
            }}
          >
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: MUTED,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.625rem",
              }}
            >
              To be fair
            </p>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                letterSpacing: "-0.01em",
              }}
            >
              Who is {data.name} actually best for?
            </h3>
            <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
              {data.bestFor}
            </p>
          </div>
        </section>

        {/* ReplyBase features summary */}
        <section style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            What you get with ReplyBase
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
          >
            {[
              { title: "AI replies to every review", body: "Every new Google review gets a professional, context-aware AI-generated reply that references what the reviewer actually wrote." },
              { title: "Auto-send for positive reviews", body: "Enable auto-send for 4- and 5-star reviews so your response rate hits 100% without any manual effort." },
              { title: "2-minute setup", body: "Connect your Google Business Profile in under 2 minutes and your first reply is ready immediately. No calls, no demos, no onboarding." },
              { title: "$99/month flat", body: "One price, no add-ons, no per-location fees up to 3 locations. Cancel anytime — no enterprise contracts." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 14,
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    marginBottom: "0.625rem",
                  }}
                >
                  <span style={{ color: MINT, fontSize: "1rem" }}>✓</span>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: TEXT,
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p style={{ color: MUTED, fontSize: "0.8125rem", lineHeight: 1.65, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 1.5rem 7rem", textAlign: "center" }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${MINT}10 0%, rgba(124,106,255,0.08) 100%)`,
              border: `1px solid ${MINT}22`,
              borderRadius: 24,
              padding: "3rem 2rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.375rem, 3vw, 1.875rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "0.875rem",
              }}
            >
              Try ReplyBase free for 14 days
            </h2>
            <p
              style={{
                color: MUTED,
                fontSize: "1rem",
                lineHeight: 1.6,
                maxWidth: 440,
                margin: "0 auto 2rem",
              }}
            >
              Connect your Google Business Profile in 2 minutes. Every review answered automatically. No credit card required.
            </p>
            <Link
              href="/signup"
              style={{
                display: "inline-block",
                background: MINT,
                color: "#000",
                fontWeight: 700,
                fontSize: "0.9375rem",
                padding: "0.875rem 2.5rem",
                borderRadius: 9999,
                textDecoration: "none",
              }}
            >
              Start Free — No Credit Card
            </Link>
            <p style={{ color: MUTED, fontSize: "0.8125rem", marginTop: "1rem" }}>
              14-day free trial · Cancel anytime · No contracts
            </p>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .compare-table { font-size: 0.8125rem !important; }
        }
      `}</style>
    </>
  );
}

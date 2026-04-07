import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";
import Link from "next/link";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function WelcomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL!;

  let checkoutUrl: string | null = null;
  let failed = false;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: user.email,
      client_reference_id: user.id,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/dashboard`,
      cancel_url: `${siteUrl}/welcome`,
    });
    checkoutUrl = session.url;
  } catch (err) {
    console.error("Stripe checkout error on /welcome:", err);
    failed = true;
  }

  if (checkoutUrl) {
    redirect(checkoutUrl);
  }

  // Render loading state (shown briefly before redirect) or error state
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, #7c6aff 0%, #00d4aa 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            boxShadow: "0 0 24px rgba(124,106,255,0.35)",
          }}
        >
          ✦
        </div>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "1.125rem",
            color: "#f0f0f0",
            letterSpacing: "-0.02em",
          }}
        >
          ReplyBase
        </span>
      </div>

      {failed ? (
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#f87171",
              marginBottom: "0.5rem",
            }}
          >
            Something went wrong setting up your subscription.
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "1.5rem",
            }}
          >
            Please try again or contact support if the problem persists.
          </p>
          <Link
            href="/welcome"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.625rem 1.5rem",
              borderRadius: 9,
              background: "#7c6aff",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9375rem",
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(124,106,255,0.35)",
            }}
          >
            Try again
          </Link>
        </div>
      ) : (
        <p
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Setting up your subscription...
        </p>
      )}
    </main>
  );
}

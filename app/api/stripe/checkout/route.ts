import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const siteUrl = "https://replybasehq.com";

export async function POST(request: Request) {
  const { email, userId } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    customer_email: email,
    client_reference_id: userId,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/dashboard`,
    cancel_url: `${siteUrl}/`,
  });

  return NextResponse.json({ url: session.url });
}

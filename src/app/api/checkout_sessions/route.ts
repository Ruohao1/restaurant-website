import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    // Get the full referer URL (which includes the language)
    const referer = req.headers.get("referer");

    if (!referer) {
      throw new Error("Referer header is missing");
    }

    // Parse the referer URL to extract the language and full path
    const origin = new URL(referer).href;

    // Proceed with your Stripe session creation
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1QAZQKQ2SW4hLeeitkC5o1sJ", // Replace with your actual Stripe Price ID
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/?success=true`, // Keeps the same route with the language
      cancel_url: `${origin}/?canceled=true`, // Keeps the same route with the language
    });

    return NextResponse.json({ url: session.url });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
    });
  }
}

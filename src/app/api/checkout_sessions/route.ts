import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  console.log("Creating a new Checkout Session...");
  console.log("Request:", req);
  try {
    const origin = req.headers.get("origin");

    if (!origin) {
      throw new Error("Origin is not available.");
    }

    // Create Checkout Session with Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1QAZQKQ2SW4hLeeitkC5o1sJ", // Replace with your actual Price ID
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });

    // Redirect to the Stripe Checkout page
    return new NextResponse(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Return a proper error message
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
    });
  }
}

// Add support for method restrictions (like 'POST' only)
export async function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("referer");
    if (!origin) {
      throw new Error("Origin header is missing");
    }

    // Parse the request body as JSON
    const cart = await req.json();

    // Log the cart to ensure it has the correct structure and values
    console.log("Cart received for session creation:", cart);

    const lineItems = cart.map(
      (item: { stripe_price_id: string; quantity: number }) => {
        console.log("Line item being processed:", item); // Debug log
        return {
          price: item.stripe_price_id,
          quantity: item.quantity,
        };
      }
    );

    console.log("Line items for session creation:", lineItems); // Debug log

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error creating checkout session:", {
      message: err.message,
      raw: err.raw,
    });
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
    });
  }
}

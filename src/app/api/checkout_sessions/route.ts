import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    // Parse the body from the request
    const origin = req.nextUrl;

    console.log(origin);

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID of the product you want to sell
          price: "price_1QAZQKQ2SW4hLeeitkC5o1sJ",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/canceled`,
    });

    // Redirect to the Stripe Checkout page
    return NextResponse.redirect(session.url!, 303);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Handle errors
    return new NextResponse(err.message, { status: err.statusCode || 500 });
  }
}

import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!
);

export async function POST(req: Request) {
  try {
    const { foodItems } = await req.json();

    interface FoodItem {
      food_name: string;
      food_price: number;
      quantity: number;
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = foodItems.map((item: FoodItem) => ({
      price_data: {
      currency: 'usd',
      product_data: {
        name: item.food_name,
      },
      unit_amount: Math.round(item.food_price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    // Optionally, save the order to the database
    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ statusCode: 500, message: err });
  }
}

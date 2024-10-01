import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { foodItems } = req.body; // Expect an array of food items with their quantities

    interface FoodItem {
      food_name: string;
      food_price: number;
      quantity: number;
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      foodItems.map((item: FoodItem) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.food_name,
          },
          unit_amount: Math.round(item.food_price * 100),
        },
        quantity: item.quantity,
      }));

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

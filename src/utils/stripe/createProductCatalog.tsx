import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function getMenuComposition(menuId: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("menu_food")
    .select(
      `food (
          name
          ),
        food_types (
          title
        ),
          quantity
          `
    )
    .eq("menu_id", menuId);

  if (error) {
    console.error(error);
    return "";
  }

  if (data.length === 0) {
    return "";
  }

  const composition = data
    .map((item) => {
      const name = item.food ? item.food.name : item.food_types?.title;
      return item.quantity + " " + name;
    })
    .reduce((acc, curr) => acc + ", " + curr);

  return composition;
}

const createProductCatalog = async () => {
  const supabase = createClient();

  const { error: authError } = await supabase.auth.signInWithPassword({
    email: "ruohaolin@gmail.com",
    password: "admin123",
  });

  if (authError) {
    throw authError;
  }

  const { data: menus, error: fetchError } = await supabase
    .from("menu")
    .select("*");

  if (fetchError) {
    throw fetchError;
  }

  for (const menu of menus) {
    try {
      // Log the menu for debugging
      console.log(menu);

      const description = async () => {
        const tmp = menu.description ? "\n" + menu.description : "";
        const res = await getMenuComposition(menu.id);
        return res + tmp;
      };

      // Create a product in Stripe
      const product = await stripe.products.create({
        name: menu.name,
        description: await description(),
        images: menu.image ? [menu.image] : undefined,
      });

      console.log("Created Stripe Product:", product);

      // Create a price for the product
      const price = await stripe.prices.create({
        unit_amount: Math.round(menu.price * 100), // Stripe expects the price in cents
        currency: "eur",
        product: product.id,
      });

      console.log("Created Stripe Price:", price);

      // Update the menu with the Stripe price ID in Supabase
      const { error: updateError } = await supabase
        .from("menu")
        .update({ stripe_price_id: price.id })
        .eq("id", menu.id);

      if (updateError) {
        throw updateError; // Handle the error properly
      }

      console.log(
        `Updated Supabase menu ID ${menu.id} with Stripe price ID ${price.id}`
      );
    } catch (err) {
      console.error(`Error processing menu item ${menu.id}:`, err);
    }
  }
};

export default createProductCatalog;

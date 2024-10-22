import { createClient } from "@/utils/supabase/server";

export async function getFood(foodId: number) {
  const supabase = createClient();

  const { data, error } = await supabase.from("food").select().eq("id", foodId);
  if (error) {
    console.error(error);
    return {};
  }

  return { data: data[0] };
}

export async function getMenusByCategory(): Promise<{ data: Category[] }> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("menu_categories")
    .select(
      `
        id,
        title,
        menu (
          id,
          code,
          name,
          description,
          price,
          image,
          stripe_price_id
        )
      `
    )
    .neq("id", 1);
  if (error) {
    console.error(error);
    return { data: [] } as { data: Category[] };
  }

  return { data };
}

export async function getMenuComposition(menuId: number) {
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

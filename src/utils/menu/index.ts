import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getFood(foodId: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("food")
    .select()
    .eq("food_id", foodId);
  if (error) {
    console.error(error);
    return {};
  }

  return { data: data[0] };
}

export async function getMenusByCategory() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("menu_categories")
    .select(
      `
        category_id,
        category_letter,
        category_title,
        menu (
          menu_id,
          menu_code,
          menu_name,
          menu_description,
          menu_price,
          menu_image,
          menu_food (
            quantity,
            food (
              food_id,
              food_name,
              food_image
            ),
            food_types (
              type_title
            )
          )
        )
      `
    )
    .neq("category_id", 1);
  if (error) {
    console.error(error);
    return { data: [] };
  }

  return { data };
}

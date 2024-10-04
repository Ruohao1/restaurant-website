import { pluralize } from "./string";
import { TFunction } from "i18next";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getComposition(menuId: number, t: TFunction<any, any>) {
  const composition = menu.menu_food
    .map((menuFood: MenuFood) => {
      const quantity =
        typeof menuFood.quantity === "number" ||
        typeof menuFood.quantity === "string"
          ? menuFood.quantity
          : "Unknown Quantity";

      const foodName =
        quantity === 1
          ? typeof menuFood.food?.food_name === "string"
            ? menuFood.food.food_name
            : t(`${menuFood.food_types?.type_title}`)
          : typeof menuFood.food?.food_name === "string"
          ? pluralize(menuFood.food.food_name)
          : pluralize(t(`${menuFood.food_types?.type_title}`));

      return `${quantity} ${foodName.toLowerCase()}`;
    })
    .join(", ");

  return composition;
}

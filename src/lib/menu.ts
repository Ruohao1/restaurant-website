import { createClient } from "@/utils/supabase/server";

export const getMenuCategories = async () => {
  const supabase = await createClient();
  const { data: categories, error } = await supabase.from("menu_categories")
    .select(`
            id,
            title,
            menu (
                id,
                code,
                name, 
                description,
                menu_food (
                    food_id,
                    food_type_id,
                    quantity
                ),
                price,
                image,
                stripe_price_id
            )
            `);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return categories;
};

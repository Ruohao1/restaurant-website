import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getFood(foodId: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("food").select().eq("id", foodId);
  if (error) {
    console.error(error);
    return {};
  }

  return { data: data[0] };
}

export async function getMenusByCategory(): Promise<{ data: Category[] }> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
          image
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

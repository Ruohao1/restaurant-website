import { useTranslation } from "@/app/i18n";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Tables } from "@/utils/supabase/database.types";
interface MenuPageProps {
  params: {
    lng: string;
  };
}

const getMenusByCategory = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Query to fetch menus with their associated food
  // const { data, error } = await supabase.from("menu").select(`
  //   menu_id,
  //   menu_name,
  //   menu_description,
  //   menu_price,
  //   menu_food (
  //     quantity,
  //     food (
  //       food_id,
  //       food_name,
  //       food_description,
  //       food_price,
  //       food_image,
  //       food_types (
  //         type_title
  //       )
  //     )
  //   )
  // `);

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
};

const MenuPage: React.FC<MenuPageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);
  const { data: categories } = await getMenusByCategory();

  return (
    <div className="flex justify-center mx-10">
      <div>
        {categories.map((category) => (
          <div key={`category-${category.category_id}`} className="mb-10">
            <h1>
              {category.category_title && t(`${category.category_title}`)}
            </h1>
            {category.menu.map((menu) => (
              <div key={`menu-${menu.menu_id}`}>
                <div className="flex justify-between">
                  <div>
                    <h1>
                      {menu.menu_code
                        ? `${menu.menu_code} - ${menu.menu_name}`
                        : menu.menu_name}{" "}
                    </h1>
                  </div>
                  <div>
                    <p>{menu.menu_price}€</p>
                  </div>
                </div>
                <div className="px-5">
                  <div className="flex">
                    {menu.menu_food
                      .map((menuFood) => {
                        // Ensure quantity is a number or string
                        const quantity =
                          typeof menuFood.quantity === "number" ||
                          typeof menuFood.quantity === "string"
                            ? menuFood.quantity
                            : "Unknown Quantity";

                        // Safely accessing food_name and food_types?.type_title
                        const foodName =
                          typeof menuFood.food?.food_name === "string"
                            ? menuFood.food.food_name
                            : t(`${menuFood.food_types?.type_title}`);

                        return `${quantity} ${foodName.toLowerCase()}`;
                      })
                      .join(", ")}
                  </div>
                  <div>
                    {menu.menu_description && t(`${menu.menu_description}`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;

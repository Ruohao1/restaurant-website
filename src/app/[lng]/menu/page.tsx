import { useTranslation } from "@/app/i18n";
import { pluralize } from "@/utils/string";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface MenuPageProps {
  params: {
    lng: string;
  };
}

const getMenusByCategory = async () => {
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
    <div className="flex justify-center mx-4 sm:mx-10 my-8">
      <div className="w-full max-w-5xl">
        {categories.map((category) => (
          <div key={`category-${category.category_id}`} className="mb-16">
            {/* Category Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
              {category.category_title && t(`${category.category_title}`)}
            </h1>

            {/* Menu Items */}
            {category.menu.map((menu) => (
              <div key={`menu-${menu.menu_id}`} className="mb-10">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    {menu.menu_code
                      ? `${menu.menu_code} - ${menu.menu_name}`
                      : menu.menu_name}{" "}
                  </h2>
                  <p className="text-lg font-semibold text-gray-900">
                    {menu.menu_price}€
                  </p>
                </div>

                {/* Menu Foods */}
                <div className="pl-5">
                  <div className="text-gray-600 text-sm mb-3">
                    {menu.menu_food
                      .map((menuFood) => {
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
                            : pluralize(
                                t(`${menuFood.food_types?.type_title}`)
                              );
                        return `${quantity} ${foodName.toLowerCase()}`;
                      })
                      .join(", ")}
                  </div>

                  {/* Menu Description */}
                  {menu.menu_description && (
                    <div className="text-gray-500 italic">
                      {t(`${menu.menu_description}`)}
                    </div>
                  )}
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

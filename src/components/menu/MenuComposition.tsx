import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FoodCard from "./FoodCard";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { useTranslation } from "@/app/i18n";
import { pluralize } from "@/utils/menu/string";

interface CompositionProps {
  menuId: number;
  lng: string;
}

const MenuComposition: React.FC<CompositionProps> = async ({ menuId, lng }) => {
  const { t } = await useTranslation(lng);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: menuData, error } = await supabase
    .from("menu")
    .select(
      `
      menu_id,
      menu_name,
      menu_food (
        quantity,
        food (
          food_id,
          food_name
        ),
        food_types (
          type_id,
          type_title
        )
      )
      `
    )
    .eq("menu_id", menuId);
  if (error) {
    console.error(error);
    return <></>;
  }

  const menu = menuData[0];

  const composition = menu.menu_food.map((menuFood) => {
    return {
      quantity: menuFood.quantity,
      // define food if it's not null
      food: menuFood.food && {
        foodId: menuFood.food.food_id,
        foodName: menuFood.food.food_name.toLowerCase(),
      },
      // define food type if it's not null
      foodType: menuFood.food_types && {
        typeId: menuFood.food_types.type_id,
        typeTitle: menuFood.food_types.type_title.toLowerCase(),
      },
    };
  });

  return (
    <div>
      {composition.length > 0 &&
        composition
          .map((item, index) => {
            return (
              <Popover key={index}>
                <PopoverTrigger>
                  <span className="underline cursor-pointer">
                    {item.quantity}{" "}
                    {t(
                      `${
                        item.quantity > 1
                          ? (item.food && pluralize(item.food?.foodName)) ||
                            (item.foodType &&
                              pluralize(item.foodType?.typeTitle))
                          : item.food?.foodName || item.foodType?.typeTitle
                      }`
                    )}
                  </span>
                </PopoverTrigger>
                <PopoverContent>
                  {(item.food && (
                    <FoodCard foodId={item.food.foodId!} lng={lng} />
                  )) || <div>TypeCard</div>}
                </PopoverContent>
              </Popover>
            );
          })
          .reduce((prev, curr) => (
            <>
              {prev}
              {", "}
              {curr}
            </>
          ))}
    </div>
  );
};

export default MenuComposition;

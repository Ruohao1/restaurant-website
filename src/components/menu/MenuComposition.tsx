import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FoodCard from "./FoodCard";
import { pluralize } from "@/utils/menu/string";
import { useTranslation } from "@/app/i18n";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface CompositionProps {
  menuId: number;
  lng: string;
}

const MenuComposition: React.FC<CompositionProps> = async ({ menuId, lng }) => {
  const { t } = await useTranslation(lng);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: menu, error } = await supabase
    .from("menu_food")
    .select(
      `
    quantity,
    food (
      id,
      name
      ),
    food_types (
      id,
      title
    )
    `
    )
    .eq("menu_id", menuId);

  if (error) {
    console.error("Error fetching menu composition", error);
    return <></>;
  }

  const composition = menu.map((item) => {
    return {
      quantity: item.quantity,
      // define food if it's not null
      food: item.food && {
        foodId: item.food.id,
        foodName: item.food.name.toLowerCase(),
      },
      // define food type if it's not null
      foodType: item.food_types && {
        typeId: item.food_types.id,
        typeTitle: item.food_types.title.toLowerCase(),
      },
    };
  });

  if (!composition || composition.length === 0) {
    return <></>;
  }

  return (
    <div>
      {composition
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
                          (item.foodType && pluralize(item.foodType?.typeTitle))
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
//   import FoodCard from "./FoodCard";
import { pluralize } from "@/lib/utils";
// import { useTranslations } from "next-intl";

interface CompositionProps {
  menuFood: {
    food: {
      id: number;
      name: string;
    } | null;
    food_types: {
      id: number;
      title: string;
    } | null;
    quantity: number;
  }[];
}

const MenuComposition: React.FC<CompositionProps> = ({ menuFood }) => {
  // const t = useTranslations();

  const composition = menuFood.map((item) => {
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
                  {/* {t(
                    `${
                      item.quantity > 1
                        ? (item.food && pluralize(item.food?.foodName)) ||
                          (item.foodType && pluralize(item.foodType?.typeTitle))
                        : item.food?.foodName || item.foodType?.typeTitle
                    }`
                  )} */}
                  {item.quantity > 1
                    ? (item.food && pluralize(item.food?.foodName)) ||
                      (item.foodType && pluralize(item.foodType?.typeTitle))
                    : item.food?.foodName || item.foodType?.typeTitle}
                </span>
              </PopoverTrigger>
              <PopoverContent>
                {/* {(item.food && (
                  <FoodCard foodId={item.food.foodId!} lng={lng} />
                )) || <div>TypeCard</div>} */}
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

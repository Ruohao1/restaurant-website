import Image from "next/image";
import MenuComposition from "./MenuComposition";
import { cn } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

interface MenuCardProps {
  menu: {
    id: number;
    code: string | null;
    name: string;
    description: string | null;
    menu_food: {
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
    price: number;
    image: string | null;
    stripe_price_id: string | null;
  };
  className?: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, className }) => {
  return (
    <div
      className={cn(
        "border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col relative",
        className
      )}
    >
      {/* Menu Image */}
      {menu.image && (
        <div className="relative w-full h-48">
          <Image
            src={menu.image ? `/food/${menu.image}` : "/placeholder.jpg"}
            alt={menu.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Menu Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Menu Name and Price */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            {menu.code ? `${menu.code} - ${menu.name}` : menu.name}
          </h2>
          <p className="text-lg font-bold text-teal-600">{menu.price}€</p>
        </div>

        {/* Menu Composition */}
        {menu.menu_food && (
          <div className="mb-2 text-sm text-gray-600">
            <MenuComposition menuFood={menu.menu_food} />
          </div>
        )}

        {/* Menu Description */}
        {menu.description && (
          <p className="text-gray-600 text-sm mb-4">{menu.description}</p>
        )}

        {/* Add to Cart Button */}
        <div className="absolute bottom-4 right-4">
          <AddToCartButton menu={menu} />
        </div>
      </div>
    </div>
  );
};

export default MenuCard;

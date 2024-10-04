import { useTranslation } from "@/app/i18n";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import MenuComposition from "./MenuComposition";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "@heroicons/react/outline"; // Import the cart icon

interface MenuCardProps {
  menuId: number;
  lng: string;
  className?: string;
}

const MenuCard: React.FC<MenuCardProps> = async ({
  menuId,
  lng,
  className,
}) => {
  const { t } = await useTranslation(lng);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: menuData, error } = await supabase
    .from("menu")
    .select(
      `
      menu_id,
      menu_code,
      menu_name,
      menu_price,
      menu_description,
      menu_image,
      menu_food (
        food (
          food_id
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

  return (
    <div
      className={cn(
        "border rounded-lg shadow-md overflow-hidden lg:flex relative", // Added 'relative' for positioning
        className
      )}
    >
      {/* Menu Image */}
      {menu.menu_image && (
        <div className="relative w-full lg:w-48 h-48">
          <Image
            src={
              menu.menu_image ? `/food/${menu.menu_image}` : "/placeholder.jpg"
            }
            alt={menu.menu_name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Menu Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Menu Name and Price */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {menu.menu_code
              ? `${menu.menu_code} - ${menu.menu_name}`
              : menu.menu_name}
          </h2>
          <p className="text-lg font-bold text-gray-600">{menu.menu_price}€</p>
        </div>

        <div className="flex-1 pr-16">
          {" "}
          {/* This div takes up the remaining space */}
          {/* Menu Composition */}
          {menu.menu_id && (
            <div className="mb-2">
              <MenuComposition menuId={menu.menu_id} lng={lng} />
            </div>
          )}
          {/* Menu Description */}
          {menu.menu_description && (
            <div className="text-gray-600 mb-4">
              {t(`${menu.menu_description}`)}
            </div>
          )}
        </div>

        {/* Action Button - positioned absolutely */}
        <div className="absolute bottom-4 right-4">
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            aria-label="Add to cart"
          >
            <ShoppingCartIcon className="h-5 w-5" /> {/* Cart Icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;

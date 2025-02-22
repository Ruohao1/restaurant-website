import { useTranslation } from "@/app/i18n";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import MenuComposition from "./MenuComposition";
import { cn } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

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

  const supabase = createClient();
  const { data: menuData, error } = await supabase
    .from("menu")
    .select(
      `
      id,
      code,
      name,
      price,
      description,
      image,
      stripe_price_id
    `
    )
    .eq("id", menuId);

  if (error) {
    console.error("Error fetching menu data", error);
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
      {menu.image && (
        <div className="relative w-full lg:w-48 h-48">
          <Image
            src={menu.image ? `/food/${menu.image}` : "/placeholder.jpg"}
            alt={menu.name}
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
            {menu.code ? `${menu.code} - ${menu.name}` : menu.name}
          </h2>
          <p className="text-lg font-bold text-gray-600">{menu.price}€</p>
        </div>

        <div className="flex-1 pr-16">
          {" "}
          {/* This div takes up the remaining space */}
          {/* Menu Composition */}
          {menu.id && (
            <div className="mb-2">
              <MenuComposition menuId={menu.id} lng={lng} />
            </div>
          )}
          {/* Menu Description */}
          {menu.description && (
            <div className="text-gray-600 mb-4">{t(`${menu.description}`)}</div>
          )}
        </div>

        {/* Action Button - positioned absolutely */}
        <div className="absolute bottom-4 right-4">
          <AddToCartButton product={menu} />
        </div>
      </div>
    </div>
  );
};

export default MenuCard;

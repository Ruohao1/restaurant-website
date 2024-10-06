import { useTranslation } from "@/app/i18n";
import MenuCard from "@/components/menu/MenuCard";
import { getMenusByCategory } from "@/utils/menu";
import { HEADER_HEIGHT } from "@/constants/components/header";
import Link from "next/link";

interface MenuPageProps {
  params: {
    lng: string;
  };
}

const MenuPage: React.FC<MenuPageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);
  const { data: categories } = await getMenusByCategory();

  const inset = { top: `${HEADER_HEIGHT}` };

  return (
    <div className={`p-4 mt-${inset.top}`}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            {t("menu.title")}
            <p>
              <Link href={`/${lng}/cart`}>Cart</Link>
            </p>
          </h1>
        </div>

        {/* Menu Categories */}
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={`category-${category.category_id}`} className="p-4">
              {/* Category Title */}
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {category.category_title && t(`${category.category_title}`)}
              </h2>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 gap-6">
                {category.menu.map((menu) => (
                  <div key={`menu-${menu.menu_id}`}>
                    <MenuCard menuId={menu.menu_id} lng={lng} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

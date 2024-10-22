import { useTranslation } from "@/app/i18n";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the CategoryTab component
const DynamicCategoryTab = dynamic(
  () => import("@/components/menu/CategoryTab"),
  {
    suspense: true, // Use Suspense to show fallback during loading
    ssr: false, // Disable SSR for this component to lazy-load it on the client side
  }
);

interface MenuPageProps {
  params: {
    lng: string;
  };
}

// Server-Side Rendered MenuPage Component
const MenuPage: React.FC<MenuPageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng); // Server-side translations

  const supabase = createClient();

  // Fetch categories from Supabase on the server
  const { data: categories, error } = await supabase
    .from("menu_categories")
    .select("*");

  if (error) {
    console.error(error);
  }

  if (!categories) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t("your_menu")}
        </h1>
        <Link
          href={`/${lng}/cart`}
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md text-lg font-medium hover:bg-blue-700 transition"
        >
          {t("Cart")}
        </Link>
      </div>

      {/* Tabs for Menu Categories */}
      <Tabs defaultValue={categories[0].title!} className="w-full">
        {/* Horizontal scrolling container for the tab list */}
        <div className="relative rounded-md overflow-x-auto overflow-y-hidden h-12 max-w-full bg-muted shadow-md">
          <TabsList className="flex justify-start items-center h-full w-max space-x-4 px-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.title!}
                className="px-4 py-2 text-sm md:text-base whitespace-nowrap font-semibold rounded-md hover:bg-blue-100 focus:bg-blue-200 transition-colors"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Lazy-load CategoryTab for each category */}
        <div className="mt-6">
          {categories.map((category) => (
            <TabsContent value={category.title!} key={category.id}>
              <React.Suspense fallback={<div>Loading category...</div>}>
                <DynamicCategoryTab categoryId={category.id} lng={lng} />
              </React.Suspense>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default MenuPage;

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
    suspense: true, // Use suspense to show fallback during loading
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
    <div>
      <div>
        <h1>{t("your_menu")}</h1>
      </div>
      <Link href={`/${lng}/cart`}>{t("Cart")}</Link>

      {/* Tabs for Menu Categories */}
      <Tabs defaultValue={categories[0].title!} className="w-screen">
        <TabsList>
          {categories?.map((category) => (
            <TabsTrigger key={category.id} value={category.title!}>
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Lazy-load CategoryTab for each category */}
        {categories?.map((category) => (
          <TabsContent value={category.title!} key={category.id}>
            <React.Suspense fallback={<div>Loading...</div>}>
              <DynamicCategoryTab categoryId={category.id} lng={lng} />
            </React.Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuPage;

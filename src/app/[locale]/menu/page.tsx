import { getMenuCategories } from "@/lib/menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryTab from "@/components/Menu/CategoryTab";
import { getTranslations } from "next-intl/server";
import GoToCartButton from "@/components/Navigation/GoToCartButton";

const MenuPage = async () => {
  const categories = await getMenuCategories();
  const t = await getTranslations("MenuPage");

  return (
    <div className="mt-10 min-h-screen px-4 md:px-8 lg:px-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
        {t("title")}
      </h1>
      <GoToCartButton />
      <Tabs
        defaultValue={categories[0]?.id.toString()}
        className="w-full h-full"
      >
        {/* Tab List */}
        <TabsList className="flex overflow-x-auto scrollbar-hide justify-start gap-4 bg-gray-100 rounded-lg shadow-lg p-3">
          {categories
            .sort((a, b) => a.id - b.id)
            .map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id.toString()}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-md transition-all duration-200 ease-in-out focus:ring-2 focus:ring-teal-400"
              >
                <span className="text-sm font-medium">{category.title}</span>
              </TabsTrigger>
            ))}
        </TabsList>
        {/* Tab Content */}
        <div className="mt-6">
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id.toString()}>
              <CategoryTab {...category} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default MenuPage;

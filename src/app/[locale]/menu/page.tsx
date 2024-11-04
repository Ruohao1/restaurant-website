import { getMenuCategories } from "@/lib/menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryTab from "@/components/Menu/CategoryTab";
import GoToCartButton from "@/components/Navigation/GoToCartButton";

const MenuPage = async () => {
  const categories = await getMenuCategories();

  return (
    <div className="flex justify-center items-center mt-10 min-h-screen px-4 md:px-8 lg:px-16">
      <Tabs
        defaultValue={categories[0]?.id.toString()}
        className="flex max-w-6xl flex-col pt-4 w-full h-full"
      >
        {/* Tab List */}
        <div className="md:flex lg:flex justify-between items-center md:space-x-4 lg:space-x-4">
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
          <GoToCartButton />
        </div>
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

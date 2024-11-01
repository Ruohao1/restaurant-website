import { getMenuCategories } from "@/lib/menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryTab from "@/components/Menu/CategoryTab";

const MenuPage = async () => {
  const categories = await getMenuCategories();
  console.log(categories);
  return (
    <div className={`mt-16`}>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id.toString()}>
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id.toString()}>
            <CategoryTab {...category} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuPage;

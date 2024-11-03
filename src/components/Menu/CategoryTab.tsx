import MenuCard from "./MenuCard";

const CategoryTab = (category: {
  id: number;
  title: string | null;
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
  }[];
}) => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {category.menu
          .sort((a, b) => a.id - b.id)
          .map((menu) => (
            <MenuCard key={menu.id} menu={menu} />
          ))}
      </div>
    </div>
  );
};

export default CategoryTab;

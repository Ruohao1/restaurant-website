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
      food_id: number | null;
      food_type_id: number | null;
      quantity: number;
    }[];
    price: number;
    image: string | null;
    stripe_price_id: string | null;
  }[];
}) => {
  return (
    <div className="">
      {category.menu.map((menu) => (
        <MenuCard key={menu.id} menu={menu} />
      ))}
    </div>
  );
};

export default CategoryTab;

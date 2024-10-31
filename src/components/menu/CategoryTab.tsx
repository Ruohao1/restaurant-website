import { createClient } from "@/utils/supabase/server";
import MenuCard from "./MenuCard";

interface CategoryTabProps {
  categoryId: number;
  lng: string;
}

const CategoryTab: React.FC<CategoryTabProps> = async ({ categoryId, lng }) => {
  const supabase = createClient();
  const { data: menu, error } = await supabase
    .from("menu")
    .select("*")
    .eq("category_id", categoryId);

  if (error) {
    console.error(error);
  }

  return (
    <div>
      {menu?.map((item) => (
        <div key={item.id} className="m-5">
          <MenuCard menuId={item.id} lng={lng} className="w-full" />
        </div>
      ))}
    </div>
  );
};

export default CategoryTab;

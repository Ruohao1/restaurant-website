interface Menu {
  menu_id: number;
  menu_code: string | null;
  menu_name: string;
  menu_description: string | null;
  menu_price: number;
  menu_image: number | null;
  menu_food: MenuFood[];
}

interface MenuFood {
  quantity: number;
  food: Food | null;
  food_types: {
    type_title: string | null;
  } | null;
}

interface Food {
  food_id: number;
  food_name: string;
  food_image: string | null;
}

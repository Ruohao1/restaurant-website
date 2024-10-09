interface Category {
  id: number;
  title: string | null;
  menu: Menu[];
}
interface Menu {
  id: number;
  code: string | null;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
}

interface MenuFood {
  quantity: number;
  food: Food | null;
  food_types: {
    type_title: string | null;
  } | null;
}

interface Food {
  id: number;
  name: string;
  image: string | null;
}

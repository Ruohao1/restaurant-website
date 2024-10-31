import { useTranslation } from "@/app/i18n";
import { getFood } from "@/utils/menu";
import Image from "next/image";

interface FoodCardProps {
  foodId: Food["id"];
  lng: string;
}

const FoodCard: React.FC<FoodCardProps> = async ({ foodId, lng }) => {
  const { t } = await useTranslation(lng);
  const { data } = await getFood(foodId);

  return (
    <div>
      <h3 className="text-sm text-gray-700 mb-4 italic">
        {t(`${data?.name}`)}
      </h3>
      {data?.image && (
        <Image
          src={`/food/${data.image}` || "/placeholder.jpg"}
          alt={data.name}
          width={300}
          height={200}
          className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-md"
        />
      )}
    </div>
  );
};

export default FoodCard;

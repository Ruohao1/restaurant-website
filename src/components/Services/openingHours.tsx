import { useTranslation } from "@/app/i18n";
import config from "@/constants/config";

interface OpeningHoursProps {
  lng: string;
}

const OpeningHours: React.FC<OpeningHoursProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      {/* Opening Hours */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {t("opening-hours")}
      </h2>
      <ul className="flex flex-col space-y-4 bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow">
        {Object.keys(config.openingHours).map((day) => (
          <li key={day} className="flex justify-between ">
            <span className="font-semibold text-gray-600">{t(day)}</span>
            <span className="text-gray-900">
              {config.openingHours[day as keyof typeof config.openingHours]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpeningHours;

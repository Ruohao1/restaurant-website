import { useTranslation } from "@/app/i18n";
import OpeningHours from "./openingHours";

interface ServicesProps {
  lng: string;
}

const Services: React.FC<ServicesProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <section id="services" className="container max-w-6xl mx-auto px-4 py-12">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
        {t("services.title")}
      </h2>

      {/* Services List */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left side - Service Details */}
        <div className="lg:w-1/2 space-y-6">
          {/* Takeaway Service */}
          <div className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {t("services.takeaway")}
              </h3>
              <p className="text-gray-600">
                <span className="font-semibold text-primary">
                  {t("services.takeawayDiscount")}
                </span>{" "}
                {t("services.takeawayCondition")}
              </p>
            </div>
          </div>

          {/* Delivery Service */}
          <div className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {t("services.delivery")}
              </h3>
            </div>
          </div>

          {/* Reservations Service */}
          <div className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {t("services.reservations")}
              </h3>
            </div>
          </div>
        </div>

        {/* Right side - Opening Hours */}
        <div className="lg:w-1/2">
          <OpeningHours lng={lng} />
        </div>
      </div>
    </section>
  );
};

export default Services;

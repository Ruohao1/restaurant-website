import Image from "next/image";
// import "./testimonials.css";
import config from "@/constants/config";
import { useTranslations } from "next-intl";

const reviews = [
  {
    platform: config.links.maps,
    logo: "/logo/google.svg",
    rating: 4.5,
    reviewCount: 123,
    reviews: [
      {
        user: "Lolo P",
        rating: 5,
        comment:
          "Produits frais fabriqués à la demande. Plusieurs formules. Plats copieux. Prix  intéressants. On est jamais déçu",
      },
      {
        user: "Marie Dubois",
        rating: 5,
        comment:
          "Le meilleur restaurant japonais du coin ! On y revient même en ayant déménagé plus loin !!! Note: accessible PMR",
      },
      {
        user: "Marc Seigneurgen ",
        rating: 5,
        comment:
          "Très bonne cuisine japonaise, produits frais. Pour avoir tester plusieurs restaurants japonais dans le secteur celui-ci est très apprécié.",
      },
    ],
  },
  {
    platform: config.links.ubereats,
    logo: "/logo/ubereats.svg",
    rating: 4.4,
    reviewCount: 1000,
  },
  {
    platform: config.links.deliveroo,
    logo: "/logo/deliveroo.png",
    rating: 4.5,
    reviewCount: 241,
  },
];

const Testimonials: React.FC = () => {
  const t = useTranslations("HomePage.Testimonials");

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      {/* Title with fade-in animation */}
      <h2 className="text-3xl font-bold text-center mb-8 fade-in">
        {t("title")}
      </h2>

      {/* Platforms Ratings */}
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-wrap w-full justify-around gap-8 max-w-5xl mb-12">
          {reviews.map((review, index) => {
            if (review.platform === config.links.maps) return null;
            return (
              <div
                key={index}
                className="flex flex-col lg:flex-row items-center text-center max-w-[150px] sm:max-w-[200px] lg:space-x-4 transform transition duration-500 hover:scale-105 fade-up"
                style={{ animationDelay: `${index * 0.2}s` }} // Delay for staggered animation
              >
                <a href={review.platform}>
                  <Image
                    src={review.logo}
                    alt={review.platform}
                    width={80}
                    height={80}
                    className="w-20 h-20 md:w-24 md:h-24 rounded"
                  />
                  <div className="">
                    <p className="text-xl font-bold">{review.rating} ⭐</p>
                    <p className="text-sm text-gray-500">
                      {review.reviewCount}
                      {review.platform === "Uber Eats" ? "+" : ""}{" "}
                      {t("reviews")}
                    </p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Google Reviews */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-5xl mx-auto fade-in">
        <h3 className="text-2xl font-semibold mb-4 text-center sm:text-left">
          {t("google_reviews")}
        </h3>
        <div className="lg:space-x-4 space-y-4 lg:space-y-0 flex flex-col lg:flex-row items-center justify-center">
          {reviews[0]?.reviews?.map((review, index) => (
            <div
              key={index}
              className="flex flex-col justify-start p-4 w-full h-48 bg-white rounded-lg shadow text-center sm:text-left transform transition duration-500 hover:scale-105 fade-up"
              style={{ animationDelay: `${index * 0.3}s` }} // Staggered delay for Google reviews
            >
              <p className="text-lg font-semibold">{review.user}</p>
              <p className="text-gray-500">
                {review.rating === 5 ? "⭐⭐⭐⭐⭐" : "⭐⭐⭐⭐"}
              </p>
              <p className="text-gray-700 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

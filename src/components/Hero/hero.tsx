import { useTranslation } from "@/app/i18n";
import Logo from "../logo";
import "./hero.css";

interface HeroProps {
  lng: string;
}
const Hero: React.FC<HeroProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat floating-background"
      style={{ backgroundImage: 'url("/showcase/sushi-plate.jpg")' }}
      id="hero"
    >
      {/* Overlay for darker effect */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Hero content */}
      <div className="relative z-10 text-center text-white px-6 md:px-12 lg:px-24 flex flex-col items-center">
        {/* Logo Component */}
        <Logo className="w-48 h-48" />

        {/* Hero Text */}
        <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold">
          {t("hero.title")}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">
          {t("hero.description")}
        </p>

        {/* Call to Action */}
        <a
          href={`${lng}/menu`}
          className="mt-8 inline-block bg-primary text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-primary-dark transition"
        >
          {t("hero.cta")}
        </a>
      </div>
    </section>
  );
};

export default Hero;

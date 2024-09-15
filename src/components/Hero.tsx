import { useTranslation } from "@/app/i18n";
import Image from "next/image";
import Logo from "./logo";

interface HeroProps {
  lng: string;
}
const Hero: React.FC<HeroProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <div className="w-screen h-screen">
      <div className="relative w-full h-full flex justify-center items-center">
        <Image
          src="/hero.jpg"
          alt="hero"
          fill
          loading="lazy"
          className="blur-0 object-cover"
        />
      </div>
      <div>
        <Logo />
        <h1>{t("welcome")}</h1>
      </div>
    </div>
  );
};

export default Hero;

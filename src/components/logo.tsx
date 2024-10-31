import config from "@/constants/config";
import { cn } from "@/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  border?: boolean;
  lng?: string;
  link?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, border, lng, link }) => {
  return (
    <div className={cn("relative w-16 h-16", className)}>
      {(link && lng && (
        <a href={`/${lng}`} className="absolute inset-0">
          <Image
            src={border ? "/logo-border.png" : "/logo.png"}
            alt={config.name}
            layout="fill"
            objectFit="contain" // Empêche l'image de déborder du conteneur
            priority // Optimisation pour les images critiques comme les logos
          />
        </a>
      )) || (
        <Image
          src={border ? "/logo-border.png" : "/logo.png"}
          alt={config.name}
          layout="fill"
          objectFit="contain"
          priority
        />
      )}
    </div>
  );
};

export default Logo;

import config from "@/constants/config";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  border?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, border }) => {
  return (
    <div className={cn("relative w-16 h-16", className)}>
      <Image
        src={border ? "/logo-border.png" : "/logo.png"}
        alt={config.name}
        layout="fill"
        objectFit="contain" // Empêche l'image de déborder du conteneur
        priority // Optimisation pour les images critiques comme les logos
      />
    </div>
  );
};

export default Logo;

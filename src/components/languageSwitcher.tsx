import Link from "next/link";
import { languages } from "@/app/i18n/settings";

interface languageSwitcherProps {
  lng: string; // language code, e.g., 'en', 'fr'
}

export const LanguageSwitcher: React.FC<languageSwitcherProps> = ({ lng }) => {
  return (
    <div>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </div>
  );
};

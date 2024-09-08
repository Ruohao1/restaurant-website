import { LanguageSwitcher } from "../languageSwitcher";
import Logo from "../logo";
import NavBar from "./navBar";
import config from "@/constants/config";

interface HeaderProps {
  lng: string;
}

const Header: React.FC<HeaderProps> = ({ lng }) => {
  return (
    <header className="flex flex-col fixed top-0 z-99 w-screen ">
      <div className="flex justify-between">
        <p>{config.phone}</p>
        <p>{config.address}</p>
      </div>
      <div className="flex justify-between">
        <Logo />
        <div className="flex">
          <LanguageSwitcher lng={lng} />
          <NavBar lng={lng} />
        </div>
      </div>
    </header>
  );
};

export default Header;

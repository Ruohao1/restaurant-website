import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import Hero from "@/components/Hero";
import Map from "@/components/map";
import OpeningHours from "@/components/openingHours";
import Showcase from "@/components/showcase";

// Define the type for the incoming props, which will include `lng` as a parameter
interface PageProps {
  params: {
    lng: string; // language code, like 'en', 'fr', etc.
  };
}

const Page: React.FC<PageProps> = ({ params: { lng } }) => {
  return (
    <>
      {/* <div className="h-screen"></div> */}
      <Hero lng={lng} />
      <Showcase />
      <OpeningHours lng={lng} />
      <Map />
      <Footer lng={lng} />
      <Header lng={lng} />
    </>
  );
};

export default Page;

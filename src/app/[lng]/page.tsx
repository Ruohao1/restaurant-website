import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import Map from "@/components/map";
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
      <Header lng={lng} />
      <Showcase />
      <Map />
      <Footer lng={lng} />
    </>
  );
};

export default Page;

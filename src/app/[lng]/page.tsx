import Hero from "@/components/Hero";
import Map from "@/components/map";
import Services from "@/components/Services";
import Showcase from "@/components/showcase";
import Testimonials from "@/components/Testimonials";

// Define the type for the incoming props, which will include `lng` as a parameter
interface PageProps {
  params: {
    lng: string; // language code, like 'en', 'fr', etc.
  };
}

const Page: React.FC<PageProps> = ({ params: { lng } }) => {
  return (
    <div>
      <Hero lng={lng} />
      <Showcase />
      <Testimonials lng={lng} />
      <Services lng={lng} />
      <Map />
    </div>
  );
};

export default Page;

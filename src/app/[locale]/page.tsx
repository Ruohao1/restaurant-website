import Hero from "@/components/Home/Hero";
import Map from "@/components/Home/map";
import Services from "@/components/Home/Services";
import Showcase from "@/components/Home/showcase";
import Testimonials from "@/components/Home/Testimonials";
import { HEADER_HEIGHT } from "@/constants/components/header";

const Page: React.FC = () => {
  return (
    <div style={{ marginTop: -HEADER_HEIGHT / 4 + "rem" }}>
      <Hero />
      <Showcase />
      <Testimonials />
      <Services />
      <Map />
    </div>
  );
};

export default Page;

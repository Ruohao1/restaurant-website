import Hero from "@/components/Home/Hero";
import Map from "@/components/Home/map";
import Services from "@/components/Home/Services";
import Showcase from "@/components/Home/showcase";
import Testimonials from "@/components/Home/Testimonials";
import { HEADER_HEIGHT } from "@/constants/components/header";

const Page: React.FC = () => {
  const inset = { top: HEADER_HEIGHT };
  return (
    <div className={`-mt-${inset.top}`}>
      <Hero />
      <Showcase />
      <Testimonials />
      <Services />
      <Map />
    </div>
  );
};

export default Page;

import Hero from "@/components/Hero";
import Map from "@/components/map";
import Services from "@/components/Services";
import Showcase from "@/components/showcase";
import Testimonials from "@/components/Testimonials";
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

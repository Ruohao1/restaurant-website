import { fallbackLng } from "@/app/i18n/settings";
import { redirect } from "next/navigation";

const Page: React.FC = () => {
  const lng = fallbackLng;
  return redirect(`/${lng}`);
};

export default Page;

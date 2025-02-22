import { redirect } from "next/navigation";
import { fallbackLng } from "./i18n/settings";

export default function HomePage() {
  const lng: string = fallbackLng;

  return redirect(`/${lng}`);
}

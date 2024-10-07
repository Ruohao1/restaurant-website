import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { HEADER_HEIGHT } from "@/constants/components/header";

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const inset = { top: HEADER_HEIGHT };

  return (
    <>
      <Header lng={lng} />
      <div className={`mt-${inset.top}`}>{children}</div>
      <Footer lng={lng} />
    </>
  );
}

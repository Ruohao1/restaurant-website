import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <>
      <Header lng={lng} />
      <div className="mt-16">{children}</div>
      <Footer lng={lng} />
    </>
  );
}

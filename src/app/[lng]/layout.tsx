import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <CartProvider>
      <div className="w-screen">
        <Header lng={lng} />
        <div className="mt-16">{children}</div>
        <Footer lng={lng} />
      </div>
    </CartProvider>
  );
}

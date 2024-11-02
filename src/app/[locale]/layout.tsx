// src/app/[locale]/layout.tsx
import "@/assets/styles/globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HEADER_HEIGHT } from "@/constants/components/header";
import { CartProvider } from "@/context/CartContext";

export default async function RootLayout({
  children,
  params: { locale, slug },
}: {
  children: React.ReactNode;
  params: { locale: string; slug?: string };
}) {
  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  // Check if the current path is the Home page based on `slug`
  const isHomePage = !slug; // Assuming `slug` is undefined for the Home page

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Header isHomePage={isHomePage} />
            <div className={"min-h-screen"}>
              <div style={{ marginTop: HEADER_HEIGHT / 4 + "rem" }}>
                {children}
              </div>
            </div>
            <Footer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

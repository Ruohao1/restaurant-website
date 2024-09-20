import "@/assets/styles/globals.css";

import { fallbackLng, languages } from "@/app/i18n/settings";

import { useTranslation } from "@/app/i18n";

interface generateMetadataProps {
  params: {
    lng: string;
  };
}

export async function generateMetadata({
  params: { lng },
}: generateMetadataProps) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
  return {
    title: t("title"),
    content:
      "A playground to explore new Next.js 13/14 app directory features such as nested layouts, instant loading states, streaming, and component level data fetching.",
  };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={lng}>
      <head />
      <body>{children}</body>
    </html>
  );
}

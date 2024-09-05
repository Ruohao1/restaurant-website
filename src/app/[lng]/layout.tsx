import "@/app/globals.css";
import type { Metadata } from "next";
import React from "react";
import { dir } from "i18next";

import { languages } from "../i18n/settings";

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Restaurant website template",
};

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
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>{children}</body>
    </html>
  );
}

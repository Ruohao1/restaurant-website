import "@/app/globals.css";

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

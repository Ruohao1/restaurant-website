export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

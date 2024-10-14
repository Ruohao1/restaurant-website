import Logo from "@/components/logo";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <>
      <header className="flex justify-between px-4">
        <div>
          <Logo border link />
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard/orders">Commandes</Link>
            </li>
            <li>
              <Link href="/dashboard/reservations">Réservations</Link>
            </li>
            <li>
              <Link href="/dashboard/auth">Auth</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>{children}</div>
    </>
  );
}

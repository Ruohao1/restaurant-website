import "@/assets/styles/globals.css";

import Logo from "@/components/logo";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

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
              <Link href="/orders">Commandes</Link>
            </li>
            <li>
              <Link href="/reservations">Réservations</Link>
            </li>
            <li>
              <Link href="/auth">Auth</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>{children}</div>
    </>
  );
}

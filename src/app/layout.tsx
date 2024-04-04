import type { Metadata } from "next";
import { Lilita_One } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const lilitaOne = Lilita_One({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "STOP",
  description: "Jogue STOP aqui.",
};

/**
 * The root layout of the website.
 * @param properties - Properties of the layout.
 * @param properties.children - The children of the layout.
 * @returns The root layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="text-[24px]">
      <body
        className={`flex min-h-screen flex-col bg-blue-950 text-blue-50 ${lilitaOne.className}`}
      >
        <main className="flex grow flex-col items-center justify-center gap-8 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}

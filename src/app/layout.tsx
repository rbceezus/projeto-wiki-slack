import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Consolidação-Inbound",
  description: "Wiki de personagens — Consolidação-Inbound",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${lato.variable} h-full`}>
      <body className="h-full">{children}</body>
    </html>
  );
}

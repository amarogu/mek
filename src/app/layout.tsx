import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Gustavo Amaro",
  description: "You can check all of my projects here.",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt'>
      <body className={`${manrope.className} text-base text-text-200 bg-bg-100 antialiased`}>{children}</body>
    </html>
  );
}

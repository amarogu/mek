import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Maria & Kalil",
  description: "Casamento de Maria e Kalil",
  
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt'>
      <body className={`${manrope.className} text-text-100 dark:text-dark-text-100 bg-bg-100 dark:bg-dark-bg-100 antialiased`}>{children}</body>
    </html>
  );
}

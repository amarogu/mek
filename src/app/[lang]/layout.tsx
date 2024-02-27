import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { i18n, type Locale } from "../../i18n.config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const manrope = Manrope({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Gustavo Amaro",
  description: "You can check all of my projects here.",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body className={`${manrope.className} text-base text-text-200 bg-bg-100 antialiased`}>{children}</body>
    </html>
  );
}

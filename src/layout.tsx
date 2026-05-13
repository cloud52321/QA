import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Bug Hunter's Diary",
  description: "QA Team Internal Wiki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}

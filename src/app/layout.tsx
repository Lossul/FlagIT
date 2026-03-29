import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Flag Puzzle",
  description: "Guess the flag from a partial reveal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

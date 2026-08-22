import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SANKET360 | Explore Maharashtra in 360°",
  description:
    "Explore forts, mountains and beautiful places of Maharashtra through immersive 360° photography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
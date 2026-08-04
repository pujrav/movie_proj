import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "CineMatch",
  description: "Interactive movie recommendation and taste profile builder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

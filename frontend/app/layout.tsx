import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "CineMatch",
  description: "Discover movies you actually love with AI-powered duels.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100 antialiased">
      <body className="min-h-screen bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}

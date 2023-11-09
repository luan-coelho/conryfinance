import React from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
    <body className="h-screen">
    {children}
    </body>
    </html>
  );
}

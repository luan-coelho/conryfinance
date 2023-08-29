import "./globals.css";
import Header from "@/components/application/layout/header";
import RouteBack from "@/components/commons/route-back";
import { Sidebar } from "@/components/application/layout/sidebar";
import { SidebarProvider } from "@/contexts/sidebar-context";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <html lang="pt-br">
      <body className="flex h-screen">
      <Sidebar.Root />
      <div className="w-full flex flex-col">
        <Header />
        <main className="p-8">
          <RouteBack />
          {children}
        </main>
      </div>
      </body>
      </html>
    </SidebarProvider>
  );
}

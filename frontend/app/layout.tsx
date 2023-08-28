import "./globals.css";
import Header from "@/components/application/layout/header";
import RouteBack from "@/components/commons/route-back";
import { Sidebar } from "@/components/application/layout/sidebar";
import { SidebarProvider } from "@/contexts/sidebar-context";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
    <body>
    <SidebarProvider>
      <div className="flex">
        <Sidebar.Root />
        <div className="w-full flex flex-col">
          <Header />
          <main className="w-full p-8">
            <RouteBack />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
    </body>
    </html>
  );
}

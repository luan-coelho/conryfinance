import { Sidebar } from "@/components/application/layout/sidebar";
import { SidebarProvider } from "@/contexts/sidebar-context";
import React from "react";
import Content from "./_content";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <html lang="pt-br">
        <body className="flex h-screen">
          <Sidebar.Root />
          <Content>{children}</Content>
        </body>
      </html>
    </SidebarProvider>
  );
}

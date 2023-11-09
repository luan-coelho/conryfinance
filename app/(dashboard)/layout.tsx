import { Sidebar } from "@/components/application/layout/sidebar";
import { LoadingProvider } from "@/contexts/request-loading-context";
import { SidebarProvider } from "@/contexts/sidebar-context";
import React from "react";
import Content from "@/app/_content";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <SidebarProvider>
        <Sidebar.Root />
        <Content>{children}</Content>
      </SidebarProvider>
    </LoadingProvider>
  );
}

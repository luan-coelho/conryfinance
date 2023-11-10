import { Sidebar } from "@/components/application/layout/sidebar";
import { LoadingProvider } from "@/contexts/request-loading-context";
import { LayoutProvider } from "@/contexts/sidebar-context";
import React from "react";
import Content from "@/app/(dashboard)/_content";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <LayoutProvider>
        <Sidebar.Root />
        <Content>{children}</Content>
      </LayoutProvider>
    </LoadingProvider>
  );
}

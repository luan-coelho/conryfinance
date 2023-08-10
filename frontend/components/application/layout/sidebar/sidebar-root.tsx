"use client";

import { CircleDollarSign, Home } from "lucide-react";
import SidebarMenu from "./sidebar-menu";
import SidebarMenuItem from "./sidebar-menu-item";

export default function SidebarRoot() {
  return (
    <aside className="bg-neutral-200 min-w-[300px] max-w-[300px] min-h-screen p-4 grid content-between border-r border-gray-300">
      <SidebarMenu>
        <SidebarMenuItem description="Dashboard" pathName="/dashboard">
          <Home />
        </SidebarMenuItem>
        <SidebarMenuItem description="Orçamentos" pathName="/monthlybudgets">
          <CircleDollarSign />
        </SidebarMenuItem>
      </SidebarMenu>
    </aside>
  );
}

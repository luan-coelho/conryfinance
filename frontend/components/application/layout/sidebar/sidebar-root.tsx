"use client";
import "@/styles/sidebar.css";

import { CircleDollarSign, Home, Landmark } from "lucide-react";
import SidebarMenu from "./sidebar-menu";
import SidebarMenuItem from "./sidebar-menu-item";
import { useSidebar } from "@/contexts/sidebar-context";
import { Button } from "@/components/ui/button";

export default function SidebarRoot() {
  const { isOpen,toggleSidebar } = useSidebar();

  return (
    <aside className={`${isOpen ? "sidebar-open" : "sidebar-close"}`}>
      <div className={`flex items-center justify-center gap-3 ${isOpen ? "px-4" : ""}`}>
        <div className="bg-white text-black rounded-full p-1">
          <Landmark size={30} />
        </div>
        {isOpen && <div className="text-xl font-medium leading-7 hidden md:block">Conry Finance</div>}
      </div>

      <SidebarMenu>
        <SidebarMenuItem description="Dashboard" pathName="/dashboard">
          <Home />
        </SidebarMenuItem>
        <SidebarMenuItem description="Orçamentos" pathName="/monthlybudgets">
          <CircleDollarSign />
        </SidebarMenuItem>
      </SidebarMenu>

      <Button onClick={toggleSidebar} className="md:hidden bg-red-600 hover:bg-red-500 rounded-full">
        Fechar
      </Button>
    </aside>
  );
}

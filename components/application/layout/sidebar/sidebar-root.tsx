"use client";

import "./index.css";

import { useSidebar } from "@/contexts/sidebar-context";
import { CircleDollarSign, Home, Landmark } from "lucide-react";
import SidebarMenu from "./sidebar-menu";
import SidebarMenuItem from "./sidebar-menu-item";

export default function SidebarRoot() {
  const { isOpen } = useSidebar();

  return (
    <aside className={`${isOpen ? "sidebar-open" : "sidebar-close"}`}>
      <div className={`flex items-center justify-center gap-3 ${isOpen ? "px-4" : ""}`}>
        <div className="bg-white text-black rounded-full p-1">
          <Landmark size={30} />
        </div>
        {isOpen && <div className="text-xl font-medium leading-7 hidden md:block">Conry Finance</div>}
      </div>

      <SidebarMenu>
        <SidebarMenuItem description="Orçamentos" pathName="/monthly-budgets">
          <CircleDollarSign />
        </SidebarMenuItem>
      </SidebarMenu>
    </aside>
  );
}

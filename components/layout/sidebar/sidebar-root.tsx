"use client";

import "./index.css";
import { CircleDollarSign, Landmark } from "lucide-react";
import SidebarMenu from "./sidebar-menu";
import SidebarMenuItem from "./sidebar-menu-item";
import { useLayout } from "@/contexts/sidebar-context";

export default function SidebarRoot() {
  const { sidebarIsOpen } = useLayout();

  return (
    <aside className={`${sidebarIsOpen ? "sidebar-open" : "sidebar-close"}`}>
      <div className={`flex items-center justify-center gap-3 ${sidebarIsOpen ? "px-4" : ""}`}>
        <div className="bg-white text-black rounded-full p-1">
          <Landmark size={30} />
        </div>
        {sidebarIsOpen && <div className="text-xl font-medium leading-7 hidden md:block">Conry Finance</div>}
      </div>

      <SidebarMenu>
        <SidebarMenuItem description="Orçamentos" pathName="/monthly-budgets">
          <CircleDollarSign />
        </SidebarMenuItem>
      </SidebarMenu>
    </aside>
  );
}

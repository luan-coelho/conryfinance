"use client";

import { CircleDollarSign, Home, Landmark } from "lucide-react";
import SidebarMenu from "./sidebar-menu";
import SidebarMenuItem from "./sidebar-menu-item";
import { useSidebar } from "@/contexts/sidebar-context";

export default function SidebarRoot() {
  const { isOpen } = useSidebar();

  return (
    <aside
      className={`${isOpen ? "min-w-[300px] max-w-[300px]" : ""} bg-[#1A1C1E] text-white relative min-h-screen px-6 py-8 grid content-start border-r border-gray-300 gap-10`}>
      <div className="flex items-center justify-start gap-2 px-4">
        <div className="bg-white text-black rounded-full p-1">
          <Landmark size={30} />
        </div>
        {isOpen && <div className="text-xl font-medium leading-7">Conry Finance</div>}
      </div>
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

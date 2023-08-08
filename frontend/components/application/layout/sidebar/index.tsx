"use client";

import SidebarMenuItem from "./sidebar-menu-item";

export default function Sidebar() {
  return (
    <aside className="bg-neutral-100 min-w-[300px] max-w-[300px] min-h-screen p-4 grid content-between border-r border-gray-300">
      <div>
        <div>
          <SidebarMenuItem description="Orçamentos" pathName="/monthlybudgets" />
        </div>
      </div>
    </aside>
  );
}

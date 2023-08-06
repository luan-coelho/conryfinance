"use client";

import SidebarMenu from "./sidebar-menu";
import SidebarMenuItem from "./sidebar-menu-item";

export default function Sidebar() {
  return (
    <aside className="fixed bg-[#101727] text-white sm:min-w-full md:min-w-[300px] min-h-screen p-4 grid content-between">
      <div>
        <div className="flex gap-3 py-3">
          <div className="bg-blue-600 text-white rounded w-12 h-12 flex items-center justify-center">
            <span className="font-bold text-xl">CF</span>
          </div>
          <div>
            <h1 className="font-bold uppercase">Confy Finance</h1>
            <h2 className="text-sm text-gray-300">Finanças pessoais</h2>
          </div>
        </div>

        <div className="w-full">
          <hr className="h-px bg-gray-500 border-0" />
        </div>

        <div>
          <SidebarMenu description="finances">
            <SidebarMenuItem description="Orçamentos" path="/monthlybudgets" />
          </SidebarMenu>
        </div>
      </div>

      <div className="bg-blue-600 flex items-center gap-2 px-4 py-2 rounded ">
        <div className="flex flex-col">
          <span className="text-xs text-white font-bold">LUAN COÊLHO</span>
          <span className="text-xs text-gray-50">Desenvolvedor de Software</span>
        </div>
      </div>
    </aside>
  );
}

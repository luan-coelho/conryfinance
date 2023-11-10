"use client";

import { Menu } from "lucide-react";
import { useLayout } from "@/contexts/sidebar-context";

export default function Header() {
  const { sidebarIsOpen, toggleSidebar } = useLayout();

  return (
    <header
      className={`fixed z-40 w-full h-[70px] bg-white px-10 border-b border-gray-300 flex items-center justify-end md:justify-start`}>
      <button onClick={toggleSidebar} className="transition-transform duration-300 ease-in-out">
        <Menu className="rotate-180 hover:bg-zinc-200 rounded-sm" />
      </button>
    </header>
  );
}

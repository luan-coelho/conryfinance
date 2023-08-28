"use client"

import { Menu } from "lucide-react";
import { useSidebar } from "@/contexts/sidebar-context";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="w-full h-[70px] bg-white px-10 border-b border-gray-300 shrink-0 flex items-center">
      <button onClick={toggleSidebar} className="">
        <Menu />
      </button>
    </header>
  );
}

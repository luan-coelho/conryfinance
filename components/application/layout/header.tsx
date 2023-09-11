"use client";

import { Menu, X } from "lucide-react";
import { useSidebar } from "@/contexts/sidebar-context";

export default function Header() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <header
      className={`w-full h-[70px] bg-white px-10 border-b border-gray-300 shrink-0 flex items-center justify-end md:justify-start`}>
      <button onClick={toggleSidebar} className="transition-transform duration-300 ease-in-out">
        {isOpen ? (
          <X className={`${isOpen ? "rotate-180" : ""}`} />
        ) : (
          <Menu className={`${isOpen ? "rotate-180" : ""}`} />
        )}
      </button>
    </header>
  );
}

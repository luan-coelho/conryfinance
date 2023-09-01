"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/sidebar-context";
import React from "react";

type SidebarMenuItemProps = {
  pathName: string;
  description: string;
  children: React.ReactNode;
};

export default function SidebarMenuItem({ pathName, description, children }: SidebarMenuItemProps) {
  const { isOpen } = useSidebar();

  const activePathName = usePathname();
  const itemTextStyle = activePathName == pathName ? "font-medium text-zinc-200" : "font-normal text-zinc-400";
  const iconTextStyle = activePathName == pathName ? "text-blue-500" : "text-zinc-500";
  const itemBackgroundStyle = activePathName == pathName ? "bg-[#313334]" : "";

  return (
    <>
      <li
        className={`${itemBackgroundStyle} text-zinc-200 px-4 py-2 rounded-lg transition-opacity duration-700 ease-in-out`}>
        <Link href={pathName}
              className={`flex items-center gap-2 ${isOpen ? "justify-start" : "justify-center"} flex-col md:flex-row`}>
          <div className={iconTextStyle}>{children}</div>
          {isOpen &&
            <span className={`${itemTextStyle} text-base leading-normal ${isOpen ? "opacity-100" : "opacity-0"}`}>
              {description}
            </span>
          }
        </Link>
      </li>
    </>
  );
}

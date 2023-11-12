import React from "react";

interface SidebarMenuProps {
  children: React.ReactNode;
}

export default function SidebarMenu({ children }: SidebarMenuProps) {
  return (
    <>
      <ul>{children}</ul>
    </>
  );
}

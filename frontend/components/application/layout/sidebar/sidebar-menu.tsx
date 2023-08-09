interface SidebarMenuProps {
  description?: string;
  children: React.ReactNode;
}

export default function SidebarMenu({ description, children }: SidebarMenuProps) {
  return (
    <>
      <ul>{children}</ul>
    </>
  );
}

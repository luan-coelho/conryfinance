interface SidebarMenuProps {
  description: string;
  children: React.ReactNode;
}

export default function SidebarMenu({ description, children }: SidebarMenuProps) {
  return (
    <div>
      <span className="text-xs text-gray-300 font-medium">{description.toUpperCase()}</span>
      <ul className="my-1">{children}</ul>
    </div>
  );
}

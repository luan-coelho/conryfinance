import { CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarMenuItemProps = {
  pathName: string;
  description: string;
  children: React.ReactNode;
};

export default function SidebarMenuItem({ pathName, description, children }: SidebarMenuItemProps) {
  const activePathName = usePathname();
  const itemTextStyle = activePathName == pathName ? "font-medium" : "font-normal";
  const iconTextStyle = activePathName == pathName ? "text-lightblue-500" : "text-zinc-600";
  const itemBorderStyle = activePathName == pathName ? "border border-gray-200" : "";

  return (
    <>
      <li className={`${itemBorderStyle} px-4 py-2 rounded-lg`}>
        <Link href={pathName} className="flex items-center gap-2">
          <div className={iconTextStyle}>{children}</div>
          <span className={`${itemTextStyle} text-base leading-normal`}>{description}</span>
        </Link>
      </li>
    </>
  );
}

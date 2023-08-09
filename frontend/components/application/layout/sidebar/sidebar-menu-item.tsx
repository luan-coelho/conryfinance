import { CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarMenuItemProps = {
  description: string;
  pathName: string;
};

export default function SidebarMenuItem({ description, pathName }: SidebarMenuItemProps) {
  const activePathName = usePathname();
  const itemTextStyle = activePathName == pathName ? "font-medium" : "font-normal";
  const iconTextStyle = activePathName == pathName ? "text-lightblue-500" : "text-zinc-600";
  const itemBorderStyle = activePathName == pathName ? "border border-gray-200" : "";

  return (
    <Link href={pathName}>
      <div className={`w-[272px] h-11 relative rounded-lg ${itemBorderStyle}`}>
        <div className="w-48 h-11 left-0 top-0 absolute">
          <div className={`${itemTextStyle} left-[48px] top-[10px] absolute text-base leading-normal`}>
            {description}
          </div>
          <div className={`${itemTextStyle} w-6 h-6 left-[12px] top-[10px] absolute`}>
            <CircleDollarSign className={iconTextStyle} />
          </div>
        </div>
      </div>
    </Link>
  );
}

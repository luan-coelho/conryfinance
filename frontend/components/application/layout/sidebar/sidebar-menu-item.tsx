import { getStyleForPath } from "@/utils/sidebar-utils";
import { GemIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarMenuItemProps {
  path: string;
  description: string;
}

export default function SidebarMenuItem({ path, description }: SidebarMenuItemProps) {
  const activePathName = usePathname();

  return (
    <>
      <ul className="my-1">
        <li className={getStyleForPath(activePathName, path)}>
          <Link href={path}>
            <div className="flex items-center gap-2">
              <GemIcon />
              <span>{description}</span>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
}

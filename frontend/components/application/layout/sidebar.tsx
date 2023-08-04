"use client";

import { GemIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const activePathName = usePathname();

  function getStyleForPath(pathName: string): string | undefined {
    return activePathName == pathName ? "active-menu-item" : "menu-item";
  }

  return (
    <aside className="bg-[#101727] text-white min-w-[300px] min-h-screen p-4 grid content-between">
      <div>
        <div className="flex gap-3 py-3">
          <div className="bg-blue-600 text-white rounded w-12 h-12 flex items-center justify-center">
            <span className="font-bold text-xl">CF</span>
          </div>
          <div>
            <h1 className="font-bold uppercase">Confy Finance</h1>
            <h2 className="text-sm text-gray-300">Finanças pessoais</h2>
          </div>
        </div>

        <div className="w-full">
          <hr className="h-px bg-gray-500 border-0" />
        </div>

        <div>
          <span className="text-xs text-gray-300 font-medium">FINANCES</span>
          <ul className="my-1">
            <li className={getStyleForPath("/monthlybudgets")}>
              <Link href={"/monthlybudgets"}>
                <div className="flex items-center gap-2">
                  <GemIcon />
                  <span>Orçamentos mensais</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-600 flex items-center gap-2 px-4 py-2 rounded ">
        <div className="flex flex-col">
          <span className="text-xs text-white font-bold">LUAN COÊLHO</span>
          <span className="text-xs text-gray-50">Desenvolvedor de Software</span>
        </div>
      </div>
    </aside>
  );
}

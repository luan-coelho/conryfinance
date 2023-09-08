"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function RouteBack() {
  const [open, setOpen] = useState<boolean>(true);

  const router = useRouter();
  const currentPath = usePathname();

  function goToParent() {
    const parentPath = currentPath.split("/").slice(0, -1).join("/");
    console.log(parentPath);

    if (parentPath == "/") {
      setOpen(false);
    }
    router.push(parentPath);
  }

  return (
    <>
      {open && (
        <button
          onClick={goToParent}
          className="w-[88px] h-6 text-base font-normal hover:font-medium text-zinc-600 rounded-lg justify-start items-center gap-2 inline-flex leading-normal">
          <ChevronLeft size="16px" />
          <span>Voltar</span>
        </button>
      )}
    </>
  );
}

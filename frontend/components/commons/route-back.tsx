import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function RouteBack() {
  const router = useRouter();
  const currentPath = usePathname();

  function goToParent() {
    const parentPath = currentPath.split("/").slice(0, -1).join("/");
    router.push(parentPath);
  }

  return (
    <button
      onClick={goToParent}
      className="w-[88px] h-6 text-base font-normal hover:font-medium text-zinc-600 rounded-lg justify-start items-center gap-2 inline-flex leading-normal">
      <ChevronLeft />
      <div>Voltar</div>
    </button>
  );
}

import { Landmark } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-[80px] px-10 bg-neutral-100 border-b border-gray-300 shrink-0 flex items-center">
      <div className="justify-start items-center gap-2 inline-flex">
        <Landmark />
        <div className="text-zinc-900 text-xl font-medium leading-7">Conry Finance</div>
      </div>
    </header>
  );
}

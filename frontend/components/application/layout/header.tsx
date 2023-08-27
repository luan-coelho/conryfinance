import { Landmark } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-[80px] px-10 border-b border-gray-300 shrink-0 flex items-center">
      <div className="flex justify-start items-center gap-2">
        <Landmark size={30}/>
        <div className="text-zinc-900 text-xl font-bold leading-7">Conry Finance</div>
      </div>
    </header>
  );
}

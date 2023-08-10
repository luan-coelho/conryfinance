import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type PresentActionsRootProps = {
  children: React.ReactNode;
};

export default function PresentActionsRoot({ children }: PresentActionsRootProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-8 h-8 px-2 py-2 bg-white hover:bg-gray-100 rounded-lg shadow border border-gray-300 text-gray-400 flex-col justify-start items-center gap-2 flex">
            <MoreHorizontal size={"16px"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">{children}</DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type PresentActionsOptionProps = {
  children: React.ReactNode;
};

export default function PresentActionsOption({ children }: PresentActionsOptionProps) {
  return (
    <>
      <DropdownMenuItem>{children}</DropdownMenuItem>
    </>
  );
}

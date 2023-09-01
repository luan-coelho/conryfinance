import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";

interface ConfirmDialogProps {
  confirmAction: () => void;
}

export function ConfirmDialog({ confirmAction }: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => {
          setOpen(true);
        }}
        className="cursor-pointer"
        asChild>
        <span className="text-red-600">Deletar</span>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] border border-gray-300 bg-white">
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription className="text-gray-500">Esta ação não poderá ser desfeita!</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={confirmAction} size={"sm"} variant={"outline"}>
            Confirmar
          </Button>
          <Button
            onClick={() => setOpen(false)} size={"sm"} className="bg-red-600 hover:bg-red-500">
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

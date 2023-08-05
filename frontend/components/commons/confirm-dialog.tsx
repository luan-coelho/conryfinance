"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface ConfirmDialogProps {
  confirmAction: Function;
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
        <Trash className="text-red-500" />
      </DialogTrigger>
      <DialogContent className="max-w-[425px] border border-gray-300 bg-white">
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription className="text-gray-500">Esta ação não poderá ser desfeita</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => confirmAction()} className="hover:bg-gray-100 rounded border border-gray-200">
            Confirmar
          </Button>
          <Button
            size={"sm"}
            onClick={() => setOpen(false)}
            className="bg-red-600 hover:bg-red-500 text-white rounded"
            type="submit">
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

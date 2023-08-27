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
        <span className="text-red-600">Deletar</span>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] border border-gray-300 bg-white">
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription className="text-gray-500">Esta ação não poderá ser desfeita</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => confirmAction()}
            className="app-button-small">
            Confirmar
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className="app-button-small-danger">
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

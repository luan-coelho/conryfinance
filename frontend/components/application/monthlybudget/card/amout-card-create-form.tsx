"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/routes";
import { toastError, toastSuccess } from "@/utils/toast";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

interface AmountCardCreateProps {
  montlyBudgetId: number;
  updateMonthlyCard: Function;
}

export function AmountCardCreateForm({ montlyBudgetId, updateMonthlyCard }: AmountCardCreateProps) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState<string>();

  function validateData(): boolean {
    if (!description) {
      return false;
    }
    return true;
  }

  async function fetchCreateCard() {
    const response = await fetch(`${routes.monthlyBudgetCard.root}?monthlybudget=${montlyBudgetId}`, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      toastError("Failed to fetch data");
    }

    resetData();
    toastSuccess("Orçamento mensal criado com sucesso!");
    updateMonthlyCard();
    setOpen(false);
  }

  function resetData() {
    setDescription("");
  }

  function handleSubmit() {
    if (validateData()) {
      fetchCreateCard();
    } else {
      toastError("Informe a descrição!");
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            onClick={() => {
              setOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded px-2 py-2 w-full flex items-center justify-center">
            <PlusCircle className="mr-2" /> Cadastrar
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] border border-gray-300 bg-white">
          <DialogHeader>
            <DialogTitle>Cadastrar Card</DialogTitle>
            <DialogDescription>Crie um novo card...</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Descrição</Label>
            <Input
              id="description"
              placeholder="Minhas despesas"
              className="col-span-3"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              className="bg-green-600 hover:bg-green-500 text-white rounded px-2"
              type="submit"
              onClick={handleSubmit}>
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import { getMonthNameFromDate } from "@/utils/dateutils";
import { toastError, toastSuccess } from "@/utils/toast";
import { EyeIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MonthlyBudgetCardProps {
  monthlyBudget: MonthlyBudget;
  setMonthlyBudgets: Function;
}

export default function MonthlyBudgetCard({ monthlyBudget, setMonthlyBudgets }: MonthlyBudgetCardProps) {
  const [open, setOpen] = useState(false);

  async function handleDeleteById() {
    const response = await fetch(`${routes.monthlyBudget.root}/${monthlyBudget.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });

    if (!response.ok) {
      const json = await response.json();
      toastError(json.detail);
      return;
    }
    toastSuccess("Orçamento mensal deletado com sucesso!");
    setMonthlyBudgets();
  }

  return (
    <>
      <Card className="w-full border-1 border-t-4 border-green-600 bg-white rounded-xl shadow p-3 flex justify-between">
        <div>
          <h2 className="text-base font-bold">{monthlyBudget.description}</h2>
          <span className="bg-green-600 text-white font-semibold text-xs py-1 px-2 rounded border">
            {getMonthNameFromDate(monthlyBudget.period)}
          </span>
        </div>
        <div className="min-w-7 rounded border shadow p-2 flex flex-col items-center gap-2">
          <Link href={`/monthlybudgets/${monthlyBudget.id}`}>
            <EyeIcon className="text-blue-500" />
          </Link>

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
                <DialogDescription>Esta ação não poderá ser desfeita</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="hover:bg-gray-100 rounded"
                  type="submit"
                  onClick={handleDeleteById}>
                  Confirmar
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  className="bg-red-600 hover:bg-red-500 text-white rounded"
                  type="submit">
                  Cancelar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </>
  );
}

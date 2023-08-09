"use client";

import ActionOptions from "@/components/commons/action-options";
import Badge from "@/components/commons/badge";
import { ConfirmDialog } from "@/components/commons/confirm-dialog";
import { Card } from "@/components/ui/card";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import { getMonthNameFromDate } from "@/utils/dateutils";
import { toastError, toastSuccess } from "@/utils/toast";
import { Eye, EyeIcon } from "lucide-react";
import Link from "next/link";

interface MonthlyBudgetCardProps {
  monthlyBudget: MonthlyBudget;
  setMonthlyBudgets: Function;
}

export default function MonthlyBudgetCard({ monthlyBudget, setMonthlyBudgets }: MonthlyBudgetCardProps) {
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

  function formatToBRL(value: string): string {
    const numberValue = parseFloat(value);

    const formattedValue = numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formattedValue;
  }

  return (
    <>
      <div className="min-w-[500px] border-1 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-zinc-900 text-lg font-medium">{monthlyBudget.description}</h2>
          <div className="flex items-center gap-1">
            <Badge>{getMonthNameFromDate(monthlyBudget.period)}</Badge>
            <ActionOptions />
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <div className="flex items-start flex-col">
            <span className="text-zinc-600 text-base font-normal">Orçamento</span>
            <span className="text-zinc-900 text-2xl font-medium">{formatToBRL(monthlyBudget.budget.toString())}</span>
          </div>
          <div className="flex items-end">
            <Link
              className="flex items-center gap-2 px-3 py-1 bg-lightblue-500 rounded-lg shadow justify-start text-center text-white text-base font-medium"
              href={`/monthlybudgets/${monthlyBudget.id}`}>
              Visualizar
              <Eye />
            </Link>
          </div>
        </div>
        {/* <div className="min-w-7 rounded border shadow p-2 flex flex-col items-center gap-2">
          <Link href={`/monthlybudgets/${monthlyBudget.id}`}>
            <EyeIcon className="text-blue-500" />
          </Link>

          <ConfirmDialog confirmAction={handleDeleteById} />
        </div> */}
      </div>
    </>
  );
}

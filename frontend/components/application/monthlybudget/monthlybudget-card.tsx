"use client";

import Badge from "@/components/commons/badge";
import { ConfirmDialog } from "@/components/commons/confirm-dialog";
import { PresentActions } from "@/components/commons/present-actions";
import PresentActionsOption from "@/components/commons/present-actions/present-actions-option";
import { Card } from "@/components/ui/card";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import { getMonthNameFromDate } from "@/utils/dateutils";
import { toastError, toastSuccess } from "@/utils/toast";
import { Eye } from "lucide-react";
import Link from "next/link";
import { mutate } from "swr";

interface MonthlyBudgetCardProps {
  monthlyBudget: MonthlyBudget;
}

export default function MonthlyBudgetCard({ monthlyBudget }: MonthlyBudgetCardProps) {
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
    mutate(routes.monthlyBudget.root);
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
      <Card className="w-[460px] h-[150px] border-1 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-zinc-900 text-lg font-medium">{monthlyBudget.description}</h2>
          <div className="flex items-center gap-1">
            <Badge>{getMonthNameFromDate(monthlyBudget.period)}</Badge>
            <PresentActions.Root>
              <PresentActionsOption>
                <ConfirmDialog confirmAction={handleDeleteById} />
              </PresentActionsOption>
            </PresentActions.Root>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <div className="flex items-start flex-col">
            <span className="text-zinc-600 text-base font-normal">Orçamento</span>
            <span className="text-zinc-900 text-2xl font-medium">{formatToBRL(monthlyBudget.budget.toString())}</span>
          </div>
          <div className="flex items-end">
            <Link className="app-button" href={`/monthlybudgets/${monthlyBudget.id}`}>
              <Eye />
              Visualizar
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
}

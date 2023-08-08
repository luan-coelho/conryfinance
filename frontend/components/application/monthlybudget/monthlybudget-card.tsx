"use client";

import Badge from "@/components/commons/badge";
import { ConfirmDialog } from "@/components/commons/confirm-dialog";
import { Card } from "@/components/ui/card";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import { getMonthNameFromDate } from "@/utils/dateutils";
import { toastError, toastSuccess } from "@/utils/toast";
import { EyeIcon } from "lucide-react";
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

  return (
    <>
      <Card className="w-full border-1 bg-white rounded-lg shadow p-6 flex justify-between">
        <div>
          <h2 className="text-zinc-900 text-base font-medium">{monthlyBudget.description}</h2>
          <Badge>{getMonthNameFromDate(monthlyBudget.period)}</Badge>
        </div>
        <div className="min-w-7 rounded border shadow p-2 flex flex-col items-center gap-2">
          <Link href={`/monthlybudgets/${monthlyBudget.id}`}>
            <EyeIcon className="text-blue-500" />
          </Link>

          <ConfirmDialog confirmAction={handleDeleteById} />
        </div>
      </Card>
    </>
  );
}

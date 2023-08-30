"use client";

import Badge from "@/components/commons/badge";
import { ConfirmDialog } from "@/components/commons/confirm-dialog";
import { PresentActions } from "@/components/commons/present-actions";
import PresentActionsOption from "@/components/commons/present-actions/present-actions-option";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import { getMonthNameFromDate } from "@/utils/dateutils";
import { Eye } from "lucide-react";
import Link from "next/link";
import { mutate } from "swr";
import api from "@/services/api";
import { buttonVariants } from "@/components/ui/button";

interface MonthlyBudgetCardProps {
  monthlyBudget: MonthlyBudget;
}

export default function MonthlyBudgetCard({ monthlyBudget }: MonthlyBudgetCardProps) {
  async function handleDeleteById() {
    await api.delete(`${routes.monthlyBudget.root}/${monthlyBudget.id}`)
      .then(() => {
        mutate(routes.monthlyBudget.root);
      });
  }

  function formatToBRL(value: string): string {
    const numberValue = parseFloat(value);

    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{monthlyBudget.description}</CardTitle>
          <div>
            <Badge period={monthlyBudget.period}>{getMonthNameFromDate(monthlyBudget.period)}</Badge>
            <PresentActions.Root>
              <PresentActionsOption>
                <ConfirmDialog confirmAction={handleDeleteById} />
              </PresentActionsOption>
            </PresentActions.Root>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-3 flex justify-between">
            <div className="flex items-start flex-col">
              <span className="text-zinc-600 text-base font-normal">Orçamento</span>
              <span className="text-zinc-900 text-2xl font-medium">{formatToBRL(monthlyBudget.budget.toString())}</span>
            </div>
            <Link className={buttonVariants({ variant: "outline" })} href={`/monthlybudgets/${monthlyBudget.id}`}>
              Visualizar
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

"use client";

import MonthlyBudgetCard from "@/components/application/monthlybudget/monthlybudget-card";
import MonthlyBudgetCardSkeleton from "@/components/application/monthlybudget/monthlybudget-card-skeleton";
import { MonthlyBudgetCreateForm } from "@/components/application/monthlybudget/monthlybudget-create-form";
import Title from "@/components/commons/title";
import Investment from "@/public/images/Investment.svg";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import { toastError } from "@/utils/toast";
import Image from "next/image";
import { useQuery } from "react-query";

export default function MonthlyBudgetsPage() {
  const { isLoading, isError, data, error } = useQuery<MonthlyBudget[]>("monthlyBudgets", fetchMonthlyBudgets);

  async function fetchMonthlyBudgets(): Promise<MonthlyBudget[]> {
    const response = await fetch(routes.monthlyBudget.root, {
      cache: "no-cache",
    });
    const json = await response.json();
    return json.data as MonthlyBudget[];
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Title>Orçamentos Mensais</Title>
        <MonthlyBudgetCreateForm setMonthlyBudgets={fetchMonthlyBudgets} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-2 mt-6">
          <MonthlyBudgetCardSkeleton />
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 mt-6">
          {data.map(mb => {
            return <MonthlyBudgetCard key={mb.id} monthlyBudget={mb} setMonthlyBudgets={fetchMonthlyBudgets} />;
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col gap-5">
          <Image src={Investment} width={200} height={200} alt="Picture of the author" />
          <span className="p-2 border rounded border-gray-400 border-dashed">
            Ainda não há nenhum orçamento cadastrado
          </span>
        </div>
      )}
    </>
  );
}

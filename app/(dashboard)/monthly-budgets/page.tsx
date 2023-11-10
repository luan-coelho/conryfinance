"use client";

import MonthlyBudgetForm from "@/components/application/monthlybudget/monthly-budget-form";
import MonthlyBudgetCard from "@/components/application/monthlybudget/monthlybudget-card";
import MonthlyBudgetCardSkeleton from "@/components/application/monthlybudget/monthlybudget-card-skeleton";
import { EmptyContent } from "@/components/commons/empty-content";
import Title from "@/components/commons/title";
import { useFetch } from "@/hooks/useFetch";
import Investment from "@/public/images/Investment.svg";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import Image from "next/image";

export default function MonthlyBudgetsPage() {
  const { isLoading, data: monthlyBudgets } = useFetch<MonthlyBudget[]>(routes.monthlyBudget.root);

  return (
    <>
      <Title>Orçamentos Mensais</Title>

      <div className="mt-3">
        <MonthlyBudgetForm />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          <MonthlyBudgetCardSkeleton />
        </div>
      ) : monthlyBudgets && monthlyBudgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {monthlyBudgets.map((mb: MonthlyBudget) => {
            return <MonthlyBudgetCard key={mb.id} monthlyBudget={mb} />;
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col gap-5 mt-5">
          <Image src={Investment} width={200} height={200} alt="Picture of the author" />
          <EmptyContent>Ainda não há nenhum orçamento cadastrado</EmptyContent>
        </div>
      )}
    </>
  );
}

"use client";

import MonthlyBudgetCard from "@/components/application/monthlybudget/monthlybudget-card";
import MonthlyBudgetCardSkeleton from "@/components/application/monthlybudget/monthlybudget-card-skeleton";
import MonthlyBudgetCreateForm from "@/components/application/monthlybudget/monthlybudget-create-form";
import Title from "@/components/commons/title";
import Investment from "@/public/images/Investment.svg";
import Image from "next/image";
import { NoData } from "@/components/commons/no-data";
import { useFetchAllMonthlyBudgets } from "@/services/monthly-budget-service";
import { MonthlyBudget } from "@/types";

export default function MonthlyBudgetsPage() {
  const { isLoading, data: monthlyBudgets, error } = useFetchAllMonthlyBudgets();

  return (
    <>
      <div className="flex items-center justify-between">
        <Title>Orçamentos Mensais</Title>
        <MonthlyBudgetCreateForm />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-3 mt-6">
          <MonthlyBudgetCardSkeleton />
        </div>
      ) : monthlyBudgets.data && monthlyBudgets.data.length > 0 ? (
        <div className="grid grid-cols-3 gap-3 mt-6">
          {monthlyBudgets.data.map((mb: MonthlyBudget) => {
            return <MonthlyBudgetCard key={mb.id} monthlyBudget={mb} />;
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col gap-5 mt-5">
          <Image src={Investment} width={200} height={200} alt="Picture of the author" />
          <NoData>Ainda não há nenhum orçamento cadastrado</NoData>
        </div>
      )}
    </>
  );
}

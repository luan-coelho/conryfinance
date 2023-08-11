"use client";

import MonthlyBudgetCard from "@/components/application/monthlybudget/monthlybudget-card";
import MonthlyBudgetCardSkeleton from "@/components/application/monthlybudget/monthlybudget-card-skeleton";
import MonthlyBudgetCreateForm from "@/components/application/monthlybudget/monthlybudget-create-form";
import Title from "@/components/commons/title";
import Investment from "@/public/images/Investment.svg";
import { routes } from "@/routes";
import { MonthlyBudget, ResponseData } from "@/types";
import Image from "next/image";
import useSWR from "swr";
import { getAllMonthlyBudgets } from "@/services/monthly-budget-service";

export default function MonthlyBudgetsPage() {
  const { data, isLoading, error } = useSWR<ResponseData<MonthlyBudget>>(
    routes.monthlyBudget.root,
    getAllMonthlyBudgets,
  );

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
      ) : data?.data && data?.data.length > 0 ? (
        <div className="grid grid-cols-3 gap-3 mt-6">
          {data?.data.map(mb => {
            return <MonthlyBudgetCard key={mb.id} monthlyBudget={mb} />;
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

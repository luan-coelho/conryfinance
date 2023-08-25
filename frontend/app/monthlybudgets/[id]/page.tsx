"use client";

import AmountCard from "@/components/application/monthlybudget/card/amount-card";
import BudgetCard from "@/components/application/monthlybudget/card/budget-card";
import EmptyAmountCard from "@/components/application/monthlybudget/card/empty-amount-card";
import Badge from "@/components/commons/badge";
import Title from "@/components/commons/title";
import { getMonthNameFromDate } from "@/utils/dateutils";
import { PlusCircle } from "lucide-react";
import { useFetchMonthlyBudgetById } from "@/services/monthly-budget-service";
import { MonthlyBudgetCard } from "@/types";

export default function MonthlyBudgetPage({ params }: { params: { id: string } }) {
  const { isLoading, data: monthlyBudget, error, mutate } = useFetchMonthlyBudgetById(params.id);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Title>{monthlyBudget.description}</Title>
          <Badge>{getMonthNameFromDate(monthlyBudget.period)}</Badge>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-3">
        <div className="col-span-10 flex flex-col gap-4">
          {monthlyBudget.cards &&
            monthlyBudget.cards.map((card: MonthlyBudgetCard) => {
              return <AmountCard key={card.id} card={card} />;
            })}
          <div
            onClick={() => mutate()}
            className="bg-lightblue-500 hover:bg-blue-500 text-white rounded px-2 py-2 w-full flex items-center justify-center">
            <PlusCircle className="mr-2" /> Cadastrar
          </div>
        </div>

        <div className="col-span-2 flex gap-2 flex-col">
          <BudgetCard
            className="bg-blue-600 text-white"
            description={"Orçamento"}
            monthlyBudget={monthlyBudget}
          />
          <EmptyAmountCard
            className="bg-green-600 text-white"
            description={"Disponivel"}
            amount={monthlyBudget.remainingTotalAmount}
          />
          <EmptyAmountCard
            className="bg-red-600 text-white"
            description={"Total"}
            amount={monthlyBudget.totalAmountSpent}
          />
        </div>
      </div>
    </>
  );
}

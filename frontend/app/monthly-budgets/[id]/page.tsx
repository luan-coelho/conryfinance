"use client";

import AmountCard from "@/components/application/monthlybudget/card/amount-card";
import BudgetCard from "@/components/application/monthlybudget/card/budget-card";
import EmptyAmountCard from "@/components/application/monthlybudget/card/empty-amount-card";
import Badge from "@/components/commons/badge";
import Title from "@/components/commons/title";
import { getMonthNameFromDate } from "@/utils/dateutils";
import { PlusCircle } from "lucide-react";
import { MonthlyBudget, MonthlyBudgetCard } from "@/types";
import { useFetch } from "@/hooks/useFetch";
import { routes } from "@/routes";
import api from "@/services/api";
import { Button } from "@/components/ui/button";

export default function MonthlyBudgetPage({ params }: { params: { id: string } }) {
  const url = `${routes.monthlyBudget.root}/${params.id}`;
  const { isLoading, data: monthlyBudget, error, mutate } = useFetch<MonthlyBudget>(url);

  async function createNewCard() {
    await api.post(`${routes.monthlyBudgetCard.root}?monthlybudget=${monthlyBudget!.id}`)
      .then((response) => {
        if (response.status == 201) {
          mutate();
        }
      });
  }

  return (
    <>
      {!isLoading &&
        <div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Title>{monthlyBudget!.description}</Title>
              <Badge>{getMonthNameFromDate(monthlyBudget!.period)}</Badge>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <div className="flex flex-col gap-4">
              {monthlyBudget!.cards &&
                monthlyBudget!.cards.map((card: MonthlyBudgetCard) => {
                  return <AmountCard key={card.id} monthlyBudgetId={monthlyBudget!.id} card={card} />;
                })}
              <Button
                onClick={createNewCard}
                className="items-center gap-1">
                <PlusCircle /> Cadastrar
              </Button>
            </div>

            <div className="flex gap-2 flex-col">
              <BudgetCard
                className="bg-blue-400 text-white border-blue-500"
                description={"Orçamento"}
                monthlyBudget={monthlyBudget!}
              />
              <EmptyAmountCard
                className="bg-green-400 text-white border-green-500"
                description={"Disponível"}
                amount={monthlyBudget!.remainingTotalAmount}
              />
              <EmptyAmountCard
                className="bg-red-400 text-white border-red-500"
                description={"Total"}
                amount={monthlyBudget!.totalAmountSpent}
              />
            </div>
          </div>
        </div>
      }
    </>
  );
}

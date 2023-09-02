"use client";

import AmountCard from "@/components/application/monthlybudget/card/amount-card";
import Badge from "@/components/commons/badge";
import Title from "@/components/commons/title";
import { getMonthNameFromDate } from "@/utils/dateutils";
import { ArrowDown, ArrowUp, CircleDollarSign, PlusCircle } from "lucide-react";
import { MonthlyBudget, MonthlyBudgetCard } from "@/types";
import { useFetch } from "@/hooks/useFetch";
import { routes } from "@/routes";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <div className="w-full flex flex-col gap-4">
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

            <Card className="md:w-5/12 h-full">
              <CardHeader
                className="bg-zinc-800 flex items-center justify-center text-center font-medium text-white rounded-t-xl rounded-b-3xl">
                <CircleDollarSign size={35} />
                <CardTitle className="text-xl">Orçamento</CardTitle>
                <span className="text-4xl">R${monthlyBudget?.budget}</span>
              </CardHeader>
              <CardContent className="px-3 py-4">

                <div className="px-4">
                  <div className="flex items-center gap-2 flex-col">
                    <div
                      className="flex items-center bg-green-100 border text-green-500 border-green-500 rounded-full px-2 py-1">
                      <ArrowUp /> <span className="text-sm font-medium">Total Disponível</span>
                    </div>
                    <span className="text-zinc-900 text-2xl font-medium">R${monthlyBudget?.remainingTotalAmount}</span>
                  </div>

                  <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>

                  <div className="flex items-center gap-2 flex-col">
                    <div
                      className="flex items-center bg-red-100 border text-red-500 border-red-500 rounded-full px-2 py-1">
                      <ArrowDown /> <span className="text-sm font-medium">Total Gasto</span>
                    </div>
                    <span className="text-zinc-900 text-2xl font-medium">R${monthlyBudget?.totalAmountSpent}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    </>
  );
}

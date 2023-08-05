"use client";

import AmountCard from "@/components/application/monthlybudget/card/amount-card";
import { AmountCardCreateForm } from "@/components/application/monthlybudget/card/amout-card-create-form";
import EmptyAmountCard from "@/components/application/monthlybudget/card/empty-amount-card";
import Title from "@/components/commons/title";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import { getMonthNameFromDate } from "@/utils/dateutils";
import { toastError } from "@/utils/toast";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function MonthlyBudgetPage({ params }: { params: { id: string } }) {
  const monthlyBudgetId = params.id;
  const [monthlyBudget, setMonthlyBudget] = useState<MonthlyBudget>({} as MonthlyBudget);

  useEffect(() => {
    fetchMonthBudgetById();
  }, []);

  async function fetchMonthBudgetById() {
    const response = await fetch(`${routes.monthlyBudget.root}/${monthlyBudgetId}`, {
      cache: "no-cache",
    });

    if (!response.ok) {
      toastError("Failed to fetch data");
    }

    const json = await response.json();
    const monthlyBudget = json as MonthlyBudget;
    setMonthlyBudget(monthlyBudget);
  }

  async function fetchCreateCard() {
    const response = await fetch(`${routes.monthlyBudgetCard.root}?monthlybudget=${monthlyBudget.id}`, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
    });

    if (!response.ok) {
      toastError("Failed to fetch data");
    }

    fetchMonthBudgetById();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Title>{monthlyBudget.description}</Title>
          <div className="bg-blue-600 text-white rounded-2xl py-0 opacity-75 p-2">
            <span className="text-sm opacity-100">{getMonthNameFromDate(monthlyBudget.period)}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-2">
          {monthlyBudget.cards &&
            monthlyBudget.cards.map(card => {
              return <AmountCard className="w-[500px]" key={card.id} card={card} />;
            })}
          <div
            onClick={fetchCreateCard}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded px-2 py-2 w-full flex items-center justify-center">
            <PlusCircle className="mr-2" /> Cadastrar
          </div>
        </div>

        <div className="flex gap-2 flex-col">
          <EmptyAmountCard className="bg-blue-600 text-white" description={"Orçamento"} amount="0,00" />
          <EmptyAmountCard className="bg-green-600 text-white" description={"Disponivel"} amount="0,00" />
          <EmptyAmountCard className="bg-red-600 text-white" description={"Total"} amount="0,00" />
        </div>
      </div>
    </div>
  );
}

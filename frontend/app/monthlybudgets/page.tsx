"use client";

import MonthlyBudgetCard from "@/components/application/MonthlyBudget";
import Title from "@/components/commons/Title";
import { MonthlyBudget } from "@/types";
import { MonthlyBudgetForm } from "@/components/application/MonthlyBudget/Form";
import { useEffect, useState } from "react";
import { toastError } from "@/utils/toast";
import { routes } from "@/routes";

export default function MonthlyBudgetsPage() {
  const [monthlyBudgets, setMonthlyBudgets] = useState<MonthlyBudget[]>([]);

  useEffect(() => {
    fetchMonthlyBudgets();
  }, []);

  async function fetchMonthlyBudgets() {
    const response = await fetch(routes.monthlyBudget.root, {
      cache: "no-cache",
    });

    if (!response.ok) {
      toastError("Failed to fetch data");
    }

    const json = await response.json();
    const monthlyBudgets = json.data as MonthlyBudget[];
    setMonthlyBudgets(monthlyBudgets);
  }

  return (
    <div>
      <Title>Orçamentos Mensais</Title>
      <div className="grid sm:grid-cols-1 grid-cols-1 gap-2 place-content-center place-items-center">
        {monthlyBudgets.map(mb => {
          return <MonthlyBudgetCard key={mb.id} monthlyBudget={mb} />;
        })}
      </div>
      <div className="mt-4">
        <MonthlyBudgetForm setMonthlyBudgets={fetchMonthlyBudgets} />
      </div>
    </div>
  );
}

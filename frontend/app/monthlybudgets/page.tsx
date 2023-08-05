"use client";

import MonthlyBudgetCard from "@/components/application/monthlybudget/monthlybudget-card";
import Title from "@/components/commons/title";
import { MonthlyBudget } from "@/types";
import { MonthlyBudgetCreateForm } from "@/components/application/monthlybudget/form";
import { useEffect, useState } from "react";
import { toastError } from "@/utils/toast";
import { routes } from "@/routes";
import Investment from "@/public/images/Investment.svg";
import Image from "next/image";

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
      {monthlyBudgets.length > 0 ? (
        <div className="grid sm:grid-cols-1 grid-cols-1 gap-2 place-content-center place-items-center">
          {monthlyBudgets.map(mb => {
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
      <div className="mt-4">
        <MonthlyBudgetCreateForm setMonthlyBudgets={fetchMonthlyBudgets} />
      </div>
    </div>
  );
}

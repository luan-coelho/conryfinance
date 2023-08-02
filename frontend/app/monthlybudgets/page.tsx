import MonthlyBudgetCard from "@/components/application/MonthlyBudget";
import Title from "@/components/commons/Title";
import { MonthlyBudget } from "@/types";

async function fetchMonthlyBudgets() {
  const res = await fetch(`${process.env.BASEAPI_URL}/montlybudget`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function MonthlyBudgetsPage() {
  const response = await fetchMonthlyBudgets();
  const montlyBudgets = response.data as MonthlyBudget[];

  return (
    <div>
      <Title>Orçamentos Mensais</Title>
      <div className="grid grid-cols-4 gap-4">
        {montlyBudgets.map((mb) => {
          return (<MonthlyBudgetCard key={mb.id} monthlyBudget={mb} />);
        })}
      </div>
    </div>
  );
}

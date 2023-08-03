import MonthlyBudgetCard from "@/components/application/MonthlyBudget";
import Title from "@/components/commons/Title";
import { MonthlyBudget } from "@/types";
import { MonthlyBudgetForm } from "@/components/application/MonthlyBudget/Form";

async function fetchMonthlyBudgets() {
  const res = await fetch(`${process.env.BASEAPI_URL}/monthlybudget`, {
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
      <div className="grid sm:grid-cols-1 grid-cols-1 gap-2 place-content-center place-items-center">
        {montlyBudgets.map((mb) => {
          return (<MonthlyBudgetCard key={mb.id} monthlyBudget={mb} />);
        })}
      </div>
      <div className="mt-4">
        <MonthlyBudgetForm />
      </div>
    </div>
  );
}

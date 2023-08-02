import { MonthlyBudget } from "@/types";
import Title from "@/components/commons/Title";
import AmountCard from "@/components/application/AmountCard";

async function fetchMonthBudgetById(montlyBudgetId: string) {
  const response = await fetch(`${process.env.BASEAPI_URL}/montlybudget/${montlyBudgetId}`,
    { cache: "no-cache" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default async function MonthlyBudgetPage({ params }: { params: { id: string }; }) {
  const response = await fetchMonthBudgetById(params.id);
  const monthlyBudget = response as MonthlyBudget;

  return <>
    <Title>{monthlyBudget.description}</Title>
    <div className="grid grid-cols-3 gap-3">
      {monthlyBudget.cards.map((card) => {
        return (<AmountCard key={card.id} card={card} />);
      })}
    </div>
  </>;
}

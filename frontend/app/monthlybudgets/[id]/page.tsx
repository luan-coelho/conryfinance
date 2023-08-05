import AmountCard from "@/components/application/monthlybudget/card/amount-card";
import EmptyAmountCard from "@/components/application/monthlybudget/card/empty-amount-card";
import Title from "@/components/commons/title";
import { CardType, MonthlyBudget } from "@/types";

async function fetchMonthBudgetById(montlyBudgetId: string) {
  const response = await fetch(`${process.env.BASEAPI_URL}/monthlybudget/${montlyBudgetId}`, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default async function MonthlyBudgetPage({ params }: { params: { id: string } }) {
  const response = await fetchMonthBudgetById(params.id);
  const monthlyBudget = response as MonthlyBudget;

  return (
    <>
      <Title>{monthlyBudget.description}</Title>
      <div className="flex gap-3">
        <div className="flex flex-col gap-2">
          {monthlyBudget.cards.map(card => {
            return card.cardType == CardType.DEFAULT && <AmountCard className="w-[500px]" key={card.id} card={card} />;
          })}
        </div>

        <div className="flex flex-col gap-2">
          {monthlyBudget.cards.map(card => {
            return (
              card.cardType != CardType.DEFAULT && <EmptyAmountCard className="w-[200px]" key={card.id} card={card} />
            );
          })}
        </div>
      </div>
    </>
  );
}

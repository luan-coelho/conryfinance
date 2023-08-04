import AmountCard from "@/components/application/monthlybudget/amountcard";
import Title from "@/components/commons/title";
import { CardType, MonthlyBudget } from "@/types";

async function fetchMonthBudgetById(montlyBudgetId: string) {
  const response = await fetch(`${process.env.BASEAPI_URL}/monthlybudget/${montlyBudgetId}`, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

function getClassByCardType(cardType: CardType): string {
  if (cardType == CardType.TOTAL_AVAILABLE || cardType == CardType.TOTAL_AMOUNT_SPENT) {
    return "w-[150px]";
  }
  return "w-[300px]";
}

export default async function MonthlyBudgetPage({ params }: { params: { id: string } }) {
  const response = await fetchMonthBudgetById(params.id);
  const monthlyBudget = response as MonthlyBudget;

  return (
    <>
      <Title>{monthlyBudget.description}</Title>
      <div className="grid grid-cols-1 gap-3">
        {monthlyBudget.cards.map(card => {
          return <AmountCard className={getClassByCardType(card.cardType)} key={card.id} card={card} />;
        })}
      </div>
    </>
  );
}

import { Card } from "@/components/ui/card";
import { MonthlyBudgetCard } from "@/types";
import AmountCardItem from "@/components/application/monthlybudget/amountcarditem";

interface AmountCardProps {
  card: MonthlyBudgetCard;
}

export default function AmountCard({ card }: AmountCardProps) {
  return (
    <Card className="bg-white border-1 rounded-xl shadow min-w-[300px] p-3">
      <div>
        <h2 className="text-base font-bold">{card.description}</h2>
        <div className="mt-2">
          {card.cardItems.map(cardItem => {
            return <AmountCardItem key={cardItem.id} cardItem={cardItem} />;
          })}
        </div>
      </div>
    </Card>
  );
}

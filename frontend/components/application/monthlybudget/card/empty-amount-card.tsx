import { Card } from "@/components/ui/card";
import { MonthlyBudgetCard } from "@/types";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type EmptyAmountCardProps = ComponentProps<"div"> & {
  card: MonthlyBudgetCard;
};

export default function EmptyAmountCard({ card, className }: EmptyAmountCardProps) {
  return (
    <Card className={twMerge("bg-white border-1 rounded-xl shadow p-3 min-h-[130px]", className)}>
      <div className="flex flex-col">
        <h2 className="text-base font-bold">{card.description}</h2>
        <div className="text-4xl">R${card.amount}</div>
      </div>
    </Card>
  );
}

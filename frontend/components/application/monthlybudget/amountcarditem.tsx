import { MonthlyBudgetCardItem } from "@/types";
import * as React from "react";

type AmountCardItemProps = {
  cardItem: MonthlyBudgetCardItem;
};

export default function AmountCardItem({ cardItem }: AmountCardItemProps) {
  return (
    <div className="border rounded-xl px-2 min-w-full">
      <div className="flex gap-2 justify-between">
        <span>{cardItem.description}</span>
        <span className="font-bold">R${cardItem.amount}</span>
      </div>
    </div>
  );
}
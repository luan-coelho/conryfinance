import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import { MonthlyBudgetCardItem } from "@/types";
import { Trash } from "lucide-react";
import * as React from "react";

type AmountCardItemProps = {
  cardItem: MonthlyBudgetCardItem;
  updateCard: Function;
};

export default function AmountCardItem({ cardItem, updateCard }: AmountCardItemProps) {
  async function handleDeleteById() {
    const response = await fetch(`${routes.monthlyBudgetCardItem.root}/${cardItem.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });

    updateCard();
  }

  return (
    <div className="border rounded px-2 py-1 min-w-full">
      <div className="text-gray-800 flex gap-2 items-center justify-between">
        <div className="flex flex-col justify-between">
          <span className="text-base font-semibold">{cardItem.description}</span>
          <span className="text-sm">20/02/2023</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl font-bold">R${cardItem.amount}</span>
          <Button onClick={handleDeleteById} className="text-gray-500 hover:text-gray-400 p-0">
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
}

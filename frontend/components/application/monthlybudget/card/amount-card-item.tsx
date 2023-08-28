import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import { MonthlyBudgetCardItem } from "@/types";
import { Trash2 } from "lucide-react";
import * as React from "react";
import { mutate } from "swr";

type AmountCardItemProps = {
  cardItem: MonthlyBudgetCardItem;
  monthlyBudgetId: number
};

export default function AmountCardItem({ cardItem, monthlyBudgetId }: AmountCardItemProps) {
  async function handleDeleteById() {
    await fetch(`${routes.monthlyBudgetCardItem.root}/${cardItem.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });

    await mutate(`${routes.monthlyBudget.root}/${monthlyBudgetId}`);
  }

  function formatToBRL(value: string): string {
    const numberValue = parseFloat(value);

    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div className="border rounded px-2 py-1 min-w-full">
      <div className="text-gray-800 flex gap-2 items-center justify-between">
        <div className="flex flex-col justify-between">
          <span className="text-base font-semibold">{cardItem.description}</span>
          <span className="text-sm">20/02/2023</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl font-bold">{formatToBRL(cardItem.amount.toString())}</span>
          <Button onClick={handleDeleteById} className="bg-white text-gray-500 hover:text-gray-400 p-0">
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
}

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
    <div className="min-w-full border rounded-xl pl-3 pr-2 py-1">
      <div className="text-gray-800 flex gap-2 items-center justify-between">
        <div className="flex flex-col justify-between">
          <span className="text-base font-medium">{cardItem.description}</span>
          <span className="text-sm">20/02/2023</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl font-medium">{formatToBRL(cardItem.amount.toString())}</span>
          <Button onClick={handleDeleteById} className="hover:bg-red-100 hover:border hover:border-red-600 text-red-600 p-1 rounded-xl">
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}

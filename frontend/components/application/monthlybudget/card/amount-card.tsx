"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MonthlyBudgetCard } from "@/types";
import { PlusCircle } from "lucide-react";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import AmountCardItem from "./amount-card-item";
import { toastError } from "@/utils/toast";
import { routes } from "@/routes";
import { PresetActions } from "@/components/commons/actions";

type AmountCardProps = ComponentProps<"div"> & {
  card: MonthlyBudgetCard;
  updateMonthlyCard: Function;
};

export default function AmountCard({ card, updateMonthlyCard, className }: AmountCardProps) {
  const [description, setDescription] = useState<string>();

  async function fetchCreateCardItem() {
    const response = await fetch(`${routes.monthlyBudgetCardItem.root}?card=${card.id}`, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      body: JSON.stringify({ description: description }),
    });

    if (!response.ok) {
      toastError("Failed to fetch data");
    }

    updateMonthlyCard();
  }

  return (
    <Card className={twMerge("bg-white border-1 rounded-xl shadow p-3 min-h-[130px]", className)}>
      <div className="flex flex-col justify-between gap-2 h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">{card.description}</h2>
          <PresetActions cardId={card.id} updateMonthlyBudgets={updateMonthlyCard} />
        </div>

        <div>
          {card.cardItems.length > 0 ? (
            <div className="flex gap-1 flex-col">
              {card.cardItems.map(cardItem => {
                return <AmountCardItem key={cardItem.id} cardItem={cardItem} />;
              })}
            </div>
          ) : (
            <span className="text-center p-2 border rounded border-gray-400 border-dashed">
              Ainda não há nenhum orçamento cadastrado
            </span>
          )}
        </div>

        <div>
          <div className="group flex items-center gap-2">
            <Input
              id="description"
              placeholder="Descrição do item"
              className="col-span-3 min-w-full border-gray-300 group-hover:border-green-600 delay-100 rounded"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <div className="relative right-[7.5rem]">
              <Button
                onClick={fetchCreateCardItem}
                className="flex items-center justify-center gap-1 group-hover:text-green-600 delay-100">
                <span>Adicionar</span>
                <PlusCircle />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

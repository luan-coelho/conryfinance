"use client";

import { PresetActions } from "@/components/commons/actions";
import { NoData } from "@/components/commons/no-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { routes } from "@/routes";
import { MonthlyBudgetCard } from "@/types";
import { toastError } from "@/utils/toast";
import { Check, PlusCircle, X } from "lucide-react";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

import AmountCardItem from "./amount-card-item";

type AmountCardProps = ComponentProps<"div"> & {
  card: MonthlyBudgetCard;
  updateMonthlyCard: Function;
};

export default function AmountCard({ card, updateMonthlyCard, className }: AmountCardProps) {
  const [description, setDescription] = useState<string>();
  const [editDescriptionCard, setEditDescriptionCard] = useState<boolean>(false);
  const [descriptionCard, setDescriptionCard] = useState<string>(card.description);

  function changeDescription() {
    const input = document.getElementById("card-description") as HTMLInputElement;
    input.focus();
    setEditDescriptionCard(false);
  }

  async function fetchCreateCardItem() {
    const response = await fetch(`${routes.monthlyBudgetCardItem.root}?card=${card.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      mode: "cors",
      body: JSON.stringify({ description: description }),
    });

    if (!response.ok) {
      toastError("Failed to fetch data");
    }

    updateMonthlyCard();
    setDescription("");
  }

  async function fetchUpdateCardDescription() {
    const response = await fetch(`${routes.monthlyBudgetCard.updateDescription}/${card.id}`, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ newDescription: descriptionCard }),
    });

    if (!response.ok) {
      toastError("Failed to fetch data");
    }

    updateMonthlyCard();
  }

  return (
    <Card className={twMerge("bg-white border-1 rounded-xl shadow p-3 min-h-[130px]", className)}>
      <div className="flex flex-col justify-between gap-2 h-full">
        <div className="flex items-center justify-between gap-2">
          {editDescriptionCard ? (
            <div className="flex border rounded-md w-full">
              <Input
                id="card-description"
                className="col-span-3 w-full border-2 border-blue-500 delay-100 rounded-l-lg"
                value={descriptionCard}
                onChange={e => setDescriptionCard(e.target.value)}
              />
              <Button
                onClick={fetchUpdateCardDescription}
                className="px-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                <Check />
              </Button>
              <Button
                onClick={() => setEditDescriptionCard(false)}
                className="px-2 bg-red-500 text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                <X />
              </Button>
            </div>
          ) : (
            <h2 onDoubleClick={() => setEditDescriptionCard(true)} className="text-lg font-bold">
              {card.description}
            </h2>
          )}
          <PresetActions cardId={card.id} updateMonthlyBudgets={updateMonthlyCard} />
        </div>

        {card.cardItems.length > 0 ? (
          <div className="flex gap-1 flex-col">
            {card.cardItems.map(cardItem => {
              return <AmountCardItem key={cardItem.id} updateCard={updateMonthlyCard} cardItem={cardItem} />;
            })}
          </div>
        ) : (
          <NoData text="Ainda não há nenhum orçamento cadastrado" />
        )}

        <div>
          <div className="group flex items-center gap-2">
            <Input
              id="description"
              placeholder="Descrição do item"
              className="col-span-3 min-w-full placeholder:text-gray-500 border-gray-300 group-hover:border-2 group-hover:border-green-600 delay-100 rounded"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <div className="relative right-[7.5rem]">
              <Button
                disabled={!description}
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

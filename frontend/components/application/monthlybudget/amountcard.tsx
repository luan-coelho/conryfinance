"use client";

import AmountCardItem from "@/components/application/monthlybudget/amountcarditem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CardType, MonthlyBudgetCard } from "@/types";
import { PlusCircle } from "lucide-react";
import { ComponentProps, HtmlHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

type AmountCardProps = ComponentProps<"div"> & {
  card: MonthlyBudgetCard;
};

export default function AmountCard({ card, className }: AmountCardProps) {
  const [description, setDescription] = useState<string>();

  return (
    <Card className={twMerge("bg-white border-1 rounded-xl shadow p-3", className)}>
      <div>
        <h2 className="text-base font-bold">{card.description}</h2>
        <div className="mt-2">
          {card.cardItems.map(cardItem => {
            return <AmountCardItem key={cardItem.id} cardItem={cardItem} />;
          })}

          <div className="text-3xl">R${card.amount}</div>

          {CardType[card.cardType] == CardType.DEFAULT && (
            <div className="flex items-center gap-2">
              <Input
                id="description"
                placeholder="Descrição do item"
                className="col-span-3 min-w-full rounded"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />

              <div className="relative right-14">
                <Button>
                  <PlusCircle className="text-green-600" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

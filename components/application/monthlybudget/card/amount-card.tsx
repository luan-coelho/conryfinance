"use client";

import { EmptyContent } from "@/components/commons/empty-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { routes } from "@/routes";
import { MonthlyBudgetCard } from "@/types";
import { Calendar as CalendarIcon, Check, Gem, PlusCircle, X } from "lucide-react";
import React, { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select } from "@/components/ui/select";

import AmountCardItem from "./amount-card-item";
import ptBR from "date-fns/locale/pt-BR";
import { mutate } from "swr";

type AmountCardProps = ComponentProps<"div"> & {
  card: MonthlyBudgetCard;
  monthlyBudgetId: number
};

export default function AmountCard({ card, monthlyBudgetId }: AmountCardProps) {
  const [description, setDescription] = useState<string>();
  const [amount, setAmount] = useState<string>();

  const [editDescriptionCard, setEditDescriptionCard] = useState<boolean>(false);
  const [descriptionCard, setDescriptionCard] = useState<string>(card.description);
  const [eventDateTime, setEventDateTime] = useState<Date>();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue) {
      const numberValue = parseFloat(numericValue) / 100;
      const formattedValue = numberValue.toLocaleString("pt-BR", { style: "decimal", minimumFractionDigits: 2 });

      setAmount(formattedValue);
    } else {
      setAmount("");
    }
  };

  function formatToGlobalNumber(value: string): string {
    const withoutThousandSeparator = value.replace(/\./g, "");
    return withoutThousandSeparator.replace(",", ".");
  }

  async function fetchCreateCardItem() {
    await fetch(`${routes.monthlyBudgetCardItem.root}?card=${card.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      mode: "cors",
      body: JSON.stringify({ description, amount: formatToGlobalNumber(amount!), eventDateTime }),
    });

    await mutate(`${routes.monthlyBudget.root}/${monthlyBudgetId}`);
  }

  async function fetchUpdateCardDescription() {
    await fetch(`${routes.monthlyBudgetCard.updateDescription}/${card.id}`, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ newDescription: descriptionCard }),
    });

    await mutate(`${routes.monthlyBudget.root}/${monthlyBudgetId}`);
  }

  return (
    <Card>
      <CardHeader>
        {editDescriptionCard ?
          <CardTitle className="flex border w-full">
            <Input
              id="card-description"
              className="col-span-3 w-full border-2 input rounded-l-xl"
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
          </CardTitle>
          :
          <CardTitle
            onDoubleClick={() => setEditDescriptionCard(true)}
            className="text-zinc-900 text-base font-medium">
            {card.description}
          </CardTitle>
        }
      </CardHeader>
      <CardContent>
        {card.cardItems.length > 0 ? (
          <div className="mt-4 flex gap-1 flex-col">
            {card.cardItems.map(cardItem => {
              return <AmountCardItem key={cardItem.id} monthlyBudgetId={monthlyBudgetId} cardItem={cardItem} />;
            })}
          </div>
        ) : (
          <div className="w-full">
            <EmptyContent>Ainda não há nenhum item cadastrado</EmptyContent>
          </div>
        )}

        <div className="grid grid-cols-12 items-center gap-2">
          <Input
            id="description"
            placeholder="Descrição do item"
            className="col-span-12 xl:col-span-5 input"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <div className="col-span-12 xl:col-span-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "input",
                    !eventDateTime && "text-muted-foreground",
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {eventDateTime ? <span>{format(eventDateTime, "dd/MM/yyyy")}</span> : <span>Data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white flex w-auto flex-col space-y-2 p-2">
                <Select onValueChange={value => setEventDateTime(addDays(new Date(), parseInt(value)))} />
                <div className="rounded-md border">
                  <Calendar mode="single" selected={eventDateTime} onSelect={setEventDateTime} locale={ptBR} />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="col-span-12 xl:col-span-2 flex items-center">
            <div className="bg-gray-100 flex items-center px-1 border h-10">
              <span className="rounded font-medium text-sm text-gray-500 p-1">R$</span>
            </div>
            <Input
              id="item-amount"
              placeholder="Valor"
              className="square-input"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>

          <Button
            onClick={fetchCreateCardItem}
            className="col-span-12 xl:col-span-2 app-button"
            disabled={!description || !amount || !eventDateTime}>
            <PlusCircle />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

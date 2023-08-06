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
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import AmountCardItem from "./amount-card-item";
import ptBR from "date-fns/locale/pt-BR";

type AmountCardProps = ComponentProps<"div"> & {
  card: MonthlyBudgetCard;
  updateMonthlyCard: Function;
};

export default function AmountCard({ card, updateMonthlyCard, className }: AmountCardProps) {
  const [description, setDescription] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [editDescriptionCard, setEditDescriptionCard] = useState<boolean>(false);
  const [descriptionCard, setDescriptionCard] = useState<string>(card.description);
  const [date, setDate] = useState<Date>();

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

        <div className="grid grid-cols-12 items-center gap-2">
          <Input
            id="description"
            placeholder="Descrição do item"
            className="col-span-4 input placeholder:text-gray-500"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <div className="col-span-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "text-gray-500 w-full justify-start text-left input",
                    !date && "text-muted-foreground",
                  )}>
                  <CalendarIcon className="text-gray-500 mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : <span className="text-gray-500">Data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white flex w-auto flex-col space-y-2 p-2">
                <Select onValueChange={value => setDate(addDays(new Date(), parseInt(value)))} />
                <div className="rounded-md border">
                  <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR} />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="col-span-2 flex items-center">
            <div className="bg-gray-200 flex items-center px-1 border border-gray-200 h-10">
              <span className="font-semibold text-gray-500">R$</span>
            </div>
            <Input
              id="item-amount"
              placeholder="Valor"
              className="square-input placeholder:text-gray-500"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          <Button
            disabled={!description || !amount || !date}
            onClick={fetchCreateCardItem}
            className="col-span-3 border border-green-600 flex items-center justify-center gap-1 text-green-600 delay-100">
            <PlusCircle />
            <span>Adicionar</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

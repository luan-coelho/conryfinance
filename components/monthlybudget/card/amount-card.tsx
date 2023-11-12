"use client";

import { EmptyContent } from "@/components/commons/empty-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { routes } from "@/routes";
import { MonthlyBudgetCard } from "@/types";
import { Check, PlusCircle, X } from "lucide-react";
import React, { ComponentProps, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import AmountCardItem from "./amount-card-item";
import { mutate } from "swr";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardItem } from "@prisma/client";
import api from "@/services/api";
import { Form } from "@/components/form";
import DatePicker from "react-datepicker";
import pt from "date-fns/locale/pt";

type AmountCardProps = ComponentProps<"div"> & {
  card: MonthlyBudgetCard;
  monthlyBudgetId: number
};

export default function AmountCard({ card, monthlyBudgetId }: AmountCardProps) {
  const [editDescriptionCard, setEditDescriptionCard] = useState<boolean>(false);
  const [descriptionCard, setDescriptionCard] = useState<string>(card.description);

  async function fetchCreateCardItem(cardItem: CardItem) {
    await api.post<CardItem>(`${routes.monthlyBudgetCardItem.root}?card=${card.id}`, cardItem);
    await mutate(`${routes.monthlyBudget.root}/${monthlyBudgetId}`);
    reset();
  }

  async function fetchUpdateCardDescription() {
    await api.post(`${routes.monthlyBudgetCard.updateDescription}/${card.id}`,
      { newDescription: descriptionCard });
    await mutate(`${routes.monthlyBudget.root}/${monthlyBudgetId}`);
  }

  const cardItemSchema = z.object({
    description: z.string()
      .min(1),
    eventDateTime: z.date(),
    amount: z.coerce.number().min(1),
  });

  const createCardItemForm = useForm<CardItem>({
    resolver: zodResolver(cardItemSchema),
    shouldUnregister: true,
    mode: "onChange",
  });

  const { handleSubmit, reset, control, formState } = createCardItemForm;

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
          <div className="flex gap-1 flex-col">
            {card.cardItems.map(cardItem => {
              return <AmountCardItem key={cardItem.id} monthlyBudgetId={monthlyBudgetId} cardItem={cardItem} />;
            })}
          </div>
        ) : (
          <div className="w-full">
            <EmptyContent>Ainda não há nenhum item cadastrado</EmptyContent>
          </div>
        )}

        <FormProvider {...createCardItemForm}>
          <form onSubmit={handleSubmit(fetchCreateCardItem)} className="grid grid-cols-12 items-center gap-2 mt-2">
            <div className="col-span-12 xl:col-span-5">
              <Form.Field>
                <Form.TextField name="description" className="input" placeholder="Descrição do item" />
              </Form.Field>
            </div>

            <div className="col-span-12 xl:col-span-3">
              <Form.Field>
                <Controller
                  control={control}
                  name="eventDateTime"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      locale={pt}
                      placeholderText="Data do item"
                      dateFormat="dd/MM/yyyy"
                      className="input"
                    />
                  )} />
              </Form.Field>
            </div>

            <div className="col-span-12 xl:col-span-2">
              <Form.Field>
                <Form.TextField name="amount" className="input" placeholder="Valor do item" />
              </Form.Field>
            </div>

            <Button
              type="submit"
              className="col-span-12 xl:col-span-2 app-button"
              disabled={!formState.isValid}>
              <PlusCircle />
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}

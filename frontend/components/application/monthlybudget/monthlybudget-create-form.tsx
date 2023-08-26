"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { routes } from "@/routes";
import { toastError, toastSuccess } from "@/utils/toast";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { mutate } from "swr";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addInputDateMask, stringToDate } from "@/utils/dateutils";
import { Form } from "@/components/form";
import { MonthlyBudget } from "@/types";

const schema = z.object({
  description: z.string()
    .nonempty("A descrição é obrigatória"),
  period: z.string()
    .nonempty("O período é obrigatório")
    .min(7, "Informe a data no padrão mês/ano")
    .transform((period) => {
        return stringToDate(period);
      },
    ).refine(date => {
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      return date! > currentDate;
    }, "A data não pode ser inferior que 1 ano atrás"),
});

export default function MonthlyBudgetCreateForm() {
  const [open, setOpen] = useState(false);

  const createMonthlyBudgetForm = useForm<MonthlyBudget>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control } = createMonthlyBudgetForm;

  async function createMonthlyBudget(monthlyBudget: MonthlyBudget) {
    const response = await fetch(routes.monthlyBudget.root, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(monthlyBudget),
    });

    if (!response.ok) {
      const json = await response.json();
      toastError(json.details);
      return;
    }
    toastSuccess("Orçamento mensal criado com sucesso!");
    await mutate(routes.monthlyBudget.root);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          onClick={() => {
            setOpen(true);
          }}
          className="app-button">
          <PlusCircle className="mr-2" /> Cadastrar
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] border border-gray-300 bg-white">

        <DialogHeader>
          <DialogTitle>Cadastrar</DialogTitle>
          <DialogDescription>Crie um novo orçamento mensal, seja pessoal, sua empresa, uma viagem...</DialogDescription>
        </DialogHeader>

        <FormProvider {...createMonthlyBudgetForm}>
          <form onSubmit={handleSubmit(createMonthlyBudget)} className="grid gap-4 py-4">
            <Form.Field>
              <Form.Label htmlFor="description">
                Descrição
              </Form.Label>
              <Form.TextField name="description" />
              <Form.ErrorMessage field="description" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="period">
                Período
              </Form.Label>
              <Controller
                name="period"
                control={control}
                render={({ field }) => (
                  // @ts-ignore
                  <Form.TextField name="period" value={field.value}
                                  onChange={(e) => addInputDateMask(e, field.onChange)}
                                  onBlur={field.onBlur} />
                )}
              />
              <Form.ErrorMessage field="period" />
            </Form.Field>
            <div>
              <Button className="app-button" type="submit">
                Cadastrar
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

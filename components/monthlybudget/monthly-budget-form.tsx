"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { routes } from "@/routes";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { mutate } from "swr";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/form";
import { ApiErrorResponse, MonthlyBudget } from "@/types";
import { useMessage } from "@/hooks/useMessage";
import { MessageRoot } from "@/components/message/message-root";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import pt from "date-fns/locale/pt";
import api from "@/services/api";
import { AxiosError } from "axios";

registerLocale("pt", pt);

const schema = z.object({
  description: z.string()
    .min(1, "A descrição é obrigatória"),
  period: z.date({
    required_error: "O período é obrigatório",
  }),
});

export default function MonthlyBudgetForm() {
  const [open, setOpen] = useState(false);
  const { message, showMessage, hideMessage } = useMessage();

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 2);

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 2);

  const createMonthlyBudgetForm = useForm<MonthlyBudget>({
    resolver: zodResolver(schema),
    shouldUnregister: true,
  });

  const { handleSubmit, control, reset } = createMonthlyBudgetForm;

  async function createMonthlyBudget(monthlyBudget: MonthlyBudget) {
    await api.post(routes.monthlyBudget.root, monthlyBudget)
      .then(() => {
        mutate(routes.monthlyBudget.root);
        reset({
          description: "",
          period: undefined,
        });
        hideMessage();
        setOpen(false);
      }).catch((error: AxiosError<ApiErrorResponse>) => {
        showMessage(error.response!.data.detail);
      });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger onClick={() => setOpen(true)} className={buttonVariants({ variant: "default" })}>
          Cadastrar
        </DialogTrigger>
        <DialogContent className="max-w-[425px] border border-gray-300 bg-white">

          <DialogHeader>
            <DialogTitle>Cadastrar</DialogTitle>
            <DialogDescription>
              Crie um novo orçamento mensal, seja pessoal, sua empresa, uma viagem...
            </DialogDescription>
          </DialogHeader>

          <MessageRoot value={message} />

          <FormProvider {...createMonthlyBudgetForm}>
            <form onSubmit={handleSubmit(createMonthlyBudget)} className="grid gap-4">
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
                  control={control}
                  name="period"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      locale={pt}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      className="input"
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  )} />
                <Form.ErrorMessage field="period" />
              </Form.Field>
              <DialogFooter>
                <Button type="submit">
                  Cadastrar
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}



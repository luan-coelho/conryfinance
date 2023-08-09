"use client";

import DateInput from "@/components/commons/datepicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/routes";
import { toastError, toastSuccess } from "@/utils/toast";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

interface MonthlyBudgetCreateFormProps {
  setMonthlyBudgets: Function;
}

export function MonthlyBudgetCreateForm({ setMonthlyBudgets }: MonthlyBudgetCreateFormProps) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState<string>();
  const [period, setPeriod] = useState<string>();

  function validateData(): boolean {
    if (!description || !period) {
      return false;
    }
    return true;
  }

  function resetData() {
    setDescription("");
    setPeriod("");
  }

  function handleSubmit() {
    if (validateData()) {
      createMonthlyBudget();
    } else {
      toastError("Preencha todos os campos!");
    }
  }

  async function createMonthlyBudget() {
    const periodDate = convertStringToDate(period!);

    const response = await fetch(routes.monthlyBudget.root, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ description, period: periodDate }),
    });

    if (!response.ok) {
      const json = await response.json();

      if (json.violations) {
        let messages = [] as string[];
        json.violations.forEach((v: { message: string }) => {
          messages.push(v.message);
        });
        messages.forEach(message => {
          toastError(message);
        });
      }
      return;
    }
    resetData();
    toastSuccess("Orçamento mensal criado com sucesso!");
    setMonthlyBudgets();
    setOpen(false);
  }

  function convertStringToDate(data: string): Date | null {
    if (!data || data.length < 5 || !data.includes("/")) {
      return null;
    }
    const parts = data.split("/");

    if (parts.length === 2 && parts[1].length === 4) {
      return new Date(parseInt(parts[1]), parseInt(parts[0]) - 1);
    }
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-lightblue-500 hover:bg-blue-500 text-white rounded px-2 py-0 w-full">
          <PlusCircle className="mr-2" /> Cadastrar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] border border-gray-300 bg-white">
        <DialogHeader>
          <DialogTitle>Cadastrar</DialogTitle>
          <DialogDescription>Crie um novo orçamento mensal, seja pessoal, sua empresa, uma viagem...</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Descrição</Label>
            <Input
              id="description"
              placeholder="Minhas despesas"
              className="col-span-3"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Período</Label>
            <DateInput setValue={setPeriod} value={period!} />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="bg-green-600 hover:bg-green-500 text-white rounded px-2"
            type="submit"
            onClick={handleSubmit}>
            Cadastrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

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
import React, { useState } from "react";
import DateInput from "@/components/application/DatePicker";

interface MonthlyBudgetCreateRequest {
  description: string,
  period: Date
}

export function MonthlyBudgetForm() {
  const [description, setDescription] = useState<string>("");
  const [period, setPeriod] = useState<string>();

  function validateData() {
    if (!description || !period) {
      console.log("informe os dados");
    }
  }

  function resetData() {
    setDescription("");
    setPeriod("");
  }

  async function createMonthlyBudget() {
    const url = `http://localhost:8080/api/monthlybudget`;
    const periodDate = convertStringToDate(period!);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ description, period: periodDate }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    resetData();
    return response.json();
  }

  function convertStringToDate(data: string): Date | null {
    const parts = data.split("/");

    if (parts.length === 2 && parts[1].length === 4) {
      return new Date(parseInt(parts[1]), parseInt(parts[0]) - 1);
    }
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500 text-white rounded px-2 py-0 w-full">Cadastrar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] border border-gray-300 bg-white">
        <DialogHeader>
          <DialogTitle>Cadastrar</DialogTitle>
          <DialogDescription>
            Crie um novo orçamento mensal, seja pessoal, sua empresa, uma viagem...
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">
              Descrição
            </Label>
            <Input id="description"
                   className="col-span-3"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">
              Período
            </Label>
            <DateInput setValue={setPeriod} value={period!} />
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-green-600 hover:bg-green-500 text-white rounded px-2" type="submit"
                  onClick={createMonthlyBudget}>Cadastrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

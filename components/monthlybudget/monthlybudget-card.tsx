"use client";

import Badge from "@/components/commons/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import { getMonthNameFromDate } from "@/utils/dateutils";
import Link from "next/link";
import { mutate } from "swr";
import api from "@/services/api";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";

interface MonthlyBudgetCardProps {
  monthlyBudget: MonthlyBudget;
}

export default function MonthlyBudgetCard({ monthlyBudget }: MonthlyBudgetCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const month = new Date(monthlyBudget.period).getMonth();

  const monthToColorMap = {
    0: "border-t-3 border-blue-500",
    1: "border-t-4 border-pink-500",
    2: "border-t-4 border-green-500",
    3: "border-t-4 border-purple-500",
    4: "border-t-4 border-yellow-500",
    5: "border-t-4 border-indigo-500",
    6: "border-t-4 border-red-500",
    7: "border-t-4 border-teal-500",
    8: "border-t-4 border-orange-500",
    9: "border-t-4 border-gray-500",
    10: "border-t-4 border-cyan-500",
    11: "border-t-4 border-pink-500",
  };

  const monthToBackgroundMap = {
    0: "bg-blue-600 hover:bg-blue-500",
    1: "bg-pink-600 hover:bg-pink-500",
    2: "bg-green-600 hover:bg-green-500",
    3: "bg-purple-600 hover:bg-purple-500",
    4: "bg-yellow-600 hover:bg-yellow-500",
    5: "bg-indigo-600 hover:bg-indigo-500",
    6: "bg-red-600 hover:bg-red-500",
    7: "bg-teal-600 hover:bg-teal-500",
    8: "bg-orange-600 hover:bg-orange-500",
    9: "bg-gray-600 hover:bg-gray-500",
    10: "bg-cyan-600 hover:bg-cyan-500",
    11: "bg-pink-600 hover:bg-pink-500",
  };
  // @ts-ignore
  const borderColor = monthToColorMap[month] || "border-t-4 border-green-500";
  // @ts-ignore
  const backgroundColor = monthToBackgroundMap[month] || "bg-green-600 hover:bg-green-500";

  async function handleDeleteById() {
    await api.delete(`${routes.monthlyBudget.root}/${monthlyBudget.id}`).then(() => {
      mutate(routes.monthlyBudget.root);
    });
  }

  function formatToBRL(value: string): string {
    const numberValue = parseFloat(value);

    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <>
      <Card className={borderColor}>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">{monthlyBudget.description}</CardTitle>
          <div className="flex items-center justify-center gap-1">
            <Badge period={monthlyBudget.period}>{getMonthNameFromDate(monthlyBudget.period)}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-8 h-8 px-2 py-2 bg-white hover:bg-gray-100 rounded-lg shadow border border-gray-300 text-gray-400 flex-col justify-start items-center gap-2 flex">
                  <MoreHorizontal size={"16px"} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)} className="text-red-600">
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-zinc-900 text-2xl font-medium">{formatToBRL(monthlyBudget.budget.toString())}</span>
            <Link
              className={`${buttonVariants({ variant: "default" })} ${backgroundColor}`}
              href={`/monthly-budgets/${monthlyBudget.id}`}>
              Visualizar
            </Link>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">
              Esta ação não poderá ser desfeita!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button onClick={handleDeleteById} variant="destructive">
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

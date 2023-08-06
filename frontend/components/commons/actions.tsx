"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ConfirmDialog } from "./confirm-dialog";

import { routes } from "@/routes";
import { toastError } from "@/utils/toast";

interface PresetActionsProps {
  cardId: number;
  updateMonthlyBudgets: Function;
}

export function PresetActions({ cardId, updateMonthlyBudgets }: PresetActionsProps) {
  async function handleDeleteById() {
    const response = await fetch(`${routes.monthlyBudgetCard.root}/${cardId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });

    if (!response.ok) {
      const json = await response.json();
      toastError(json.detail);
      return;
    }
    updateMonthlyBudgets();
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-gray-100 border rounded px-2 h-7" variant="secondary">
            <span className="sr-only">Actions</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white" align="end">
          <div className="text-red-600 flex items-center justify-center gap-2">
            Deletar
            <ConfirmDialog confirmAction={handleDeleteById} />
          </div>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

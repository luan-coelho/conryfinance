import prisma from "@/services/prisma-client";
import ProblemDetails from "@/utils/problem-details";
import { Card } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const monthlyBudgetId = Number.parseInt(searchParams.get("monthlybudget")!);

  const monthlyBudget = await prisma.monthlyBudget.findUnique({
    where: {
      id: monthlyBudgetId,
    },
  });

  if (!monthlyBudget) {
    const response = ProblemDetails.notFound({
      detail: "Orçamento mensal não encontrado pelo id",
      instance: request.url,
    });
    return NextResponse.json(response, { status: response.status });
  }

  const card = {
    description: "Descrição",
    monthlyBudgetId: monthlyBudgetId,
  } as Card;

  await prisma.card.create({
    data: card,
  });

  return NextResponse.json(card, { status: 201 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id);

  const existsById = await prisma.monthlyBudget.count({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!existsById) {
    const response = ProblemDetails.notFound({
      detail: "Orçamento mensal não encontrado pelo id",
      instance: request.url,
    });
    return NextResponse.json(response, { status: 400 });
  }

  await prisma.monthlyBudget.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(null, { status: 200 });
}

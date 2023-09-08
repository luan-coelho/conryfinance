import prisma from "@/services/prisma-client";
import ProblemDetails from "@/utils/problem-details";
import { MonthlyBudget } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const monthlyBudgets = await prisma.monthlyBudget.findMany();
  return NextResponse.json(monthlyBudgets);
}

export async function POST(request: NextRequest) {
  let monthlyBudget = (await request.json()) as MonthlyBudget;

  const existsByDescription = await prisma.monthlyBudget.count({
    where: {
      description: {
        equals: monthlyBudget.description,
      },
    },
  });

  if (existsByDescription) {
    const response = ProblemDetails.badRequest({
      detail: "Já existe um orçamento mensal cadastrado com esta descrição",
      instance: request.url,
    });
    return NextResponse.json(response, { status: response.status });
  }

  monthlyBudget = await prisma.monthlyBudget.create({
    data: monthlyBudget,
  });
  return NextResponse.json(monthlyBudget, { status: 201 });
}

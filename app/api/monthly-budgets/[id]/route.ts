import prisma from "@/services/prisma-client";
import ProblemDetails from "@/utils/problem-details";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id);

  const monthlyBudget = await prisma.monthlyBudget.findUnique({
    where: {
      id: id,
    },
  });

  if (!monthlyBudget) {
    const response = ProblemDetails.notFound({
      detail: "Orçamento mensal não encontrado pelo id",
      instance: request.url,
    });
    return NextResponse.json(response, { status: response.status });
  }

  return NextResponse.json(monthlyBudget);
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

import prisma from "@/services/prisma-client";
import ProblemDetails from "@/utils/problem-details";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id);

  const existsById = await prisma.cardItem.count({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!existsById) {
    const response = ProblemDetails.notFound({
      detail: "Item não encontrado pelo id",
      instance: request.url,
    });
    return NextResponse.json(response, { status: 400 });
  }

  await prisma.cardItem.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(null, { status: 200 });
}

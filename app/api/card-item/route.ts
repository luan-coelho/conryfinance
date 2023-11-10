import prisma from "@/services/prisma-client";
import ProblemDetails from "@/utils/problem-details";
import { CardItem } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cardId = Number.parseInt(searchParams.get("card")!);

  const card = await prisma.card.findUnique({
    where: {
      id: cardId,
    },
  });

  if (!card) {
    const response = ProblemDetails.notFound({
      detail: "Card não encontrado pelo id",
      instance: request.url,
    });
    return NextResponse.json(response, { status: response.status });
  }

  const cardItem = { ...await request.json(), cardId: cardId } as CardItem;

  await prisma.cardItem.create({
    data: cardItem,
  });

  return NextResponse.json(card, { status: 201 });
}
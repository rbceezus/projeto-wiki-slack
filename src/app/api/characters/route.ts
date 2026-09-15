import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const characters = await prisma.character.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(characters);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const character = await prisma.character.create({
    data: {
      name: body.name,
      imageUrl: body.imageUrl || "",
      description: body.description,
      dangerLevel: Number(body.dangerLevel) || 1,
      race: body.race,
      height: body.height,
      ability: body.ability || "",
      weakness: body.weakness || "",
      status: body.status || "Ativo",
    },
  });

  return NextResponse.json(character, { status: 201 });
}

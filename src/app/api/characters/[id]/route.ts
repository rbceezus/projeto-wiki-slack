import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const character = await prisma.character.findUnique({
    where: { id: Number(id) },
  });

  if (!character) {
    return NextResponse.json({ error: "Personagem não encontrado" }, { status: 404 });
  }

  return NextResponse.json(character);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.character.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}

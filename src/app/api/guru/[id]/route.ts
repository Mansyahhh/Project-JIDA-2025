import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const guru = await prisma.guru.findUnique({ where: { id: params.id } });
  return NextResponse.json(guru);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const guru = await prisma.guru.update({ where: { id: params.id }, data });
  return NextResponse.json(guru);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.guru.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Guru dihapus" });
}

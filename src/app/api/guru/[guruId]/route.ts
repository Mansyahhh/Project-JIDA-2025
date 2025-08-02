// src/app/api/guru/[guruId]/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { guruId: string } }
) {
  const guru = await prisma.guru.findUnique({ where: { id: params.guruId } });

  if (!guru) {
    return NextResponse.json(
      { error: "Guru tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(guru);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { guruId: string } }
) {
  const body = await req.json();

  const jenisKelaminMap: Record<string, "Laki_laki" | "Perempuan"> = {
    "Laki-laki": "Laki_laki",
    Perempuan: "Perempuan",
  };

  const updatedGuru = await prisma.guru.update({
    where: { id: params.guruId },
    data: {
      ...body,
      jenisKelamin: jenisKelaminMap[body.jenisKelamin] ?? body.jenisKelamin,
    },
  });

  return NextResponse.json(updatedGuru);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { guruId: string } }
) {
  await prisma.guru.delete({ where: { id: params.guruId } });
  return NextResponse.json({ message: "Guru berhasil dihapus" });
}

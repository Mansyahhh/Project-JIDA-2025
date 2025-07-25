import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GuruFormSchema } from "@/types/guru";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const guru = await prisma.guru.findUnique({ where: { id } });
  if (!guru)
    return NextResponse.json(
      { error: "Guru tidak ditemukan" },
      { status: 404 }
    );
  return NextResponse.json(guru);
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> } // params adalah Promise
) {
  const { id } = await context.params; // harus di-await dulu

  const body = await req.json();
  const jenisKelaminMap: Record<string, "Laki_laki" | "Perempuan"> = {
    "Laki-laki": "Laki_laki",
    Perempuan: "Perempuan",
  };

  const updatedGuru = await prisma.guru.update({
    where: { id },
    data: {
      ...body,
      jenisKelamin: jenisKelaminMap[body.jenisKelamin],
    },
  });

  return NextResponse.json(updatedGuru);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await prisma.guru.delete({ where: { id } });
  return NextResponse.json({ message: "Guru berhasil dihapus" });
}

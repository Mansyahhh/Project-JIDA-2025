import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const siswa = await prisma.siswa.findUnique({
      where: { id: params.id },
    });

    if (!siswa) {
      return NextResponse.json(
        { error: "Siswa tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(siswa);
  } catch (error) {
    console.error("Error get siswa by id", error);
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}

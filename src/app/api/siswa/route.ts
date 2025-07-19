import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { SiswaFormValues } from "@/types/siswa";

export async function POST(req: Request) {
  try {
    const body: SiswaFormValues = await req.json();

    const { tanggalLahir, ...rest } = body;

    const siswa = await prisma.siswa.create({
      data: {
        ...rest,
        password: "siswa123", // default
        ...(tanggalLahir ? { tanggalLahir: new Date(tanggalLahir) } : {}),
      },
    });

    return NextResponse.json(siswa, { status: 201 });
  } catch (error) {
    console.error("[SISWA POST]", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menambahkan siswa." },
      { status: 500 }
    );
  }
}

// GET
export async function GET() {
  try {
    const siswa = await prisma.siswa.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(siswa);
  } catch (error) {
    console.error("Gagal ambil data siswa", error);
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}

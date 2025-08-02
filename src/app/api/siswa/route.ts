import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { SiswaCreateSchema } from "@/types/siswa";

export async function GET() {
  try {
    const siswa = await prisma.siswa.findMany();
    return NextResponse.json(siswa);
  } catch (error) {
    console.error("Gagal ambil siswa:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = SiswaCreateSchema.parse(body);
    const tanggalLahir = data.tanggalLahir ? new Date(data.tanggalLahir) : null;

    const existing = await prisma.siswa.findUnique({
      where: { nisn: data.nisn },
    });
    if (existing) {
      return NextResponse.json(
        { error: "NISN sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash("123456", 10);

    const siswa = await prisma.siswa.create({
      data: { ...data, tanggalLahir, password: hashedPassword },
    });

    return NextResponse.json(siswa, { status: 201 });
  } catch (error) {
    console.error("Gagal tambah siswa:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

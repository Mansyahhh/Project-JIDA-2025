import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GuruFormSchema } from "@/types/guru";

export async function GET() {
  try {
    const guru = await prisma.guru.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(guru);
  } catch (error) {
    console.error("[GET_GURU_ERROR]", error);
    return NextResponse.json(
      { error: "Gagal mengambil data guru" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = GuruFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      nama,
      jenisKelamin,
      alamat,
      email,
      phone,
      tipePegawai,
      mapel,
      pendidikanTerakhir,
    } = parsed.data;

    const guru = await prisma.guru.create({
      data: {
        nama,
        jenisKelamin: jenisKelamin === "Laki-laki" ? "Laki_laki" : "Perempuan",
        alamat,
        email,
        phone,
        tipePegawai,
        mapel,
        pendidikanTerakhir,
      },
    });

    return NextResponse.json(guru, { status: 201 });
  } catch (error) {
    console.error("[POST_GURU_ERROR]", error);
    return NextResponse.json(
      { error: "Gagal menambahkan guru" },
      { status: 500 }
    );
  }
}

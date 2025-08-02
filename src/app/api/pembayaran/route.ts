import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PembayaranFormSchema } from "@/types/pembayaran";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = PembayaranFormSchema.parse(body);

    const pembayaran = await prisma.pembayaran.create({
      data: {
        siswaId: data.siswaId,
        tagihanId: data.tagihanId,
        jumlahBayar: data.jumlahBayar,
        tanggal: new Date(data.tanggal),
        metode: data.metode,
        keterangan: data.keterangan || "",
      },
    });

    return NextResponse.json(pembayaran, { status: 201 });
  } catch (error: unknown) {
    console.error("Gagal tambah pembayaran:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validasi gagal", issues: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await prisma.pembayaran.findMany({
      include: { siswa: true, tagihan: true }, // sekalian ambil tagihan biar lengkap
      orderBy: { tanggal: "desc" },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

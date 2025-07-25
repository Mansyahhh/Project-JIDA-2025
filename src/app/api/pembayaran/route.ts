import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PembayaranFormSchema } from "@/types/pembayaran";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = PembayaranFormSchema.parse(body);

    const pembayaran = await prisma.pembayaran.create({
      data: {
        siswaId: data.siswaId,
        jumlah: data.jumlah,
        tanggal: new Date(data.tanggal),
        jenis: data.jenis,
        keterangan: data.keterangan || "",
      },
    });

    return NextResponse.json(pembayaran, { status: 201 });
  } catch (error) {
    console.error("Gagal tambah pembayaran:", error);

    if (error instanceof Error && "issues" in error) {
      return NextResponse.json(
        { message: "Validasi gagal", error },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await prisma.pembayaran.findMany({
      include: { siswa: true },
      orderBy: { tanggal: "desc" },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

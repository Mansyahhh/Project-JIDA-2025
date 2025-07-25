import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const pembayaran = await prisma.pembayaran.findUnique({
      where: { id: params.id },
    });

    if (!pembayaran) {
      return NextResponse.json(
        { message: "Pembayaran tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(pembayaran);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal memuat pembayaran" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.pembayaran.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Pembayaran berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal menghapus pembayaran" },
      { status: 500 }
    );
  }
}

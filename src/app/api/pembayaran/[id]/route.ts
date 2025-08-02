import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET Pembayaran by ID
export async function GET(
  _req: Request,
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

// PATCH Pembayaran by ID
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updated = await prisma.pembayaran.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengupdate pembayaran" },
      { status: 500 }
    );
  }
}

// DELETE Pembayaran by ID
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.pembayaran.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Pembayaran berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal menghapus pembayaran" },
      { status: 500 }
    );
  }
}

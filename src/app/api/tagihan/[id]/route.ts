import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET Tagihan by ID
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const tagihan = await prisma.tagihan.findUnique({
    where: { id: params.id },
    include: { siswa: true },
  });

  if (!tagihan) {
    return NextResponse.json(
      { error: "Tagihan tidak ditemukan" },
      { status: 404 }
    );
  }
  return NextResponse.json(tagihan);
}

// PATCH Tagihan by ID
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updated = await prisma.tagihan.update({
    where: { id: params.id },
    data: {
      nama: data.nama,
      deskripsi: data.deskripsi || null,
      jumlah: data.jumlah,
      berlakuUntuk: data.berlakuUntuk,
      kelas: data.kelas || null,
      siswaId: data.siswaId || null,
    },
  });

  return NextResponse.json(updated);
}

// DELETE Tagihan by ID
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.tagihan.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Tagihan berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal hapus tagihan" }, { status: 500 });
  }
}

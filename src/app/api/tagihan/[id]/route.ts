import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, context: Params) {
  const { id } = await context.params; // <- WAJIB di-await sekarang
  const tagihan = await prisma.tagihan.findUnique({
    where: { id },
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
  context: { params: Promise<{ id: string }> } // <- params sekarang Promise
) {
  const { id } = await context.params; // harus di-await
  const data = await req.json();

  const updated = await prisma.tagihan.update({
    where: { id },
    data: {
      nama: data.nama,
      deskripsi: data.deskripsi || null,
      jumlah: data.jumlah,
      berlakuUntuk: data.berlakuUntuk,
      kelas: data.kelas || null,
      siswaId: data.siswaId || null,
    },
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}

// DELETE Tagihan by ID
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // harus di-await
  try {
    await prisma.tagihan.delete({ where: { id } });
    return new Response(null, { status: 204 }); // OK
  } catch (error) {
    console.error(error);
    return new Response("Gagal hapus tagihan", { status: 500 });
  }
}

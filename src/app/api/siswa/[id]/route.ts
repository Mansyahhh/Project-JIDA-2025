import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const siswa = await prisma.siswa.findUnique({ where: { id: params.id } });
  if (!siswa)
    return NextResponse.json(
      { error: "Siswa tidak ditemukan" },
      { status: 404 }
    );
  return NextResponse.json(siswa);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    // Convert tanggalLahir to Date
    const tanggalLahir = data.tanggalLahir ? new Date(data.tanggalLahir) : null;

    const siswa = await prisma.siswa.update({
      where: { id: params.id },
      data: {
        ...data,
        tanggalLahir,
        // Jika password tidak dikirim, jangan diubah
        ...(data.password
          ? { password: await bcryptjs.hash(data.password, 10) }
          : {}),
      },
    });

    return NextResponse.json(siswa);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal update siswa" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.siswa.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus siswa" }, { status: 500 });
  }
}

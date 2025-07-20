import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SiswaFormSchema } from "@/types/siswa";

// GET: Ambil data siswa berdasarkan ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const siswa = await prisma.siswa.findUnique({
      where: { id: params.id },
    });

    if (!siswa) {
      return NextResponse.json(
        { error: "Siswa tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(siswa);
  } catch (error) {
    console.error("[GET_SISWA_BY_ID_ERROR]", error);
    return NextResponse.json(
      { error: "Gagal mengambil data siswa" },
      { status: 500 }
    );
  }
}

// PATCH: Update data siswa
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parsed = SiswaFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validasi gagal", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const siswa = await prisma.siswa.update({
      where: { id: params.id },
      data: parsed.data,
    });

    return NextResponse.json(siswa);
  } catch (error) {
    console.error("[PATCH_SISWA_ERROR]", error);
    return NextResponse.json(
      { error: "Gagal mengupdate data siswa" },
      { status: 500 }
    );
  }
}

// 👇 fix utama ada di parameter ini
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = await context;
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { message: "ID tidak ditemukan" },
      { status: 400 }
    );
  }

  try {
    await prisma.siswa.delete({ where: { id } });

    return NextResponse.json({ message: "Siswa berhasil dihapus" });
  } catch (error) {
    console.error("[DELETE_SISWA_ERROR]", error);
    return NextResponse.json(
      { message: "Gagal menghapus siswa" },
      { status: 500 }
    );
  }
}

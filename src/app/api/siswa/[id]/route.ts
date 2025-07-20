import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SiswaFormSchema } from "@/types/siswa";

// GET
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ wajib pakai Promise
) {
  const { id } = await context.params;

  try {
    const siswa = await prisma.siswa.findUnique({ where: { id } });

    if (!siswa) {
      return NextResponse.json(
        { error: "Siswa tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(siswa);
  } catch (error) {
    console.error("[GET_SISWA_ERROR]", error);
    return NextResponse.json(
      { error: "Gagal mengambil data siswa" },
      { status: 500 }
    );
  }
}

// PATCH
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const body = await req.json();
    const parsed = SiswaFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validasi gagal", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await prisma.siswa.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PATCH_SISWA_ERROR]", error);
    return NextResponse.json(
      { error: "Gagal mengupdate data siswa" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

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

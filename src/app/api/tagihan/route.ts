// File: sekolahku-app/src/app/api/tagihan/route.ts
import prisma from "@/lib/prisma";

export async function GET() {
  const tagihan = await prisma.tagihan.findMany();
  return Response.json(tagihan);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const tagihan = await prisma.tagihan.create({
      data: {
        nama: data.nama,
        deskripsi: data.deskripsi || null,
        jumlah: data.jumlah,
        berlakuUntuk: data.berlakuUntuk,
        kelas: data.kelas || null, // <- ganti string kosong jadi null
        siswaId: data.siswaId || null, // <- sama seperti kelas
      },
    });

    return new Response(JSON.stringify(tagihan), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Gagal membuat tagihan", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const totalSiswa = await prisma.siswa.count();
  const totalGuru = await prisma.guru.count();
  const totalTagihan = await prisma.tagihan.aggregate({
    _sum: { jumlah: true },
  });
  const totalPembayaran = await prisma.pembayaran.aggregate({
    _sum: { jumlahBayar: true },
  });

  const totalSiswaLaki = await prisma.siswa.count({
    where: { jenisKelamin: "Laki_laki" },
  });
  const totalSiswaPerempuan = await prisma.siswa.count({
    where: { jenisKelamin: "Perempuan" },
  });

  return NextResponse.json({
    totalSiswa,
    totalGuru,
    totalTagihan: totalTagihan._sum.jumlah ?? 0,
    totalPembayaran: totalPembayaran._sum.jumlahBayar ?? 0,
    totalSiswaLaki,
    totalSiswaPerempuan,
  });
}

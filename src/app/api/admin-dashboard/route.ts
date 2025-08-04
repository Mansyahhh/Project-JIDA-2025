import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

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
    cards: [
      { title: "Jumlah Siswa", value: totalSiswa },
      { title: "Siswa Laki-laki", value: totalSiswaLaki },
      { title: "Siswa Perempuan", value: totalSiswaPerempuan },
      { title: "Total Guru", value: totalGuru },
      {
        title: "Total Tagihan",
        value: formatRupiah(totalTagihan._sum.jumlah ?? 0),
      },
      {
        title: "Total Pembayaran",
        value: formatRupiah(totalPembayaran._sum.jumlahBayar ?? 0),
      },
    ],
  });
}

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

  const cards = [
    {
      title: "Jumlah Siswa",
      value: totalSiswa ?? 0,
      icon: "Users",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Siswa Laki-laki",
      value: totalSiswaLaki ?? 0,
      icon: "User",
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Siswa Perempuan",
      value: totalSiswaPerempuan ?? 0,
      icon: "User2",
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Total Guru",
      value: totalGuru ?? 0,
      icon: "UserCheck",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Tagihan",
      value: formatRupiah(totalTagihan._sum.jumlah ?? 0),
      icon: "DollarSign",
      color: "bg-yellow-100 text-yellow-600",
      valueColor: "text-yellow-600",
    },
    {
      title: "Total Pembayaran",
      value: formatRupiah(totalPembayaran._sum.jumlahBayar ?? 0),
      icon: "CreditCard",
      color: "bg-purple-100 text-purple-600",
      valueColor: "text-purple-600",
    },
  ];

  return NextResponse.json({ cards });
}

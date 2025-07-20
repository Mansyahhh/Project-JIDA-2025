// lib/prisma/dashboardStats.ts
import { prisma } from "@/lib/prisma";

export async function getSiswaStats() {
  const total = await prisma.siswa.count();
  const laki = await prisma.siswa.count({
    where: { jenisKelamin: "Laki-laki" },
  });
  const perempuan = await prisma.siswa.count({
    where: { jenisKelamin: "Perempuan" },
  });

  return { total, laki, perempuan };
}

export async function getPegawaiStats() {
  const pendidik = await prisma.guru.count({
    where: { tipePegawai: "Pendidik" },
  });
  const kependidikan = await prisma.guru.count({
    where: { tipePegawai: "Kependidikan" },
  });

  return { pendidik, kependidikan };
}

export async function getPembayaranStats() {
  const total = await prisma.pembayaran.aggregate({
    _sum: { jumlah: true },
  });

  return {
    totalPembayaran: total._sum.jumlah || 0,
  };
}

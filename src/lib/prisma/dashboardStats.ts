import { prisma } from "@/lib/prisma";

// Statistik Siswa
export async function getSiswaStats() {
  const total = await prisma.siswa.count();
  const laki = await prisma.siswa.count({
    where: { jenisKelamin: "Laki_laki" },
  });
  const perempuan = await prisma.siswa.count({
    where: { jenisKelamin: "Perempuan" },
  });

  return { total, laki, perempuan };
}

// Statistik Pegawai
export async function getPegawaiStats() {
  const pendidik = await prisma.guru.count({
    where: { tipePegawai: "Pendidik" },
  });
  const kependidikan = await prisma.guru.count({
    where: { tipePegawai: "Kependidikan" },
  });

  return { pendidik, kependidikan };
}

// Statistik Pembayaran
export async function getPembayaranStats() {
  const result = await prisma.pembayaran.aggregate({
    _sum: { jumlah: true },
  });

  return { totalPembayaran: result._sum.jumlah || 0 };
}

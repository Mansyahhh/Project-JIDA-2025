import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear data lama
  await prisma.pembayaran.deleteMany();
  await prisma.siswa.deleteMany();
  await prisma.guru.deleteMany();

  // Hash password default siswa
  const hashedPassword = await bcrypt.hash("siswa123", 10);

  // Seed siswa
  const siswaData = Array.from({ length: 20 }).map((_, i) => ({
    nama: `Siswa One Piece ${i + 1}`,
    kelas: `Kelas ${Math.ceil(Math.random() * 3)}`,
    nisn: `12345${i}`,
    password: hashedPassword,
    alamat: `Alamat Siswa ${i + 1}`,
    status: i % 2 === 0 ? "SiswaBaru" : "MutasiMasuk",
  }));

  await prisma.siswa.createMany({ data: siswaData });

  // Seed guru
  const guruData = Array.from({ length: 10 }).map((_, i) => ({
    nama: `Guru Naruto ${i + 1}`,
    jenisKelamin: i % 2 === 0 ? "Laki_laki" : "Perempuan",
    email: `guru${i}@example.com`,
    tipePegawai: i % 2 === 0 ? "Pendidik" : "Kependidikan",
    pendidikanTerakhir: "S1 Pendidikan",
    mapel: i % 2 === 0 ? "Matematika" : "IPA",
    phone: `08123${i}4567${i}`,
  }));

  await prisma.guru.createMany({ data: guruData });

  console.log("✅ Dummy data siswa & guru berhasil dimasukkan");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

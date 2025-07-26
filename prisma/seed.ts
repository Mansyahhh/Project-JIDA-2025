import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("123456", 10);

  // --- Guru ---
  await prisma.guru.createMany({
    data: [
      {
        nama: "Kakashi Hatake",
        jenisKelamin: "Laki_laki",
        alamat: "Konoha",
        email: "kakashi@konoha.com",
        phone: "081234567890",
        tipePegawai: "Pendidik",
        mapel: "Ninjutsu",
        pendidikanTerakhir: "Akademi Ninja",
      },
      {
        nama: "Goku Son",
        jenisKelamin: "Laki_laki",
        alamat: "Planet Bumi",
        email: "goku@dragonball.com",
        phone: "082233445566",
        tipePegawai: "Pendidik",
        mapel: "Energi & Bela Diri",
        pendidikanTerakhir: "Pelatihan Kaiō-sama",
      },
      {
        nama: "Nami",
        jenisKelamin: "Perempuan",
        alamat: "East Blue",
        email: "nami@onepiece.com",
        phone: "083344556677",
        tipePegawai: "Kependidikan",
        pendidikanTerakhir: "Akademi Navigasi",
      },
    ],
  });

  // --- Siswa ---
  await prisma.siswa.createMany({
    data: [
      {
        nama: "Monkey D. Luffy",
        kelas: "KELAS_1A",
        nisn: "0012345678",
        password: hashedPassword,
        alamat: "Foosha Village",
        email: "luffy@onepiece.com",
        phone: "081111111111",
        namaAyah: "Monkey D. Dragon",
        namaIbu: "Unknown",
        status: "SiswaBaru",
      },
      {
        nama: "Naruto Uzumaki",
        kelas: "KELAS_2B",
        nisn: "0098765432",
        password: hashedPassword,
        alamat: "Konoha",
        email: "naruto@konoha.com",
        phone: "082222222222",
        namaAyah: "Minato Namikaze",
        namaIbu: "Kushina Uzumaki",
        status: "SiswaBaru",
      },
      {
        nama: "Vegeta",
        kelas: "KELAS_3C",
        nisn: "0076543210",
        password: hashedPassword,
        alamat: "Planet Vegeta",
        email: "vegeta@dragonball.com",
        phone: "083333333333",
        namaAyah: "King Vegeta",
        namaIbu: "Unknown",
        status: "MutasiMasuk",
      },
    ],
  });

  console.log("Seed selesai!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

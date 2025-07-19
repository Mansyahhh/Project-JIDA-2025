import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("siswa123", 10);

  await prisma.siswa.createMany({
    data: [
      {
        nisn: "1234567890",
        nama: "Ahmad Wijaya",
        kelas: "10 IPA 1",
        password,
        jenisKelamin: "Laki-laki",
      },
      {
        nisn: "0987654321",
        nama: "Putri Lestari",
        kelas: "10 IPA 2",
        password,
        jenisKelamin: "Perempuan",
      },
      // tambah data lainnya jika ingin
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Clear data untuk menghindari duplicate error ---
  await prisma.pembayaran.deleteMany({});
  await prisma.tagihan.deleteMany({});
  await prisma.siswa.deleteMany({});
  await prisma.guru.deleteMany({});
  await prisma.user.deleteMany({ where: { role: { in: ["admin"] } } });

  // --- Super Admin ---
  const superAdminPassword = await bcrypt.hash("superadmin123", 10);
  await prisma.user.upsert({
    where: { email: "superadmin@sekolahku.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "superadmin@sekolahku.com",
      password: superAdminPassword,
      role: "superadmin",
    },
  });

  // --- Admin Biasa ---
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      name: "Admin Sekolah",
      email: "admin@sekolahku.com",
      password: adminPassword,
      role: "admin",
    },
  });

  // --- Guru ---
  await prisma.guru.createMany({
    data: [
      {
        nama: "Budi Santoso",
        jenisKelamin: "Laki_laki",
        alamat: "Jl. Melati No. 12",
        email: "budi.santoso@sekolahku.com",
        phone: "081234567890",
        tipePegawai: "Pendidik",
        mapel: "Matematika",
        pendidikanTerakhir: "S1 Pendidikan Matematika",
      },
      {
        nama: "Siti Aminah",
        jenisKelamin: "Perempuan",
        alamat: "Jl. Kenanga No. 8",
        email: "siti.aminah@sekolahku.com",
        phone: "082345678901",
        tipePegawai: "Pendidik",
        mapel: "Bahasa Indonesia",
        pendidikanTerakhir: "S1 Pendidikan Bahasa Indonesia",
      },
      {
        nama: "Rahmat Hidayat",
        jenisKelamin: "Laki_laki",
        alamat: "Jl. Cempaka No. 5",
        email: "rahmat.hidayat@sekolahku.com",
        phone: "083456789012",
        tipePegawai: "Kependidikan",
        mapel: null,
        pendidikanTerakhir: "S1 Administrasi Pendidikan",
      },
    ],
  });

  // --- Siswa ---
  const siswaPassword = await bcrypt.hash("siswa123", 10);
  const siswaData = await prisma.siswa.createMany({
    data: [
      {
        nama: "Andi",
        jenisKelamin: "Laki_laki",
        alamat: "Jl. Mawar 1",
        kelas: "KELAS_1A",
        nisn: "10001",
        password: siswaPassword,
        status: "SiswaBaru",
      },
      {
        nama: "Budi",
        jenisKelamin: "Laki_laki",
        alamat: "Jl. Mawar 2",
        kelas: "KELAS_1B",
        nisn: "10002",
        password: siswaPassword,
        status: "SiswaBaru",
      },
      {
        nama: "Cahyo",
        jenisKelamin: "Laki_laki",
        alamat: "Jl. Mawar 3",
        kelas: "KELAS_1C",
        nisn: "10003",
        password: siswaPassword,
        status: "SiswaBaru",
      },
    ],
  });
  const siswaAll = await prisma.siswa.findMany();

  // --- Tagihan ---
  const tagihan1 = await prisma.tagihan.create({
    data: {
      nama: "SPP Januari 2025",
      deskripsi: "Tagihan SPP bulan Januari 2025",
      jumlah: 250000,
      berlakuUntuk: "SEMUA",
    },
  });
  const tagihan2 = await prisma.tagihan.create({
    data: {
      nama: "Ujian Tengah Semester Genap",
      deskripsi: "Biaya ujian tengah semester genap",
      jumlah: 150000,
      berlakuUntuk: "KELAS",
      kelas: "KELAS_3A",
    },
  });
  const tagihan3 = await prisma.tagihan.create({
    data: {
      nama: "Pembelian Buku Paket IPA",
      deskripsi: "Tagihan khusus buku paket IPA",
      jumlah: 200000,
      berlakuUntuk: "SISWA",
      siswaId: siswaAll[0].id,
    },
  });

  // --- Pembayaran ---
  await prisma.pembayaran.createMany({
    data: [
      {
        siswaId: siswaAll[0].id,
        tagihanId: tagihan1.id,
        jumlahBayar: 250000,
        metode: "TUNAI",
        keterangan: "Lunas SPP Januari",
      },
      {
        siswaId: siswaAll[1].id,
        tagihanId: tagihan2.id,
        jumlahBayar: 150000,
        metode: "TRANSFER",
        keterangan: "Ujian Tengah Semester",
      },
      {
        siswaId: siswaAll[2].id,
        tagihanId: tagihan3.id,
        jumlahBayar: 100000,
        metode: "LAINNYA",
        keterangan: "Cicilan buku paket",
      },
    ],
  });

  console.log("Database seeded successfully 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

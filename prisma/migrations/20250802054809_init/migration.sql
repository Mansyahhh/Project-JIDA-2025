-- CreateEnum
CREATE TYPE "public"."StatusSiswa" AS ENUM ('SiswaBaru', 'MutasiMasuk');

-- CreateEnum
CREATE TYPE "public"."JenisKelamin" AS ENUM ('Laki_laki', 'Perempuan');

-- CreateEnum
CREATE TYPE "public"."TipePegawai" AS ENUM ('Pendidik', 'Kependidikan');

-- CreateEnum
CREATE TYPE "public"."JenisPembayaran" AS ENUM ('Bangunan', 'Ujian', 'DaftarUlang', 'SPP', 'Seragam', 'Buku', 'Lainnya');

-- CreateEnum
CREATE TYPE "public"."metodePembayaran" AS ENUM ('Tunai', 'QrCode', 'Transfer', 'EWallet');

-- CreateEnum
CREATE TYPE "public"."KelasEnum" AS ENUM ('KELAS_1A', 'KELAS_1B', 'KELAS_1C', 'KELAS_2A', 'KELAS_2B', 'KELAS_2C', 'KELAS_3A', 'KELAS_3B', 'KELAS_3C', 'KELAS_4A', 'KELAS_4B', 'KELAS_4C', 'KELAS_5A', 'KELAS_5B', 'KELAS_5C', 'KELAS_6A', 'KELAS_6B', 'KELAS_6C');

-- CreateEnum
CREATE TYPE "public"."EnumBerlakuUntuk" AS ENUM ('SEMUA', 'KELAS', 'SISWA');

-- CreateEnum
CREATE TYPE "public"."EnumMetodePembayaran" AS ENUM ('TUNAI', 'TRANSFER', 'LAINNYA');

-- CreateTable
CREATE TABLE "public"."Siswa" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kelas" "public"."KelasEnum" NOT NULL,
    "nisn" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "alamat" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "phone" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "namaAyah" TEXT,
    "namaIbu" TEXT,
    "namaWali" TEXT,
    "nik" TEXT,
    "penghasilanWali" INTEGER,
    "tanggalLahir" TIMESTAMP(3),
    "tempatLahir" TEXT,
    "jenisKelamin" TEXT,
    "status" "public"."StatusSiswa" NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Guru" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenisKelamin" "public"."JenisKelamin" NOT NULL,
    "alamat" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "tipePegawai" "public"."TipePegawai" NOT NULL,
    "mapel" TEXT,
    "pendidikanTerakhir" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tagihan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "jumlah" INTEGER NOT NULL,
    "berlakuUntuk" "public"."EnumBerlakuUntuk" NOT NULL,
    "kelas" "public"."KelasEnum",
    "siswaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tagihan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pembayaran" (
    "id" TEXT NOT NULL,
    "siswaId" TEXT NOT NULL,
    "tagihanId" TEXT NOT NULL,
    "jumlahBayar" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metode" "public"."EnumMetodePembayaran" NOT NULL,
    "keterangan" TEXT,

    CONSTRAINT "Pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_nisn_key" ON "public"."Siswa"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Guru_email_key" ON "public"."Guru"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Tagihan" ADD CONSTRAINT "Tagihan_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "public"."Siswa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pembayaran" ADD CONSTRAINT "Pembayaran_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "public"."Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pembayaran" ADD CONSTRAINT "Pembayaran_tagihanId_fkey" FOREIGN KEY ("tagihanId") REFERENCES "public"."Tagihan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `alamat` on the `Guru` table. All the data in the column will be lost.
  - Changed the type of `tipePegawai` on the `Guru` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `jenisKelamin` on the `Guru` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `jenis` on the `Pembayaran` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `metode` to the `Pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisKelamin` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LakiLaki', 'Perempuan');

-- CreateEnum
CREATE TYPE "TipePegawai" AS ENUM ('Pendidik', 'Kependidikan');

-- CreateEnum
CREATE TYPE "JenisPembayaran" AS ENUM ('Bangunan', 'Ujian', 'DaftarUlang', 'SPP', 'Seragam', 'Buku', 'Lainnya');

-- CreateEnum
CREATE TYPE "metodePembayaran" AS ENUM ('Tunai', 'QrCode', 'Transfer', 'EWallet');

-- AlterTable
ALTER TABLE "Guru" DROP COLUMN "alamat",
DROP COLUMN "tipePegawai",
ADD COLUMN     "tipePegawai" "TipePegawai" NOT NULL,
DROP COLUMN "jenisKelamin",
ADD COLUMN     "jenisKelamin" "JenisKelamin" NOT NULL;

-- AlterTable
ALTER TABLE "Pembayaran" DROP COLUMN "jenis",
ADD COLUMN     "jenis" "JenisPembayaran" NOT NULL,
DROP COLUMN "metode",
ADD COLUMN     "metode" "metodePembayaran" NOT NULL;

-- AlterTable
ALTER TABLE "Siswa" DROP COLUMN "jenisKelamin",
ADD COLUMN     "jenisKelamin" "JenisKelamin" NOT NULL;

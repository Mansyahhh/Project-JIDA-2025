/*
  Warnings:

  - Added the required column `jenisKelamin` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendidikanTerakhir` to the `Guru` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guru" ADD COLUMN     "alamat" TEXT,
ADD COLUMN     "jenisKelamin" TEXT NOT NULL,
ADD COLUMN     "pendidikanTerakhir" TEXT NOT NULL;

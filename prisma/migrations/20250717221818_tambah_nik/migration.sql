/*
  Warnings:

  - Added the required column `nik` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN     "namaAyah" TEXT,
ADD COLUMN     "namaIbu" TEXT,
ADD COLUMN     "namaWali" TEXT,
ADD COLUMN     "nik" TEXT NOT NULL,
ADD COLUMN     "penghasilanWali" TEXT,
ALTER COLUMN "password" SET DEFAULT 'siswa123';

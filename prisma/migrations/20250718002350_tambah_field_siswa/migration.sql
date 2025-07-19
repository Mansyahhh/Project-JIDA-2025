/*
  Warnings:

  - Made the column `nik` on table `Siswa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN     "jenisKelamin" TEXT,
ALTER COLUMN "nik" SET NOT NULL;

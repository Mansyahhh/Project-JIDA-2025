/*
  Warnings:

  - Added the required column `tempatLahir` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN     "tanggalLahir" TIMESTAMP(3),
ADD COLUMN     "tempatLahir" TEXT NOT NULL;

/*
  Warnings:

  - The `jenisKelamin` column on the `Siswa` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Baru',
DROP COLUMN "jenisKelamin",
ADD COLUMN     "jenisKelamin" TEXT;

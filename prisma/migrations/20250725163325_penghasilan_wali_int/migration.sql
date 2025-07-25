/*
  Warnings:

  - The `penghasilanWali` column on the `Siswa` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Siswa" DROP COLUMN "penghasilanWali",
ADD COLUMN     "penghasilanWali" INTEGER;

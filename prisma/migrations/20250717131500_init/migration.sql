/*
  Warnings:

  - You are about to drop the column `status` on the `Siswa` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Siswa" DROP COLUMN "status",
ADD COLUMN     "alamat" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

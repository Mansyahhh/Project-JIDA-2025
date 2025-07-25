/*
  Warnings:

  - Added the required column `jenis` to the `Pembayaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pembayaran" ADD COLUMN     "jenis" TEXT NOT NULL,
ADD COLUMN     "metode" TEXT,
ADD COLUMN     "status" TEXT;

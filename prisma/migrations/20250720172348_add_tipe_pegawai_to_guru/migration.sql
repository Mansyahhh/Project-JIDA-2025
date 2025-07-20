/*
  Warnings:

  - Added the required column `tipePegawai` to the `Guru` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guru" ADD COLUMN     "tipePegawai" TEXT NOT NULL;

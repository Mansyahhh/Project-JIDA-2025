/*
  Warnings:

  - A unique constraint covering the columns `[nisn]` on the table `Siswa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Guru" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "mapel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembayaran" (
    "id" TEXT NOT NULL,
    "siswaId" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "keterangan" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guru_email_key" ON "Guru"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_nisn_key" ON "Siswa"("nisn");

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

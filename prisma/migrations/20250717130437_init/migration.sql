-- CreateTable
CREATE TABLE "Siswa" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_nisn_key" ON "Siswa"("nisn");

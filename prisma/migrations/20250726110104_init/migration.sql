-- CreateTable
CREATE TABLE "Siswa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "alamat" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "phone" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "namaAyah" TEXT,
    "namaIbu" TEXT,
    "namaWali" TEXT,
    "nik" TEXT,
    "penghasilanWali" INTEGER,
    "tanggalLahir" DATETIME,
    "tempatLahir" TEXT,
    "jenisKelamin" TEXT,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Guru" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "alamat" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "tipePegawai" TEXT NOT NULL,
    "mapel" TEXT,
    "pendidikanTerakhir" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Tagihan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "jumlah" INTEGER NOT NULL,
    "berlakuUntuk" TEXT NOT NULL,
    "kelas" TEXT,
    "siswaId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Tagihan_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pembayaran" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siswaId" TEXT NOT NULL,
    "tagihanId" TEXT NOT NULL,
    "jumlahBayar" INTEGER NOT NULL,
    "tanggal" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metode" TEXT NOT NULL,
    "keterangan" TEXT,
    CONSTRAINT "Pembayaran_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pembayaran_tagihanId_fkey" FOREIGN KEY ("tagihanId") REFERENCES "Tagihan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_nisn_key" ON "Siswa"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Guru_email_key" ON "Guru"("email");

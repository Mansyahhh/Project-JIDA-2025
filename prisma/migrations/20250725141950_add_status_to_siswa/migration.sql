/*
  Warnings:

  - The values [Aktif,MutasiKeluar,Lulus] on the enum `StatusSiswa` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusSiswa_new" AS ENUM ('SiswaBaru', 'MutasiMasuk');
ALTER TYPE "StatusSiswa" RENAME TO "StatusSiswa_old";
ALTER TYPE "StatusSiswa_new" RENAME TO "StatusSiswa";
DROP TYPE "StatusSiswa_old";
COMMIT;

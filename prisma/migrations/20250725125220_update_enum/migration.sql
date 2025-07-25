/*
  Warnings:

  - The values [LakiLaki] on the enum `JenisKelamin` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JenisKelamin_new" AS ENUM ('Laki_laki', 'Perempuan');
ALTER TABLE "Siswa" ALTER COLUMN "jenisKelamin" TYPE "JenisKelamin_new" USING ("jenisKelamin"::text::"JenisKelamin_new");
ALTER TABLE "Guru" ALTER COLUMN "jenisKelamin" TYPE "JenisKelamin_new" USING ("jenisKelamin"::text::"JenisKelamin_new");
ALTER TYPE "JenisKelamin" RENAME TO "JenisKelamin_old";
ALTER TYPE "JenisKelamin_new" RENAME TO "JenisKelamin";
DROP TYPE "JenisKelamin_old";
COMMIT;

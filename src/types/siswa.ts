import { z } from "zod";

type SiswaFormType = SiswaCreateValues & { id?: string };

// --- Schema untuk tambah (tanpa id) ---
export const SiswaCreateSchema = z.object({
  nisn: z.string().min(10, "NISN harus 10 digit"),
  nama: z.string().min(1, "Nama wajib diisi"),
  kelas: z.string().min(1, "Kelas wajib diisi"),
  jenisKelamin: z.enum(["Laki_laki", "Perempuan"]),
  status: z.enum(["SiswaBaru", "MutasiMasuk"]),
  nik: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 16, {
      message: "NIK harus 16 digit",
    }),
  tempatLahir: z.string().optional(),
  tanggalLahir: z.string().optional(),
  alamat: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  namaAyah: z.string().optional(),
  namaIbu: z.string().optional(),
  namaWali: z.string().optional(),
  penghasilanWali: z.number().optional(),
});

// --- Schema untuk edit (harus ada id) ---
export const SiswaUpdateSchema = SiswaCreateSchema.extend({
  id: z.string().min(1, "ID wajib diisi"),
});

export type SiswaCreateValues = z.infer<typeof SiswaCreateSchema>;
export type SiswaUpdateValues = z.infer<typeof SiswaUpdateSchema>;
export type SiswaFormValues = Partial<SiswaUpdateValues>;

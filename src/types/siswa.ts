import { z } from "zod";

// --- Enums ---
export const EnumBerlakuUntuk = ["SEMUA", "KELAS", "SISWA"] as const;
export const EnumMetodePembayaran = ["TUNAI", "TRANSFER", "LAINNYA"] as const;
export const KelasEnum = [
  "KELAS_1A",
  "KELAS_1B",
  "KELAS_1C",
  "KELAS_2A",
  "KELAS_2B",
  "KELAS_2C",
  "KELAS_3A",
  "KELAS_3B",
  "KELAS_3C",
  "KELAS_4A",
  "KELAS_4B",
  "KELAS_4C",
  "KELAS_5A",
  "KELAS_5B",
  "KELAS_5C",
  "KELAS_6A",
  "KELAS_6B",
  "KELAS_6C",
] as const;

export const JenisKelaminEnum = ["Laki_laki", "Perempuan"] as const;
export const StatusSiswaEnum = ["SiswaBaru", "MutasiMasuk"] as const;

// --- Schema untuk tambah (tanpa id) ---
export const SiswaCreateSchema = z.object({
  nisn: z.string().min(10, "NISN harus 10 digit"),
  nama: z.string().min(1, "Nama wajib diisi"),
  kelas: z.enum(KelasEnum, { message: "Kelas wajib dipilih" }),
  jenisKelamin: z.enum(JenisKelaminEnum),
  status: z.enum(StatusSiswaEnum),
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
  phone: z
    .string()
    .regex(/^(08|62)\d{8,13}$/, "Nomor HP harus diawali 08 atau 62"),
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

// --- Tagihan Schema ---
export const TagihanCreateSchema = z.object({
  nama: z.string().min(1, "Nama tagihan wajib diisi"),
  deskripsi: z.string().optional(),
  jumlah: z.number().min(1000, "Minimal Rp 1.000"),
  berlakuUntuk: z.enum(EnumBerlakuUntuk, {
    message: "Pilih salah satu penerapan tagihan",
  }),
  kelas: z.enum(KelasEnum).optional(), // hanya jika berlakuUntuk == "KELAS"
  siswaId: z.string().optional(), // hanya jika berlakuUntuk == "SISWA"
});

export const TagihanUpdateSchema = TagihanCreateSchema.extend({
  id: z.string().min(1, "ID tagihan wajib diisi"),
});

export type TagihanCreateValues = z.infer<typeof TagihanCreateSchema>;
export type TagihanUpdateValues = z.infer<typeof TagihanUpdateSchema>;

// --- Pembayaran Schema ---
export const PembayaranCreateSchema = z.object({
  siswaId: z.string().min(1, "Siswa wajib diisi"),
  tagihanId: z.string().min(1, "Tagihan wajib diisi"),
  jumlahBayar: z.number().min(1, "Jumlah bayar wajib diisi"),
  metode: z.enum(EnumMetodePembayaran, {
    message: "Metode pembayaran wajib dipilih",
  }),
  keterangan: z.string().optional(),
});

export const PembayaranUpdateSchema = PembayaranCreateSchema.extend({
  id: z.string().min(1, "ID pembayaran wajib diisi"),
});

export type PembayaranCreateValues = z.infer<typeof PembayaranCreateSchema>;
export type PembayaranUpdateValues = z.infer<typeof PembayaranUpdateSchema>;

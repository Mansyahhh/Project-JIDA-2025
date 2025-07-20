import { z } from "zod";
import { STATUS_OPTIONS, StatusSiswa } from "./status";

export const SiswaFormSchema = z.object({
  id: z.string().optional(),
  nisn: z
    .string()
    .length(10, "NISN harus terdiri dari 10 digit angka")
    .regex(/^\d+$/, "NISN hanya boleh berisi angka"),
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  kelas: z.string().min(1, "Kelas tidak boleh kosong"),
  nik: z
    .string()
    .regex(/^\d{16}$/, "NIK harus 16 digit angka")
    .optional()
    .or(z.literal("")),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"]).optional(),
  tempatLahir: z.string().optional(),
  tanggalLahir: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Format tanggal tidak valid",
    })
    .optional(),
  alamat: z.string().optional(),
  email: z.string().email("Format email tidak valid").optional(),
  phone: z.string().optional(),
  namaAyah: z.string().optional(),
  namaIbu: z.string().optional(),
  namaWali: z.string().optional(),
  penghasilanWali: z
    .string()
    .regex(/^\d+$/, "Penghasilan harus berupa angka")
    .optional(),
  status: z.enum(STATUS_OPTIONS.map((s) => s.value) as [string, ...string[]]),
});

export type SiswaFormValues = z.infer<typeof SiswaFormSchema>;

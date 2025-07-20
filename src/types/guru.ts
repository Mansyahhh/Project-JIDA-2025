import { z } from "zod";

export const GuruFormSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"]),
  alamat: z.string().optional(),
  email: z.string().email("Email tidak valid"),
  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Nomor HP harus berupa angka minimal 10 digit")
    .optional(),
  tipePegawai: z.enum(["Pendidik", "Kependidikan"]),
  mapel: z.string().optional(),
  pendidikanTerakhir: z.enum(["SMA", "D3", "S1", "S2", "S3"]),
});

export type GuruFormValues = z.infer<typeof GuruFormSchema>;

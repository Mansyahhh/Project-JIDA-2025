import { z } from "zod";

export const GuruFormSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"], {
    message: "Jenis kelamin wajib dipilih",
  }),
  alamat: z.string().optional(),
  email: z.string().email("Email tidak valid"),
  phone: z.string().optional(),
  tipePegawai: z.enum(["Pendidik", "Kependidikan"], {
    message: "Tipe pegawai wajib dipilih",
  }),
  mapel: z.string().optional(),
  pendidikanTerakhir: z.string().min(1, "Pendidikan terakhir wajib diisi"),
});

export type GuruFormValues = z.infer<typeof GuruFormSchema>;

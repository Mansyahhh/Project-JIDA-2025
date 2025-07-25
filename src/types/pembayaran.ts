import { z } from "zod";
// /types/pembayaran.ts
import { Pembayaran, Siswa } from "@prisma/client";

export type PembayaranWithSiswa = Pembayaran & {
  siswa: Siswa;
};

export const PembayaranFormSchema = z.object({
  siswaId: z.string().min(1, { message: "Siswa wajib dipilih" }),
  jumlah: z.number().min(1, { message: "Jumlah harus lebih dari 0" }),
  tanggal: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Format tanggal tidak valid",
  }),
  jenis: z.string().min(1, { message: "Jenis pembayaran wajib diisi" }),
  keterangan: z.string().optional(),
});

export type PembayaranFormValues = z.infer<typeof PembayaranFormSchema>;

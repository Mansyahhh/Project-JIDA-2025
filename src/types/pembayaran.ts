import { z } from "zod";
import { Pembayaran, Siswa, Tagihan } from "@prisma/client";

export const PembayaranFormSchema = z.object({
  siswaId: z.string().min(1, "Siswa wajib dipilih"),
  tagihanId: z.string().min(1, "Tagihan wajib dipilih"),
  jumlahBayar: z.number().min(1, "Jumlah harus lebih dari 0"),
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  metode: z.enum(["TUNAI", "TRANSFER", "LAINNYA"]), // ✅ tanpa required_error
  keterangan: z.string().optional(),
});

export type PembayaranFormValues = z.infer<typeof PembayaranFormSchema>;
export type PembayaranWithSiswa = Pembayaran & {
  siswa: Siswa;
  tagihan: Tagihan;
};

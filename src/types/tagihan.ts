import { z } from "zod";

export const EnumBerlakuUntuk = ["SEMUA", "KELAS", "SISWA"] as const;
export const EnumKelas = [
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

export const TagihanCreateSchema = z
  .object({
    nama: z.enum(["SPP", "Daftar Ulang", "Ujian", "Seragam", "Lainnya"], {
      message: "Nama tagihan wajib dipilih",
    }),
    jumlah: z.number().min(1, "Jumlah wajib diisi"),
    berlakuUntuk: z.enum(["SEMUA", "KELAS", "SISWA"], {
      message: "Berlaku untuk wajib diisi",
    }),
    kelas: z.string().optional(),
    siswaId: z.string().optional(),
    deskripsi: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.nama === "Lainnya" && (!data.deskripsi || data.deskripsi === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["deskripsi"],
        message: "Deskripsi wajib diisi jika nama tagihan Lainnya",
      });
    }

    if (data.berlakuUntuk === "KELAS" && (!data.kelas || data.kelas === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["kelas"],
        message: "Kelas wajib diisi jika berlaku untuk kelas",
      });
    }

    if (
      data.berlakuUntuk === "SISWA" &&
      (!data.siswaId || data.siswaId === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["siswaId"],
        message: "ID Siswa wajib diisi jika berlaku untuk siswa",
      });
    }
  });

export const TagihanUpdateSchema = TagihanCreateSchema.extend({
  id: z.string().uuid(),
});

export type TagihanCreateValues = z.infer<typeof TagihanCreateSchema>;
export type TagihanUpdateValues = z.infer<typeof TagihanUpdateSchema>;
export type TagihanFormValues = Partial<TagihanUpdateValues>;
export const TagihanFormSchema = TagihanUpdateSchema.partial();

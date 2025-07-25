"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CurrencyInput from "react-currency-input-field";
import {
  SiswaCreateSchema,
  SiswaUpdateSchema,
  SiswaCreateValues,
  SiswaUpdateValues,
} from "@/types/siswa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type Props = {
  defaultValues?: Partial<SiswaCreateValues & { id?: string }>;
  mode?: "create" | "edit";
};

type SiswaFormType = SiswaCreateValues & { id?: string };

export function SiswaForm({ defaultValues, mode = "create" }: Props) {
  const router = useRouter();
  const schema = mode === "edit" ? SiswaUpdateSchema : SiswaCreateSchema;

  const form = useForm<SiswaFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultValues,
      penghasilanWali: defaultValues?.penghasilanWali ?? 0,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  /** FIXED onSubmit di dalam satu tempat */
  const handleFormSubmit = async (values: SiswaFormType) => {
    console.log("Payload siswa:", values);
    try {
      const url =
        mode === "edit" && values.id
          ? `/api/siswa/${values.id}` // <--- ini penting
          : "/api/siswa";

      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Gagal simpan siswa");
        return;
      }

      toast.success(
        mode === "edit"
          ? "Siswa berhasil diperbarui"
          : "Siswa berhasil ditambahkan"
      );
      router.push("/admin/data-siswa");
      router.refresh();
    } catch (error) {
      console.error("Error submit:", error);
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {mode === "edit" && <input type="hidden" {...register("id")} />}

      {/* Data Dasar */}
      <Card>
        <CardHeader>
          <CardTitle>Data Dasar</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="nisn">NISN</Label>
            <Input
              id="nisn"
              placeholder="10 digit NISN"
              {...register("nisn")}
            />
            {errors.nisn && (
              <p className="text-red-500 text-sm">{errors.nisn.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="nama">Nama Lengkap</Label>
            <Input
              id="nama"
              placeholder="Nama lengkap siswa"
              {...register("nama")}
            />
            {errors.nama && (
              <p className="text-red-500 text-sm">{errors.nama.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="kelas">Kelas</Label>
            <Input
              id="kelas"
              placeholder="Contoh: X IPA 1"
              {...register("kelas")}
            />
            {errors.kelas && (
              <p className="text-red-500 text-sm">{errors.kelas.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
            <select
              id="jenisKelamin"
              {...register("jenisKelamin")}
              className="border rounded px-2 py-2 w-full"
            >
              <option value="">Pilih</option>
              <option value="Laki_laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            {errors.jenisKelamin && (
              <p className="text-red-500 text-sm">
                {errors.jenisKelamin.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              {...register("status")}
              className="border rounded px-2 py-2 w-full"
            >
              <option value="">Pilih</option>
              <option value="SiswaBaru">Siswa Baru</option>
              <option value="MutasiMasuk">Mutasi Masuk</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="nik">NIK</Label>
            <Input id="nik" placeholder="16 digit NIK" {...register("nik")} />
            {errors.nik && (
              <p className="text-red-500 text-sm">{errors.nik.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="tempatLahir">Tempat Lahir</Label>
            <Input id="tempatLahir" {...register("tempatLahir")} />
          </div>
          <div>
            <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
            <Input
              id="tanggalLahir"
              type="date"
              {...register("tanggalLahir")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Alamat & Kontak */}
      <Card>
        <CardHeader>
          <CardTitle>Alamat & Kontak</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="alamat">Alamat</Label>
            <Input id="alamat" {...register("alamat")} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
          <div>
            <Label htmlFor="phone">No. Telepon</Label>
            <Input id="phone" type="tel" {...register("phone")} />
          </div>
        </CardContent>
      </Card>

      {/* Orang Tua & Wali */}
      <Card>
        <CardHeader>
          <CardTitle>Orang Tua & Wali</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="namaAyah">Nama Ayah</Label>
            <Input id="namaAyah" {...register("namaAyah")} />
          </div>
          <div>
            <Label htmlFor="namaIbu">Nama Ibu</Label>
            <Input id="namaIbu" {...register("namaIbu")} />
          </div>
          <div>
            <Label htmlFor="namaWali">Nama Wali</Label>
            <Input id="namaWali" {...register("namaWali")} />
          </div>
          <div>
            <Label htmlFor="penghasilanWali">Penghasilan Wali</Label>
            <Controller
              control={control}
              name="penghasilanWali"
              render={({ field }) => (
                <CurrencyInput
                  id="penghasilanWali"
                  prefix="Rp "
                  decimalsLimit={2}
                  value={field.value}
                  onValueChange={(value) =>
                    field.onChange(value ? parseInt(value) : 0)
                  }
                  className="border rounded px-2 py-2 w-full"
                />
              )}
            />
            {errors.penghasilanWali && (
              <p className="text-red-500 text-sm">
                {errors.penghasilanWali.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          {mode === "edit" ? "Update Siswa" : "Tambah Siswa"}
        </Button>
      </div>
    </form>
  );
}

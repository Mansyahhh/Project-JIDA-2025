"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiswaFormSchema, SiswaFormValues } from "@/types/siswa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { STATUS_OPTIONS } from "@/types/status";

interface SiswaFormProps {
  defaultValues?: SiswaFormValues;
  mode: "tambah" | "edit";
}

export function SiswaForm({ defaultValues, mode }: SiswaFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, // ← ini yang dibutuhkan oleh <Controller>
  } = useForm<SiswaFormValues>({
    resolver: zodResolver(SiswaFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: SiswaFormValues) => {
    setLoading(true);

    try {
      const res = await fetch(
        mode === "edit" ? `/api/siswa/${defaultValues?.id}` : "/api/siswa",
        {
          method: mode === "edit" ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Gagal menyimpan data");

      toast.success(
        mode === "edit"
          ? "Data siswa berhasil diperbarui"
          : "Data siswa berhasil ditambahkan"
      );

      router.push("/admin/data-siswa");
      router.refresh();
    } catch (err) {
      console.error(err); // atau gunakan "_" untuk menandakan tidak digunakan
      toast.error("Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{mode === "edit" ? "Edit Siswa" : "Tambah Siswa"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          autoComplete="off"
          autoCorrect="off"
        >
          <div className="space-y-1">
            <Label htmlFor="nisn">NISN</Label>
            <Input id="nisn" {...register("nisn")} disabled={mode === "edit"} />
            {errors.nisn && (
              <p className="text-sm text-red-500">{errors.nisn.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="nama">Nama</Label>
            <Input id="nama" {...register("nama")} />
            {errors.nama && (
              <p className="text-sm text-red-500">{errors.nama.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="kelas">Kelas</Label>
            <Input id="kelas" {...register("kelas")} />
            {errors.kelas && (
              <p className="text-sm text-red-500">{errors.kelas.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="nik">NIK</Label>
            <Input id="nik" {...register("nik")} />
            {errors.nik && (
              <p className="text-sm text-red-500">{errors.nik.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
            <RadioGroup
              id="jenisKelamin"
              defaultValue={defaultValues?.jenisKelamin || ""}
              className="flex gap-4 p-2 bg-gray-50 rounded-md"
            >
              <div>
                <RadioGroupItem
                  value="Laki-laki"
                  {...register("jenisKelamin")}
                  id="laki"
                  className="border border-gray-400 text-gray-900"
                />
                <Label htmlFor="laki">Laki-laki</Label>
              </div>
              <div>
                <RadioGroupItem
                  value="Perempuan"
                  {...register("jenisKelamin")}
                  id="perempuan"
                  className="border border-gray-400 text-gray-900"
                />
                <Label htmlFor="perempuan">Perempuan</Label>
              </div>
            </RadioGroup>
            {errors.jenisKelamin && (
              <p className="text-sm text-red-500">
                {errors.jenisKelamin.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="tempatLahir">Tempat Lahir</Label>
            <Input id="tempatLahir" {...register("tempatLahir")} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
            <Input
              id="tanggalLahir"
              type="date"
              {...register("tanggalLahir")}
            />
            {errors.tanggalLahir && (
              <p className="text-sm text-red-500">
                {errors.tanggalLahir.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="alamat">Alamat</Label>
            <Input id="alamat" {...register("alamat")} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="noHp">No. HP</Label>
            <Input id="noHp" {...register("phone")} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="namaAyah">Nama Ayah</Label>
            <Input id="namaAyah" {...register("namaAyah")} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="namaIbu">Nama Ibu</Label>
            <Input id="namaIbu" {...register("namaIbu")} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="namaWali">Nama Wali</Label>
            <Input id="namaWali" {...register("namaWali")} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="penghasilanWali">Penghasilan Wali</Label>
            <Input id="penghasilanWali" {...register("penghasilanWali")} />
            {errors.penghasilanWali && (
              <p className="text-sm text-red-500">
                {errors.penghasilanWali.message}
              </p>
            )}
          </div>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status siswa" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <div className="md:col-span-2 mt-6 flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full sm:w-auto"
            >
              {loading
                ? "Menyimpan..."
                : mode === "edit"
                ? "Simpan Perubahan"
                : "Tambah Siswa"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

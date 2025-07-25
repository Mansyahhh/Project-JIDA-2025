"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GuruFormSchema, GuruFormValues } from "@/types/guru";

type Props = {
  defaultValues?: Partial<GuruFormValues>;
  mode?: "create" | "edit";
  onSubmit: (values: GuruFormValues) => Promise<void> | void;
};

export function GuruForm({ defaultValues, mode = "create", onSubmit }: Props) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<GuruFormValues>({
    resolver: zodResolver(GuruFormSchema),
    defaultValues,
  });

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === "edit" ? "Edit Data Guru" : "Tambah Guru Baru"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <Label htmlFor="nama">Nama Guru</Label>
            <Input
              id="nama"
              placeholder="Masukkan nama lengkap"
              {...register("nama")}
            />
            {errors.nama && (
              <p className="text-sm text-red-500">{errors.nama.message}</p>
            )}
          </div>

          <div>
            <Label>Jenis Kelamin</Label>
            <Controller
              control={control}
              name="jenisKelamin"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.jenisKelamin && (
              <p className="text-sm text-red-500">
                {errors.jenisKelamin.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="email@contoh.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label>Tipe Pegawai</Label>
            <Controller
              control={control}
              name="tipePegawai"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe pegawai" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendidik">Pendidik</SelectItem>
                    <SelectItem value="Kependidikan">Kependidikan</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tipePegawai && (
              <p className="text-sm text-red-500">
                {errors.tipePegawai.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="pendidikanTerakhir">Pendidikan Terakhir</Label>
            <Input
              id="pendidikanTerakhir"
              placeholder="Contoh: S1 Pendidikan"
              {...register("pendidikanTerakhir")}
            />
            {errors.pendidikanTerakhir && (
              <p className="text-sm text-red-500">
                {errors.pendidikanTerakhir.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="alamat">Alamat</Label>
            <Input
              id="alamat"
              placeholder="Alamat lengkap"
              {...register("alamat")}
            />
          </div>

          <div>
            <Label htmlFor="phone">Nomor HP</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="08xxxx"
              {...register("phone")}
            />
          </div>

          <div>
            <Label htmlFor="mapel">Mapel</Label>
            <Input
              id="mapel"
              placeholder="Contoh: Matematika"
              {...register("mapel")}
            />
          </div>

          <div className="pt-4 md:col-span-2">
            <Button type="submit" className="w-full">
              {mode === "edit" ? "Update Guru" : "Simpan"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

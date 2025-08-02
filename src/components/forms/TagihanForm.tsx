"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  TagihanCreateSchema,
  TagihanUpdateSchema,
  TagihanCreateValues,
  TagihanUpdateValues,
} from "@/types/tagihan";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatRupiah } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { EnumKelas } from "@/types/tagihan";

type Props = {
  defaultValues?: Partial<TagihanUpdateValues>;
  mode?: "create" | "edit";
  onSuccess?: () => void; // <-- baru
};

export function TagihanForm({
  defaultValues,
  mode = "create",
  onSuccess,
}: Props) {
  const router = useRouter();
  const schema = mode === "edit" ? TagihanUpdateSchema : TagihanCreateSchema;

  type TagihanFormValues = TagihanCreateValues | TagihanUpdateValues;

  const form = useForm<TagihanFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as TagihanFormValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;
  const namaTagihan = watch("nama");
  const berlakuUntuk = watch("berlakuUntuk");
  const [siswaList, setSiswaList] = useState<{ id: string; nama: string }[]>(
    []
  );
  useEffect(() => {
    // Fetch siswa untuk dropdown hanya sekali
    fetch("/api/siswa")
      .then((res) => res.json())
      .then((data) => setSiswaList(data))
      .catch((err) => console.error(err));
  }, []);

  const onSubmit = async (values: TagihanFormValues) => {
    try {
      const url =
        mode === "edit" && defaultValues?.id
          ? `/api/tagihan/${defaultValues.id}`
          : "/api/tagihan";
      const method = mode === "edit" ? "PATCH" : "POST";

      // Tambahan Debugging
      // console.log("=== SUBMIT FORM TAGIHAN ===");
      // console.log("URL:", url);
      // console.log("METHOD:", method);
      // console.log("PAYLOAD:", values);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      // console.log("RESPONSE STATUS:", res.status);

      if (!res.ok) throw new Error();

      toast.success(`Tagihan ${mode === "edit" ? "diupdate" : "ditambahkan"}!`);
      router.push("/admin/tagihan");
      router.refresh();
      onSuccess?.();
    } catch (error) {
      console.error("ERROR SUBMIT TAGIHAN:", error);
      toast.error("Gagal menyimpan tagihan");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {mode === "edit" && <input type="hidden" {...register("id")} />}
      <Card>
        <CardHeader>
          <CardTitle>Data Tagihan</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Nama Tagihan</Label>
            <select
              {...register("nama")}
              className="border rounded px-2 py-2 w-full"
            >
              <option value="">Pilih Tagihan</option>
              <option value="SPP">SPP</option>
              <option value="Daftar Ulang">Daftar Ulang</option>
              <option value="Ujian">Ujian</option>
              <option value="Seragam">Seragam</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            {errors.nama && (
              <p className="text-red-500 text-sm">{errors.nama.message}</p>
            )}
          </div>

          <Controller
            control={form.control}
            name="jumlah"
            render={({ field }) => (
              <div>
                <Label>Jumlah</Label>
                <Input
                  type="text"
                  value={field.value ? formatRupiah(Number(field.value)) : ""}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(rawValue ? parseInt(rawValue, 10) : "");
                  }}
                />
                {errors.jumlah && (
                  <p className="text-red-500 text-sm">
                    {errors.jumlah.message}
                  </p>
                )}
              </div>
            )}
          />

          <div>
            <Label>Berlaku Untuk</Label>
            <select
              {...register("berlakuUntuk")}
              className="border rounded px-2 py-2 w-full"
            >
              <option value="">Pilih</option>
              <option value="SEMUA">Semua</option>
              <option value="KELAS">Kelas</option>
              <option value="SISWA">Siswa</option>
            </select>
            {errors.berlakuUntuk && (
              <p className="text-red-500 text-sm">
                {errors.berlakuUntuk.message}
              </p>
            )}
          </div>
          {berlakuUntuk === "KELAS" && (
            <div>
              <Label>Pilih Kelas</Label>
              <select
                {...register("kelas")}
                className="border rounded px-2 py-2 w-full"
              >
                <option value="">Pilih</option>
                {EnumKelas.map((k) => (
                  <option key={k} value={k}>
                    {k.replace("_", " ")}
                  </option>
                ))}
              </select>
              {errors.kelas && (
                <p className="text-red-500 text-sm">{errors.kelas.message}</p>
              )}
            </div>
          )}

          {/* --- Siswa (hanya kalau pilih berlaku SISWA) --- */}
          {berlakuUntuk === "SISWA" && (
            <div>
              <Label>Pilih Siswa</Label>
              <select
                {...register("siswaId")}
                className="border rounded px-2 py-2 w-full"
              >
                <option value="">Pilih</option>
                {siswaList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nama}
                  </option>
                ))}
              </select>
              {errors.siswaId && (
                <p className="text-red-500 text-sm">{errors.siswaId.message}</p>
              )}
            </div>
          )}
          {namaTagihan === "Lainnya" && (
            <div className="md:col-span-2">
              <Label>Deskripsi</Label>
              <Input {...register("deskripsi", { required: true })} />
              {errors.deskripsi && (
                <p className="text-red-500 text-sm">
                  {errors.deskripsi.message}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <Separator />
      <div className="flex justify-end">
        <Button type="submit">
          {mode === "edit" ? "Update" : "Tambah"} Tagihan
        </Button>
      </div>
    </form>
  );
}

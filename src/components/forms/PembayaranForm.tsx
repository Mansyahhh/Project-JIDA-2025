"use client";

import { PembayaranFormSchema, PembayaranFormValues } from "@/types/pembayaran";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { InputCurrency } from "../InputCurrency";

type SiswaOption = { id: string; nama: string };

type PembayaranFormProps = {
  siswaList: SiswaOption[];
  defaultValues?: PembayaranFormValues;
  onSubmit: (data: PembayaranFormValues) => Promise<void>;
  loading?: boolean;
};

export function PembayaranForm({
  siswaList,
  defaultValues,
  onSubmit,
  loading,
}: PembayaranFormProps) {
  const form = useForm<PembayaranFormValues>({
    resolver: zodResolver(PembayaranFormSchema),
    defaultValues: defaultValues || {
      siswaId: "",
      jumlah: 0,
      tanggal: new Date().toISOString().slice(0, 10),
      jenis: "",
      keterangan: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* field siswaId */}
        <FormField
          control={form.control}
          name="siswaId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Siswa</FormLabel>
              <FormControl>
                <select {...field} className="w-full border rounded px-2 py-1">
                  <option value="">Pilih siswa</option>
                  {(siswaList ?? []).map((siswa) => (
                    <option key={siswa.id} value={siswa.id}>
                      {siswa.nama}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* jumlah */}
        <FormField
          control={form.control}
          name="jumlah"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah Pembayaran</FormLabel>
              <FormControl>
                <InputCurrency
                  value={field.value ?? 0}
                  onChange={(val) => field.onChange(val)}
                  placeholder="Contoh: 2.500.000"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* jenis */}
        <FormField
          control={form.control}
          name="jenis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Pembayaran</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Contoh: SPP, Uang Gedung, dll" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* tanggal */}
        <FormField
          control={form.control}
          name="tanggal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* keterangan */}
        <FormField
          control={form.control}
          name="keterangan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keterangan</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Opsional" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </Form>
  );
}

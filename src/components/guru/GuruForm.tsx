"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GuruFormSchema, GuruFormValues } from "@/types/guru";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from "@/components/ui/form";

export default function GuruForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<GuruFormValues>;
  onSubmit: (data: GuruFormValues) => void;
}) {
  const form = useForm<GuruFormValues>({
    resolver: zodResolver(GuruFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nama */}
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukkan nama guru" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Jenis Kelamin */}
        <FormField
          control={form.control}
          name="jenisKelamin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Kelamin</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="contoh@email.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor HP</FormLabel>
              <FormControl>
                <Input {...field} placeholder="08xxxxxxxxxx" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tipe Pegawai */}
        <FormField
          control={form.control}
          name="tipePegawai"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Pegawai</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe pegawai" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pendidik">Pendidik</SelectItem>
                  <SelectItem value="Kependidikan">Kependidikan</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mapel */}
        <FormField
          control={form.control}
          name="mapel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mata Pelajaran</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Matematika, IPA, dll (jika ada)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pendidikan Terakhir */}
        <FormField
          control={form.control}
          name="pendidikanTerakhir"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pendidikan Terakhir</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pendidikan terakhir" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SMA">SMA</SelectItem>
                  <SelectItem value="D3">D3</SelectItem>
                  <SelectItem value="S1">S1</SelectItem>
                  <SelectItem value="S2">S2</SelectItem>
                  <SelectItem value="S3">S3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alamat */}
        <FormField
          control={form.control}
          name="alamat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Alamat lengkap" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button type="submit" className="w-full">
            Simpan
          </Button>
        </div>
      </form>
    </Form>
  );
}

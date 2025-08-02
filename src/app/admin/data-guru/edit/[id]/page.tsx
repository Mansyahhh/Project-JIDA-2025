"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GuruForm } from "@/components/guru/GuruForm";
import { Guru, GuruFormValues } from "@/types/guru";
import { toast } from "sonner";

export default function EditGuruPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [guru, setGuru] = useState<GuruFormValues | null>(null);

  useEffect(() => {
    const fetchGuru = async () => {
      try {
        const res = await fetch(`/api/guru/${params.id}`);
        if (!res.ok) {
          toast.error("Gagal mengambil data guru");
          return;
        }

        const data: Guru = await res.json();

        // hanya ambil field yang diperlukan form (tanpa destructuring field yang tidak dipakai)
        const formValues: GuruFormValues = {
          nama: data.nama,
          jenisKelamin: data.jenisKelamin,
          alamat: data.alamat,
          email: data.email,
          phone: data.phone,
          tipePegawai: data.tipePegawai,
          mapel: data.mapel,
          pendidikanTerakhir: data.pendidikanTerakhir,
        };
        setGuru(formValues);
      } catch (error) {
        console.error("Error fetch guru:", error);
        toast.error("Terjadi kesalahan");
      }
    };

    fetchGuru();
  }, [params.id]);

  const handleSubmit = async (values: GuruFormValues) => {
    try {
      const res = await fetch(`/api/guru/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      let data: { error?: string } | null = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        toast.error(data?.error || "Gagal memperbarui guru");
        return;
      }

      toast.success("Guru berhasil diperbarui");
      router.push("/admin/data-guru");
      router.refresh();
    } catch (error) {
      console.error("Error update guru:", error);
      toast.error("Terjadi kesalahan");
    }
  };

  if (!guru) return <div>Loading...</div>;

  return <GuruForm defaultValues={guru} mode="edit" onSubmit={handleSubmit} />;
}

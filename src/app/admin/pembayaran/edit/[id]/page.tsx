"use client";

import { useEffect, useState } from "react";
import { PembayaranForm } from "@/components/forms/PembayaranForm";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { PembayaranFormValues } from "@/types/pembayaran";

type SiswaOption = { id: string; nama: string };

export default function EditPembayaranPage() {
  const router = useRouter();
  const { id } = useParams();
  const [defaultValues, setDefaultValues] =
    useState<PembayaranFormValues | null>(null);
  const [siswaList, setSiswaList] = useState<SiswaOption[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pembayaranRes, siswaRes] = await Promise.all([
          fetch(`/api/pembayaran/${id}`),
          fetch(`/api/siswa/options`), // pastikan ada API untuk opsi siswa
        ]);

        if (!pembayaranRes.ok) throw new Error("Gagal memuat pembayaran");
        if (!siswaRes.ok) throw new Error("Gagal memuat siswa");

        const pembayaranData = await pembayaranRes.json();
        const siswaOptions = await siswaRes.json();

        setDefaultValues(pembayaranData);
        setSiswaList(siswaOptions);
      } catch (err) {
        console.error(err);
        toast.error("Gagal memuat data");
      }
    }

    fetchData();
  }, [id]);

  async function handleSubmit(data: PembayaranFormValues): Promise<void> {
    try {
      const res = await fetch(`/api/pembayaran/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error("Gagal memperbarui pembayaran");
        return;
      }

      toast.success("Pembayaran berhasil diperbarui");
      router.push("/admin/pembayaran");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan");
    }
  }

  if (!defaultValues) return <p>Loading...</p>;

  return (
    <PembayaranForm
      siswaList={siswaList}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}

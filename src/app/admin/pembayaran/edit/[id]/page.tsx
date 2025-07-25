"use client";

import { useEffect, useState } from "react";
import { PembayaranForm } from "@/components/forms/PembayaranForm";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { PembayaranFormValues } from "@/types/pembayaran";

type SiswaOption = { id: string; nama: string };

type EditPembayaranPageProps = {
  siswaList: SiswaOption[];
};

export default function EditPembayaranPage({
  siswaList,
}: EditPembayaranPageProps) {
  const router = useRouter();
  const { id } = useParams();
  const [defaultValues, setDefaultValues] =
    useState<PembayaranFormValues | null>(null);

  useEffect(() => {
    fetch(`/api/pembayaran/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setDefaultValues(data))
      .catch(() => toast.error("Gagal memuat data"));
  }, [id]);

  async function handleSubmit(data: PembayaranFormValues): Promise<void> {
    const res = await fetch(`/api/pembayaran/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Gagal memperbarui pembayaran");
      return;
    }

    toast.success("Pembayaran berhasil diperbarui");
    router.push("/admin/pembayaran");
    router.refresh();
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

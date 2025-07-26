// admin/tagihan/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TagihanForm } from "@/components/forms/TagihanForm";
import { TagihanUpdateValues } from "@/types/tagihan";
import { toast } from "sonner";

export default function EditTagihanPage() {
  const params = useParams();
  const id = params?.id as string;

  const [defaultValues, setDefaultValues] =
    useState<TagihanUpdateValues | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/tagihan/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();

        // Perbaikan default values supaya form tidak error validasi
        setDefaultValues({
          id: data.id,
          nama: data.nama,
          jumlah: data.jumlah,
          berlakuUntuk: data.berlakuUntuk,
          kelas: data.kelas ?? "",
          siswaId: data.siswaId ?? "",
          deskripsi: data.deskripsi ?? "",
        });
      } catch {
        toast.error("Gagal memuat data tagihan");
      }
    }
    fetchData();
  }, [id]);

  if (!defaultValues) return <p>Loading...</p>;

  return <TagihanForm defaultValues={defaultValues} mode="edit" />;
}

// /admin/pembayaran/tambah/page.tsx
"use client";
import { PembayaranForm } from "@/components/forms/PembayaranForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PembayaranFormValues } from "@/types/pembayaran";
import { useEffect, useState } from "react";

type SiswaOption = { id: string; nama: string };

export default function TambahPembayaranPage() {
  const router = useRouter();
  const [siswaList, setSiswaList] = useState<SiswaOption[]>([]);

  useEffect(() => {
    fetch("/api/siswa") // <-- pastikan sudah ada API siswa (GET all siswa)
      .then((res) => res.json())
      .then((data) => setSiswaList(data))
      .catch(() => toast.error("Gagal memuat data siswa"));
  }, []);

  async function handleSubmit(data: PembayaranFormValues): Promise<void> {
    const res = await fetch("/api/pembayaran", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) return toast.error("Gagal tambah pembayaran");
    toast.success("Pembayaran berhasil ditambahkan");
    router.push("/admin/pembayaran");
    router.refresh();
  }

  return <PembayaranForm siswaList={siswaList} onSubmit={handleSubmit} />;
}

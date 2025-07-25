"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GuruForm } from "@/components/guru/GuruForm"; // BENAR
import { GuruFormValues } from "@/types/guru";

export default function TambahGuruPage() {
  const router = useRouter();

  const handleSubmit = async (data: GuruFormValues) => {
    try {
      const res = await fetch("/api/guru", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gagal menambah data");

      toast.success("Guru berhasil ditambahkan");
      router.push("/admin/data-guru");
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <h1 className="text-lg font-bold mb-4">Tambah Guru</h1>
      <GuruForm onSubmit={handleSubmit} />
    </div>
  );
}

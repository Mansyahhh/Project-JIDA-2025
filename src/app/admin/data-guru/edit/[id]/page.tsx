"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GuruForm } from "@/components/guru/GuruForm";
import { GuruFormValues } from "@/types/guru";
import { toast } from "sonner";

export default function EditGuruPage() {
  const params = useParams();
  const router = useRouter();
  const [guru, setGuru] = useState<GuruFormValues | null>(null);

  useEffect(() => {
    const fetchGuru = async () => {
      const res = await fetch(`/api/guru/${params.id}`);
      if (!res.ok) {
        toast.error("Gagal mengambil data guru");
        return;
      }
      const data = await res.json();
      setGuru(data);
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

      // hanya parse json kalau benar-benar ada body
      let data: any = null;
      try {
        data = await res.json();
      } catch (_) {
        data = null; // kalau kosong, abaikan error JSON.parse
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

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SiswaForm } from "@/components/admin/siswa/SiswaForm";
import { SiswaUpdateValues } from "@/types/siswa";
import { toast } from "sonner";

export default function EditSiswaPage() {
  const params = useParams();
  const [siswa, setSiswa] = useState<SiswaUpdateValues | null>(null);

  useEffect(() => {
    const fetchSiswa = async () => {
      const res = await fetch(`/api/siswa/${params.id}`);
      if (!res.ok) {
        toast.error("Gagal mengambil data siswa");
        return;
      }
      const data = await res.json();
      setSiswa(data);
    };
    fetchSiswa();
  }, [params.id]);

  if (!siswa) return <div>Loading...</div>;

  return <SiswaForm defaultValues={siswa} mode="edit" />;
}

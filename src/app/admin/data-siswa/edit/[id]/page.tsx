"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SiswaForm } from "@/components/admin/siswa/SiswaForm";
import { SiswaFormValues } from "@/types/siswa";

export default function EditSiswaPage() {
  const params = useParams();
  const [siswa, setSiswa] = useState<SiswaFormValues | null>(null);

  useEffect(() => {
    const fetchSiswa = async () => {
      const res = await fetch(`/api/siswa/${params.id}`);
      if (!res.ok) return;
      const data = await res.json();
      setSiswa(data);
    };

    fetchSiswa();
  }, [params.id]);

  if (!siswa) return <div>Loading...</div>;

  return <SiswaForm defaultValues={siswa} mode="edit" />;
}

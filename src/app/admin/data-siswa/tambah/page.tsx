"use client";

import { useRouter } from "next/navigation";
import { SiswaForm } from "@/components/admin/siswa/SiswaForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiswaFormValues } from "@/types/siswa";

export default function TambahSiswaPage() {
  const router = useRouter();

  const handleSubmit = async (data: SiswaFormValues) => {
    try {
      const res = await fetch("/api/siswa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.text(); // coba ambil pesan error
        throw new Error(err || "Gagal menyimpan data");
      }

      router.push("/admin/data-siswa");
    } catch (error) {
      alert("❌ Gagal menyimpan data siswa: " + error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <Card>
        <CardHeader>
          <CardTitle>Tambah Siswa Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <SiswaForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}

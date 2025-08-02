"use client";

import { SiswaForm } from "@/components/admin/siswa/SiswaForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TambahSiswaPage() {
  return (
    <div className="max-w-3xl mx-auto mt-12">
      <Card>
        <CardHeader>
          <CardTitle>Tambah Siswa Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <SiswaForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}

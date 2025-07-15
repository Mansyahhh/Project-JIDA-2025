// src/app/siswa/[nisn]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { pesertaDidik, Siswa } from "@/data/pesertaDidik";

export default function DashboardSiswa() {
  const params = useParams<{ nisn: string }>();
  const nisn = params.nisn;

  const [siswa, setSiswa] = useState<Siswa | null>(null);

  useEffect(() => {
    const data = pesertaDidik.find((s) => s.nisn === nisn);
    setSiswa(data || null);
  }, [nisn]);

  if (!siswa) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">Siswa tidak ditemukan</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-blue-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">
          Dashboard Siswa: {siswa.nama}
        </h1>
        {/* Tambahkan informasi siswa lainnya di sini */}
      </div>
    </main>
  );
}

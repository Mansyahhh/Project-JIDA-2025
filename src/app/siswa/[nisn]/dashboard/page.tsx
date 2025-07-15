"use client";

import { useParams } from "next/navigation";
import { pesertaDidik } from "@/data/pesertaDidik";

// ✅ Define the expected params type
type Params = {
  nisn: string;
};

export default function DashboardSiswa() {
  // ✅ Gunakan generic type agar tidak perlu "as string"
  const params = useParams<Params>();
  const nisn = params.nisn;

  const siswa = pesertaDidik.find((s) => s.nisn === nisn);

  if (!siswa) {
    return (
      <main className="flex min-h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold text-red-600">
            Siswa tidak ditemukan
          </h1>
          <p className="text-gray-500">NISN: {nisn}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-blue-800">
          Selamat Datang, {siswa.nama}
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold text-blue-600 mb-4">
              Informasi Siswa
            </h2>
            <p>
              <strong>Nama:</strong> {siswa.nama}
            </p>
            <p>
              <strong>Kelas:</strong> {siswa.kelas}
            </p>
            <p>
              <strong>Status:</strong> {siswa.status}
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold text-blue-600 mb-4">
              Status Pembayaran
            </h2>
            <p>
              SPP:{" "}
              <span
                className={
                  siswa.pembayaran?.spp ? "text-green-600" : "text-red-600"
                }
              >
                {siswa.pembayaran?.spp ? "Lunas" : "Belum Lunas"}
              </span>
            </p>
            <p>
              Buku:{" "}
              <span
                className={
                  siswa.pembayaran?.buku ? "text-green-600" : "text-red-600"
                }
              >
                {siswa.pembayaran?.buku ? "Lunas" : "Belum Lunas"}
              </span>
            </p>
            <p>
              Seragam:{" "}
              <span
                className={
                  siswa.pembayaran?.seragam ? "text-green-600" : "text-red-600"
                }
              >
                {siswa.pembayaran?.seragam ? "Lunas" : "Belum Lunas"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { pesertaDidik } from "@/data/pesertaDidik";

export default function DetailSiswaPage() {
  const params = useParams<{ nisn: string }>();
  const router = useRouter();

  const [role, setRole] = useState("");
  const nisn = params.nisn;

  const siswa = pesertaDidik.find((s) => s.nisn === nisn);

  const currentIndex = pesertaDidik.findIndex((s) => s.nisn === nisn);
  const siswaSebelumnya = pesertaDidik[currentIndex - 1];
  const siswaBerikutnya = pesertaDidik[currentIndex + 1];

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  if (!siswa) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            404 - Siswa Tidak Ditemukan
          </h1>
          <p className="text-gray-600">NISN: {nisn}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-blue-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">
          Detail Siswa: {siswa.nama}
        </h1>
        <p>
          <strong>NISN:</strong> {siswa.nisn}
        </p>
        <p>
          <strong>Kelas:</strong> {siswa.kelas}
        </p>
        <p>
          <strong>Status:</strong> {siswa.status}
        </p>
        <p className="mt-4 font-semibold text-blue-700">Status Pembayaran:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>SPP: {siswa.pembayaran.spp ? "Lunas" : "Belum Lunas"}</li>
          <li>Buku: {siswa.pembayaran.buku ? "Lunas" : "Belum Lunas"}</li>
          <li>Seragam: {siswa.pembayaran.seragam ? "Lunas" : "Belum Lunas"}</li>
        </ul>

        {/* Navigasi Admin */}
        {role === "admin" && (
          <div className="flex justify-between mt-8">
            {siswaSebelumnya ? (
              <button
                onClick={() => router.push(`/siswa/${siswaSebelumnya.nisn}`)}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded text-blue-800"
              >
                ← {siswaSebelumnya.nama}
              </button>
            ) : (
              <div />
            )}

            {siswaBerikutnya ? (
              <button
                onClick={() => router.push(`/siswa/${siswaBerikutnya.nisn}`)}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded text-blue-800"
              >
                {siswaBerikutnya.nama} →
              </button>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

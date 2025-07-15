// app/(admin)/page.tsx

"use client";

import { pesertaDidik } from "@/data/pesertaDidik";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function formatStatus(status: string) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      router.push("/login");
    }
  }, []);

  const total = pesertaDidik.length;
  const totalSiswa = pesertaDidik.filter(
    (s) => s.status === "aktif" || s.status === "mutasi-masuk"
  ).length;

  const mutasiMasuk = pesertaDidik.filter(
    (s) => s.status === "mutasi-masuk"
  ).length;

  const mutasiKeluar = pesertaDidik.filter(
    (s) => s.status === "mutasi-keluar"
  ).length;

  const alumni = pesertaDidik.filter((s) => s.status === "lulus").length;

  const [filter, setFilter] = useState("semua");
  const siswaTerfilter = pesertaDidik.filter((s) => {
    if (filter === "semua") return true;
    if (filter === "aktif")
      return s.status === "aktif" || s.status === "mutasi-masuk";
    if (filter === "lulus") return s.status === "lulus";
    if (filter === "mutasi-keluar") return s.status === "mutasi-keluar";
    if (filter === "mutasi-masuk") return s.status === "mutasi-masuk";
    if (filter === "belum-lunas") {
      const p = s.pembayaran;
      return p && (!p.spp || !p.seragam || !p.buku);
    }
    return true;
  });

  return (
    <main className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-10 text-center">
        Dashboard Admin
      </h1>
      <p>Selamat datang, Admin Aplikasi SekolahKu !</p>

      {/* Total Siswa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center items-stretch mb-6">
        <div className="bg-blue-100 text-blue-800 rounded-lg p-6 shadow text-center">
          <p className="text-sm uppercase font-semibold">Total Siswa Aktif</p>
          <p className="text-3xl font-bold mt-2">{totalSiswa}</p>
        </div>
        {/* Status Lain */}
        <div className="bg-green-100 text-green-800 rounded-lg p-4 shadow text-center">
          <p className="text-sm font-medium uppercase">Mutasi Masuk</p>
          <p className="text-3xl font-bold mt-1">{mutasiMasuk}</p>
        </div>

        <div className="bg-yellow-100 text-yellow-800 rounded-lg p-4 shadow text-center">
          <p className="text-sm font-medium uppercase">Mutasi Keluar</p>
          <p className="text-3xl font-bold mt-1">{mutasiKeluar}</p>
        </div>

        <div className="bg-gray-100 text-gray-800 rounded-lg p-4 shadow text-center">
          <p className="text-sm font-medium uppercase">Alumni</p>
          <p className="text-3xl font-bold mt-1">{alumni}</p>
        </div>
      </div>
      {/* Filter Dropdown Untuk Seluruh Siswa */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          Filter Siswa:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="semua">Semua</option>
          <option value="aktif">Siswa Aktif</option>
          <option value="belum-lunas">Tagihan Siswa</option>
          <option value="mutasi-masuk">Mutasi Masuk</option>
          <option value="mutasi-keluar">Mutasi Keluar</option>
          <option value="lulus">Siswa Lulus</option>
        </select>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
        Hasil Filter: {filter}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {siswaTerfilter.map((siswa) => {
          const belumBayar: string[] = [];
          if (filter === "belum-lunas") {
            if (!siswa.pembayaran?.spp) belumBayar.push("SPP");
            if (!siswa.pembayaran?.seragam) belumBayar.push("Seragam");
            if (!siswa.pembayaran?.buku) belumBayar.push("Buku");
          }
          return (
            <Link key={siswa.nisn} href={`/siswa/${siswa.nisn}`}>
              <div
                className={`p-4 rounded-lg shadow hover:shadow-md border ${
                  filter === "belum-lunas"
                    ? "bg-red-50 border-red-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <p
                  className={`font-bold ${
                    filter === "belum-lunas" ? "text-red-700" : "text-blue-700"
                  }`}
                >
                  {siswa.nama}
                </p>
                <p className="text-sm text-gray-600">NISN: {siswa.nisn}</p>
                <p className="text-sm text-gray-600">Kelas: {siswa.kelas}</p>
                <p className="text-sm text-gray-600">
                  Status: {formatStatus(siswa.status)}
                </p>
                {filter === "belum-lunas" && belumBayar.length > 0 && (
                  <p className="text-sm text-red-600 mt-2">
                    Biaya Tagihan: {belumBayar.join(", ")}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Filter End */}
    </main>
  );
}

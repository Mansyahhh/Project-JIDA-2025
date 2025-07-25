"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { useEffect, useState } from "react";

interface DashboardData {
  siswa: { total: number; laki: number; perempuan: number };
  pegawai: { pendidik: number; kependidikan: number };
  pembayaran: { totalPembayaran: number };
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData>({
    siswa: { total: 0, laki: 0, perempuan: 0 },
    pegawai: { pendidik: 0, kependidikan: 0 },
    pembayaran: { totalPembayaran: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard", { cache: "no-store" });
        if (!res.ok) throw new Error("Gagal fetch data dashboard");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="p-6">Memuat data dashboard...</p>;

  const { siswa, pegawai, pembayaran } = data;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard title="Total Siswa" value={siswa.total} />
      <StatCard title="Siswa Laki-laki" value={siswa.laki} />
      <StatCard title="Siswa Perempuan" value={siswa.perempuan} />

      <StatCard title="Tenaga Pendidik" value={pegawai.pendidik} />
      <StatCard title="Tenaga Kependidikan" value={pegawai.kependidikan} />

      <StatCard
        title="Total Pembayaran"
        value={`Rp ${pembayaran.totalPembayaran.toLocaleString("id-ID")}`}
      />
    </div>
  );
}

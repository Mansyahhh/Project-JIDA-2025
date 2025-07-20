"use client";

import DashboardHeader from "@/components/admin/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [data, setData] = useState({
    siswa: { total: 0, laki: 0, perempuan: 0 },
    pegawai: { pendidik: 0, kependidikan: 0 },
    pembayaran: { totalPembayaran: 0 },
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/dashboard", { cache: "no-store" });
      const result = await res.json();
      setData(result);
    }

    fetchData();
  }, []);

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
        value={`Rp ${pembayaran.totalPembayaran.toLocaleString()}`}
      />
    </div>
  );
}

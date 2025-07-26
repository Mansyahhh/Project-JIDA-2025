"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";

type DashboardData = {
  totalSiswa: number;
  totalGuru: number;
  totalTagihan: number;
  totalPembayaran: number;
  totalSiswaLaki: number;
  totalSiswaPerempuan: number;
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Gagal ambil statistik dashboard:", err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.totalSiswa}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Siswa Laki-laki</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.totalSiswaLaki}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Siswa Perempuan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.totalSiswaPerempuan}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Guru</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.totalGuru}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Tagihan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-600">
            {formatRupiah(data.totalTagihan)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-indigo-600">
            {formatRupiah(data.totalPembayaran)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

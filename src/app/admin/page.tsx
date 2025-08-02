// src/app/admin/page.tsx
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

async function getDashboardData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function AdminDashboardPage() {
  const data: DashboardData = await getDashboardData();

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

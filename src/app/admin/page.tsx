import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import { getBaseUrl } from "@/lib/getBaseUrl";

type DashboardData = {
  totalSiswa: number;
  totalGuru: number;
  totalTagihan: number;
  totalPembayaran: number;
  totalSiswaLaki: number;
  totalSiswaPerempuan: number;
};

async function getDashboardData(): Promise<DashboardData> {
  const url = `${getBaseUrl()}/api/dashboard`;

  // Log URL yang digunakan untuk fetch
  console.log("Fetching dashboard data from:", url);

  const res = await fetch(url, { cache: "no-store" });

  // Kalau gagal → log isi HTML/teks agar mudah debugging
  if (!res.ok) {
    console.error(
      "Dashboard API response not OK:",
      res.status,
      await res.text()
    );
    throw new Error("Failed to fetch dashboard data");
  }

  return res.json();
}

export default async function AdminPage() {
  const data = await getDashboardData();

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Siswa</CardTitle>
        </CardHeader>
        <CardContent>{data.totalSiswa}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Guru</CardTitle>
        </CardHeader>
        <CardContent>{data.totalGuru}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Tagihan</CardTitle>
        </CardHeader>
        <CardContent>{formatRupiah(data.totalTagihan)}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>{formatRupiah(data.totalPembayaran)}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Siswa Laki-laki</CardTitle>
        </CardHeader>
        <CardContent>{data.totalSiswaLaki}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Siswa Perempuan</CardTitle>
        </CardHeader>
        <CardContent>{data.totalSiswaPerempuan}</CardContent>
      </Card>
    </div>
  );
}

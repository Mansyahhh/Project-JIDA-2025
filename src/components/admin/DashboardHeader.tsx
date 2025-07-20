// components/admin/DashboardHeader.tsx

interface DashboardHeaderProps {
  jumlahSiswa: number;
  jumlahGuru: number;
  totalPembayaran: number;
}

export default function DashboardHeader({
  jumlahSiswa,
  jumlahGuru,
  totalPembayaran,
}: DashboardHeaderProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Jumlah Siswa</h2>
        <p className="text-2xl">{jumlahSiswa}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Jumlah Guru</h2>
        <p className="text-2xl">{jumlahGuru}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Pembayaran</h2>
        <p className="text-2xl">Rp {totalPembayaran.toLocaleString()}</p>
      </div>
    </div>
  );
}

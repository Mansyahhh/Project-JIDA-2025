import { pesertaDidik } from "@/data/pesertaDidik";
import Link from "next/link";

export default function DataSiswaPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Data Siswa</h1>

      <table className="w-full table-auto border border-gray-200 shadow rounded bg-white">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            <th className="p-3 text-left">NISN</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Kelas</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pesertaDidik.map((siswa) => (
            <tr key={siswa.nisn} className="border-t hover:bg-gray-50">
              <td className="p-3">{siswa.nisn}</td>
              <td className="p-3">{siswa.nama}</td>
              <td className="p-3">{siswa.kelas}</td>
              <td className="p-3 capitalize">
                {siswa.status.replace("-", " ")}
              </td>
              <td className="p-3">
                <Link
                  href={`/siswa/${siswa.nisn}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Lihat Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

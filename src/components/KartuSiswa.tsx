import React from "react";

interface PropsSiswa {
  nama: string;
  nisn: string;
  kelas: string;
  status: string;
}

export default function KartuSiswa({ nama, nisn, kelas, status }: PropsSiswa) {
  // Membuat Warna kartu berdasarkan status
  let warna = "bg-gray-100";
  if (status === "aktif") warna = "bg-green-100";
  else if (status === "mutasi-keluar" || status === "non-aktif")
    warna = "bg-yellow-100";
  else if (status === "lulus") warna = "bg-gray-200";

  return (
    <div className={`p-4 rounded-xl shadow-sm ${warna} w-full max-w-xs`}>
      <h3 className="text-xl font-semibold">{nama}</h3>
      <p className="text-sm">NISN: {nisn}</p>
      <p className="text-sm">Kelas: {kelas}</p>
      <p className="text-sm italic text-gray-600 capitalize">{status}</p>
    </div>
  );
}

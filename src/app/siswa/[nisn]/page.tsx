import { notFound } from "next/navigation";
import { pesertaDidik } from "@/data/pesertaDidik";

interface PageProps {
  params: {
    nisn: string;
  };
}

export default function DetailSiswa({ params }: PageProps) {
  const siswa = pesertaDidik.find((s) => s.nisn === params.nisn);

  if (!siswa) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        Detail Siswa: {siswa.nama}
      </h1>
      <p className="text-gray-700">
        <strong>NISN:</strong> {siswa.nisn}
      </p>
      <p className="text-gray-700">
        <strong>Status:</strong> {siswa.status}
      </p>
      <p className="text-gray-700">
        <strong>Kelas:</strong> {siswa.kelas}
      </p>
    </main>
  );
}

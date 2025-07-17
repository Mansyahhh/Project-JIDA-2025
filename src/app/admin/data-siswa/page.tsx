"use client";

import { useEffect, useState } from "react";

type Siswa = {
  id: string;
  nama: string;
  kelas: string;
};

export default function SiswaCrudPage() {
  const [data, setData] = useState<Siswa[]>([]);
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [idHapus, setIdHapus] = useState<string | null>(null);
  const [namaHapus, setNamaHapus] = useState("");
  const [editSiswa, setEditSiswa] = useState<Siswa | null>(null);
  const [namaEdit, setNamaEdit] = useState("");
  const [kelasEdit, setKelasEdit] = useState("");

  // Ambil data siswa dari API
  useEffect(() => {
    fetch("/api/siswa")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/siswa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, kelas }),
    });

    const result = await res.json();
    setData([...data, result.data]);
    setNama("");
    setKelas("");
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
        Kelola Siswa SekolahKu
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Kelas"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tambah Siswa
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-2">Daftar Siswa:</h2>
        <ul className="space-y-2">
          {data.map((siswa) => (
            <li
              key={siswa.id}
              className="border p-4 rounded-md shadow-sm flex items-center justify-between bg-white hover:shadow transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{siswa.nama}</p>
                <p className="text-sm text-gray-500">Kelas: {siswa.kelas}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditSiswa(siswa);
                    setNamaEdit(siswa.nama);
                    setKelasEdit(siswa.kelas);
                  }}
                  title="Edit siswa"
                  className="text-blue-600 hover:text-blue-800 transition text-lg"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    setIdHapus(siswa.id);
                    setNamaHapus(siswa.nama);
                  }}
                  title="Hapus siswa"
                  className="text-red-600 hover:text-red-800 transition text-lg"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
        {idHapus && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm w-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Hapus Siswa
              </h2>
              <p className="text-gray-600 mb-6">
                Yakin ingin menghapus{" "}
                <span className="font-semibold">{namaHapus}</span>?
              </p>
              <div className="flex justify-center gap-4 transition-all duration-300 scale-95 hover:scale-100">
                <button
                  onClick={async () => {
                    const res = await fetch("/api/siswa", {
                      method: "DELETE",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ id: idHapus }),
                    });

                    if (res.ok) {
                      setData(data.filter((s) => s.id !== idHapus));
                      alert("✅ Data siswa berhasil dihapus");
                    } else {
                      alert("❌ Gagal menghapus siswa");
                    }

                    setIdHapus(null);
                    setNamaHapus("");
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Ya, Hapus
                </button>
                <button
                  onClick={() => setIdHapus(null)}
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
        {editSiswa && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Edit Siswa
              </h2>

              <input
                type="text"
                value={namaEdit}
                onChange={(e) => setNamaEdit(e.target.value)}
                className="w-full border p-2 rounded mb-3"
                placeholder="Nama"
              />
              <input
                type="text"
                value={kelasEdit}
                onChange={(e) => setKelasEdit(e.target.value)}
                className="w-full border p-2 rounded mb-4"
                placeholder="Kelas"
              />

              <div className="flex gap-4 justify-center">
                <button
                  onClick={async () => {
                    const res = await fetch("/api/siswa", {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        id: editSiswa.id,
                        nama: namaEdit,
                        kelas: kelasEdit,
                      }),
                    });

                    if (res.ok) {
                      const hasil = await res.json();
                      setData(
                        data.map((s) =>
                          s.id === hasil.data.id ? hasil.data : s
                        )
                      );
                      setEditSiswa(null);
                    } else {
                      alert("❌ Gagal update siswa");
                    }
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setEditSiswa(null)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

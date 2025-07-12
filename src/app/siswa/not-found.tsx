export default function NotFoundSiswa() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Siswa Tidak Ditemukan
      </h1>
      <p className="text-gray-600 mb-6">
        NISN yang Anda cari tidak ditemukan di dalam database SekolahKu.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Kembali ke Beranda
      </a>
    </main>
  );
}

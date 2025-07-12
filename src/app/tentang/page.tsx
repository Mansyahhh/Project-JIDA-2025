import Image from "next/image";

export default function TentangPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <section className="grid md:grid-cols-2 gap-12 items-center">
        {/* Gambar Ilustrasi */}
        <div>
          <Image
            src="/galeri/1.svg"
            alt="Ilustrasi Sekolah"
            width={500}
            height={500}
          />
        </div>

        {/* Teks Profil Sekolah */}
        <div>
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Tentang SekolahKu
          </h1>
          <p className="text-gray-700 text-lg mb-4">
            SekolahKu adalah sekolah berbasis teknologi yang berfokus pada
            pembelajaran aktif, karakter unggul, dan penerapan digitalisasi.
          </p>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Visi</h2>
          <p className="text-gray-600 mb-4">
            Menjadi sekolah digital unggulan yang membentuk generasi cerdas,
            mandiri, dan berakhlak mulia.
          </p>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Misi</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Mendorong pembelajaran berbasis proyek dan teknologi</li>
            <li>Mengembangkan karakter siswa dengan pendekatan holistik</li>
            <li>Meningkatkan kualitas guru dan kurikulum digital</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

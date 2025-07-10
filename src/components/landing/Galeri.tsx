"use client";

export default function Galeri() {
  return (
    <section
      id="galeri"
      className="pt-20 pb-16 py-16 px-6 bg-gray-50 text-center"
    >
      <h2 className="text-3xl font-bold text-blue-800 mb-8">
        🎦 JEPRETAN KEGIATAN SEKOLAH 📷
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <img
            key={i}
            src={`/galeri/${i}.svg`}
            alt={`Galeri ${i}`}
            className="w-full h-48 object-contain p-4 rounded-lg shadow-md bg-white"
          />
        ))}
      </div>
    </section>
  );
}

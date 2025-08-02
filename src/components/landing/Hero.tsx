"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col-reverse md:flex-row items-center justify-center text-center md:text-left px-6 gap-6">
      {/* Teks */}
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
          Selamat Datang di <span className="text-green-600">SekolahKu</span>
        </h1>
        <p className="text-gray-600">
          Aplikasi manajemen sekolah modern, mudah digunakan oleh admin, siswa,
          dan guru.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            Masuk Admin
          </Link>
          <Link
            href="/login"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded"
          >
            Masuk Super Admin
          </Link>
        </div>
      </div>

      {/* Ilustrasi */}
      <div className="md:w-1/2">
        <Image
          src="/studying.svg"
          width={150}
          height={150}
          alt="Ilustrasi belajar"
          className="w-full max-w-md mx-auto"
          priority
        />
      </div>
    </section>
  );
}

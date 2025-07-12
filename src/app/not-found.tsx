"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFoundGlobal() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-red-700 mb-4">
        Halaman Tidak Di Temukan
      </h1>
      <p className="text-lg text-gray-600/70 mb-6">
        Halaman yang anda cari tidak ada, periksa kembali URL yang anda masukan
      </p>
      <div className="mb-12">
        <Image
          src="/not-found1.svg"
          width={150}
          height={150}
          alt="halaman tidak di temukan"
          className="inline-block"
        />
        <Image
          src="/not-found2.svg"
          width={150}
          height={150}
          alt="halaman tidak di temukan"
          className="inline-block"
        />
        <Image
          src="/moving.svg"
          width={150}
          height={150}
          alt="halaman tidak di temukan"
          className="inline-block"
        />
      </div>
      <Link
        href="/"
        className="bg-blue-700 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-800 hover:font-bold hover:text-white/70 transition"
      >
        Kembali Ke Halaman Utama
      </Link>
    </main>
  );
}

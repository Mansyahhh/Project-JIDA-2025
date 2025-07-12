"use client";

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

export default function KontakPage() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <section className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow-md">
        {/* Kontak Info */}
        <div className="space-y-6 text-left">
          <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center md:text-left">
            Hubungi Kami
          </h1>
          <p className="text-base ">
            Ingin Mengirim kritik & ataupun ingin menanyakan info lebih lanjut
            bisa hubungi kami dengan email atau WhatsApp (office hour).
          </p>
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-blue-700 mt-1" size={20} />
            <div>
              <h2 className="text-lg font-semibold text-blue-700">Alamat</h2>
              <p>Perbatasan Citayem Ama Depok, Jawa Barat Pride</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaEnvelope className="text-blue-700 mt-1" size={20} />
            <div>
              <h2 className="text-lg font-semibold text-blue-700">Email</h2>
              <p>info@sekolahku.sch.id</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaPhone className="text-blue-700 mt-1" size={20} />
            <div>
              <h2 className="text-lg font-semibold text-blue-700">Telepon</h2>
              <p>+62 812-3456-7890</p>
            </div>
          </div>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            className="inline-flex items-center gap-2 mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            <FaWhatsapp size={18} /> Chat via WhatsApp
          </a>
        </div>

        {/* Form Kontak */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Nama</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nama Anda"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="email@domain.com"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Pesan</label>
            <textarea
              className="w-full border border-gray-300 rounded p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tulis pesan Anda di sini"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Kirim Pesan
          </button>
        </form>
      </section>
    </div>
  );
}

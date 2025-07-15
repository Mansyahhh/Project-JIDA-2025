"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import Image from "next/image";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const user = loginUser(identifier, password);

    if (!user) {
      setError("NISN atau Password salah.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", user.role);

    if (user.role === "admin") {
      router.push("/admin");
    } else {
      router.push(`/siswa/${user.nisn}/dashboard`);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Ilustrasi kiri */}
      <div className="hidden md:flex items-center justify-center bg-blue-50 p-8">
        <Image
          src="/sekolahku.svg"
          alt="Gambar Kelas"
          width={150}
          height={200}
          className="max-w-md w-full"
        />
      </div>

      {/* Form login */}
      <div className="flex items-center justify-center p-6 bg-white">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow max-w-sm w-full space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
            Login SekolahKu
          </h2>
          <input
            type="text"
            placeholder="NISN / Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// src/app/api/siswa/route.ts

import { NextRequest, NextResponse } from "next/server";

let siswaList = [
  { id: "001", nama: "Andi", kelas: "7A" },
  { id: "002", nama: "Budi", kelas: "8B" },
  { id: "003", nama: "Citra", kelas: "9C" },
];

// GET: ambil semua siswa
export function GET() {
  return NextResponse.json(siswaList);
}

// POST: tambah siswa baru
export async function POST(req: NextRequest) {
  const data = await req.json();

  const newSiswa = {
    id: Date.now().toString(), // ID otomatis
    nama: data.nama,
    kelas: data.kelas,
  };

  siswaList.push(newSiswa);
  return NextResponse.json({ status: "ok", data: newSiswa });
}

// DELETE: hapus siswa berdasarkan ID
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const index = siswaList.findIndex((s) => s.id === id);
  if (index !== -1) {
    siswaList.splice(index, 1);
    return NextResponse.json({ status: "deleted", id });
  }

  return NextResponse.json({ status: "not_found" }, { status: 404 });
}

// PATCH: update siswa berdasarkan ID
export async function PATCH(req: NextRequest) {
  const { id, nama, kelas } = await req.json();

  const index = siswaList.findIndex((s) => s.id === id);
  if (index === -1) {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  siswaList[index] = { ...siswaList[index], nama, kelas };

  return NextResponse.json({ status: "updated", data: siswaList[index] });
}
